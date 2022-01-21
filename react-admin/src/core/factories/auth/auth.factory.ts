import { IAuthProvider } from '../../interfaces/auth/auth-provider.interface';

import { AuthService } from '../../services/auth/auth.service';
import { UserStorage } from '../../services/user/user-storage.service';

export const authProviderFactory = (domain: string, userStorage: UserStorage): IAuthProvider => {
    return new AuthService(domain, userStorage);
};
