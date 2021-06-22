class Randomizer {
    static generateString(length: number): string {
        let result = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            result = result.concat(chars.charAt(Math.random() * chars.length));
        }

        return result;
    }
}

export default Randomizer;
