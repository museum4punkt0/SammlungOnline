import { IAuthError } from '../../interfaces/auth/auth-error.interface';
import { IAuthProvider } from '../../interfaces/auth/auth-provider.interface';
import { IAuthResponse } from '../../interfaces/auth/auth-response.interface';
import { ILoginOptions } from '../../interfaces/auth/login-options.interface';
import { IUserStorage } from '../user/user-storage.interface';

export class AuthService implements IAuthProvider {
    constructor(private readonly _domain: string, private readonly _userStorage: IUserStorage) {}

    public async login({ username, password }: ILoginOptions): Promise<void> {
        try {
            const authorization = `${username}:${password}`;

            const requestOptions = new Request(`${this._domain}/login`, {
                method: 'POST',
                body: JSON.stringify({ authorization: `Basic ${btoa(authorization)}` }),
                headers: new Headers({ 'content-type': 'application/json' }),
            });

            const authResponse = await fetch(requestOptions);
            const authResponseInJson = ((await authResponse.json()) as unknown) as IAuthResponse;

            const permissions = authResponseInJson['X-Hasura-Role-Scope'];

            this._userStorage.set({ token: authorization, permissions });
        } catch (error) {
            throw new Error('Credentials are invalid');
        }
    }

    public async checkError(error: IAuthError): Promise<void> {
        const INVALID_AUTH_STATUSES = [401, 403];
        const isAuthInvalid = INVALID_AUTH_STATUSES.some((invalidAuthStatus) => invalidAuthStatus === error?.status);

        if (isAuthInvalid) {
            this._userStorage.remove();
        }
    }

    public async checkAuth(): Promise<void> {
        const isAuthenticated = this._userStorage.get();

        if (!isAuthenticated) {
            throw new Error('User is not authenticated');
        }
    }

    public async logout(): Promise<void> {
        this._userStorage.remove();
    }

    public async getPermissions(): Promise<string> {
        const user = this._userStorage.get();

        if (!user?.permissions) {
            throw new Error('Permissions are absent');
        }

        return user.permissions;
    }
}
