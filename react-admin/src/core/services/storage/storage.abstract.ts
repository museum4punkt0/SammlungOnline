import { IStorageService } from './storage-service.interface';

export abstract class AStorage<T> {
    constructor(private readonly _storageKey: string, private readonly _storageService: IStorageService) {}

    public get(): T | null {
        const storageValue = this._storageService.get(this._storageKey);

        if (!storageValue) {
            return null;
        }

        return this.mapToValue(storageValue);
    }
    public set(value: T): void {
        const storageValue = this.mapToString(value);
        this._storageService.set(this._storageKey, storageValue);
    }

    public remove(): void {
        this._storageService.remove(this._storageKey);
    }

    abstract mapToValue(value: string): T;

    abstract mapToString(value: T): string;
}
