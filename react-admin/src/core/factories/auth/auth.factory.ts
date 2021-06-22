import { IAuthProvider } from '../../interfaces/auth/auth-provider.interface';

import { AuthService } from '../../services/auth/auth.service';

export const authProviderFactory = (domain: string): IAuthProvider => {
    return new AuthService(domain);
};
