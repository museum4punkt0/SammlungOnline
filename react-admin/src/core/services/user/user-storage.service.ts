import { AStorage } from '../storage/storage.abstract';
import { IUser } from './user.interface';
import { IUserStorage } from './user-storage.interface';

export class UserStorage extends AStorage<IUser> implements IUserStorage {
    public mapToValue(value: string): IUser {
        const userDto = JSON.parse(value);

        return {
            permissions: userDto?.permissions,
            token: userDto?.token,
        };
    }

    public mapToString(value: IUser): string {
        return JSON.stringify(value);
    }
}
