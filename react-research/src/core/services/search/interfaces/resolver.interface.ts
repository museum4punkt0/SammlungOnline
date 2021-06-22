export interface IResolver<T = unknown> {
    resolve: (value: T) => string | null;
}
