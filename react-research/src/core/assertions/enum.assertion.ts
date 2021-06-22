const isSomeEnum = <T>(e: T) => (token: any): token is T[keyof T] => {
    return Object.values(e).includes(token as T[keyof T]);
};

export default isSomeEnum;
