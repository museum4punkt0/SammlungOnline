import { AStorage } from '../storage/storage.abstract';
import { IUser } from './user.interface';

export interface IUserStorage extends AStorage<IUser> {
    mapToValue(value: string): IUser;
    mapToString(value: IUser): string;
}
