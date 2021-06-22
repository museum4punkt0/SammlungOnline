class EnumUtil {
    static getKeys(enumeration: any): Array<string> {
        const enumMembers: Array<string> = [];

        for (const enumMember in enumeration) {
            if (parseInt(enumMember, 10) >= 0) {
                enumMembers.push(enumeration[enumMember]);
            }
        }

        return enumMembers;
    }

    static getValueForEnumMember(enumeration: any, needle: string): number {
        for (const enumMember in enumeration) {
            if (parseInt(enumMember, 10) >= 0 && enumeration[enumMember] === needle) {
                return Number(enumMember);
            }
        }

        throw new Error('Needle cannot be found as enum-member.');
    }
}

export default EnumUtil;
