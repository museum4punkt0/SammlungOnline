import { IStorageService } from './storage-service.interface';

export class StorageService implements IStorageService {
    constructor(private readonly _storage: Storage) {}

    public get(key: string): string | null {
        return this._storage.getItem(key);
    }

    public set(key: string, value: string): void {
        this._storage.setItem(key, value);
    }

    public remove(key: string): void {
        this._storage.removeItem(key);
    }
}
