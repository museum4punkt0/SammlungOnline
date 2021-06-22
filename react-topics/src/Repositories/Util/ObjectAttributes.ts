import { ConfigLoader } from '../../Util/ConfigLoader';

export interface OrAttributeBoolExp {
    _or: Array<{
        key: {
            _eq: string;
        };
    }>;
}

const config = ConfigLoader.CurrentConfig;

class ObjectAttributes {
    /**
     * Convert strings to an or-where clause for graphql-query.
     * @param attributeKeys
     * @private
     */
    static convertAttributeKeysToWhereClause(attributeKeys: Array<string>): OrAttributeBoolExp {
        const where: OrAttributeBoolExp = {
            _or: [],
        };

        for (const key of attributeKeys) {
            where._or.push({
                key: { _eq: key },
            });
        }

        return where;
    }

    /**
     * Fetch attributes from config.
     * @private
     */
    static getObjectAttributeKeys(): Array<string> {
        const attributeKeys: Array<string> = [];

        for (const key of Object.keys(config.DATA_CONFIG)) {
            if (!key.startsWith('OBJECT_ATTRIBUTE_KEY_')) {
                continue;
            }

            // We have to disable ts here, because ts cannot handle the array syntax with dynamic variable.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const value: string = config.DATA_CONFIG[key as string] as string;
            if (value === '') {
                continue;
            }

            attributeKeys.push(value);
        }

        return attributeKeys;
    }
}

export default ObjectAttributes;
