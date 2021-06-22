import { IAuthError } from './auth-error.interface';
import { ILoginOptions } from './login-options.interface';

export interface IAuthProvider {
    login: (options: ILoginOptions) => Promise<void>;
    checkError: (error: IAuthError) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    getPermissions: () => Promise<string>;
}
