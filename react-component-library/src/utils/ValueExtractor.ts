import { SmbObjects, SmbAttributeTranslations } from '../generated/graphql';

class ValueExtractor {
  private object: SmbObjects;

  constructor(object: SmbObjects) {
    this.object = object;
  }

  getValues(key?: string): string[] {
    return key && key !== '' ? this.getValuesByKey(key) : [];
  }

  getValuesByKey(key: string): string[] {
    const values = [];
    for (const attr of this.object.attributes) {
      if (attr.attribute_key === key || attr.attribute?.key === key) {
        if (attr.value && attr.value.trim() !== '') {
          values.push(attr.value);
        }
      }
    }
    return values;
  }

  getValue(key?: string): string | null | undefined {
    if (key && key !== '') {
      return this.getValueByKey(key);
    }
  }

  getValueByKey(key: string): string | null | undefined {
    const filter = (t: SmbAttributeTranslations) => {
      // find attribute with key...
      if (t.attribute_key === key || t.attribute?.key === key) {
        // ... in case there are multiple attribues with the same key, use the first non-empty
        return t.value?.trim() !== '';
      }
      return false;
    };
    return this.object.attributes?.find(filter)?.value;
  }

  getFirstValueByKey(
    attr: string,
    ...alternatives: string[]
  ): string | null | undefined {
    const value = this.getValueByKey(attr);
    if (value) {
      return value;
    }
    if (alternatives && alternatives.length) {
      const next = alternatives.shift();
      if (next) {
        return this.getFirstValueByKey(next, ...alternatives);
      }
    }
  }
}

export default ValueExtractor;
