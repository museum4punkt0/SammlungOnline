import { IAuthError } from '../../interfaces/auth/auth-error.interface';
import { IAuthProvider } from '../../interfaces/auth/auth-provider.interface';
import { IAuthResponse } from '../../interfaces/auth/auth-response.interface';
import { ILoginOptions } from '../../interfaces/auth/login-options.interface';

export class AuthService implements IAuthProvider {
    constructor(private readonly _domain: string) {}

    private _authStorageKey = 'auth';
    private _permissionsStorageKey = 'permissions';

    public async login({ username, password }: ILoginOptions): Promise<void> {
        try {
            const auth = `${username}:${password}`;

            const requestOptions = new Request(`${this._domain}/login`, {
                method: 'POST',
                body: JSON.stringify({ authorization: auth }),
                headers: new Headers({ authorization: auth, 'content-type': 'application/json' }),
            });

            const authResponse = await fetch(requestOptions);
            const authResponseInJson = ((await authResponse.json()) as unknown) as IAuthResponse;

            /**
             *  use instead of the plain username and password
             */
            const authentication = JSON.stringify(auth);
            const permissions = authResponseInJson['X-Hasura-Role-Scope'];

            this._setAuthentication(authentication);
            this._setPermissions(permissions);
        } catch (error) {
            throw new Error('Credentials are invalid');
        }
    }

    public async checkError(error: IAuthError): Promise<void> {
        const INVALID_AUTH_STATUSES = [401, 403];
        const isAuthInvalid = INVALID_AUTH_STATUSES.some((invalidAuthStatus) => invalidAuthStatus === error?.status);

        if (isAuthInvalid) {
            this._removeAuthentication();
        }
    }

    public checkAuth(): Promise<void> {
        return new Promise((resolve, reject) => {
            const isAuthenticated = this._getAuthentication();

            if (isAuthenticated) {
                return resolve();
            }

            return reject();
        });
    }

    public async logout(): Promise<void> {
        this._removeAuthentication();
        this._removePermissions();
    }

    public getPermissions(): Promise<string> {
        return new Promise((resolve, reject) => {
            const permissions = this._getPermissions();

            if (permissions) {
                return resolve(permissions);
            }

            return reject();
        });
    }

    private _getAuthentication(): string | null {
        return localStorage.getItem(this._authStorageKey);
    }

    private _getPermissions(): string | null {
        return localStorage.getItem(this._permissionsStorageKey);
    }

    private _setAuthentication(authData: string): void {
        localStorage.setItem(this._authStorageKey, authData);
    }

    private _setPermissions(permissions: string): void {
        localStorage.setItem(this._permissionsStorageKey, permissions);
    }

    private _removeAuthentication(): void {
        localStorage.removeItem(this._authStorageKey);
    }

    private _removePermissions(): void {
        localStorage.removeItem(this._permissionsStorageKey);
    }
}
