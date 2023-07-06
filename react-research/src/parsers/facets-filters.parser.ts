import { IFacet, IOption } from '../types';

export interface IToggleButtonConfig {
  label: string;
  value: string;
  filtersKey: string;
  disabled: boolean;
}
export enum FiltersGroupName {
  COLLECTION = 'collectionKey',
  LOCATION = 'location',
  ASSORTMENTS = 'assortments',
}

/**
 * Mapping between names of filters groups in the GQL config and names of filters
 * groups in facets
 */
export const GROUPS_NAMES_MAP = new Map<string, string>([
  ['assortments', 'assortments'],
  ['collections', 'collectionKey'],
  ['locations', 'location'],
]);

/**
 * Provides a configuration map of all advanced filters (facets) displayed
 * in the advanced filters accordions.
 * Mainly used to know if a button is disabled or not. If the button is not
 * found in this configuration, it is assumed the button is disabled.
 * Mapping of names inside config file and facets:
 * -----------------------------------
 * |   config      |  facets         |
 * -----------------------------------
 * | 'filtersKey'  | 'field'         |
 * -----------------------------------
 */
export class FacetsFiltersParser {
  readonly _buttonGroupsConfig: Map<FiltersGroupName, Map<string, IToggleButtonConfig>>;

  constructor(private readonly facets: IFacet[]) {
    this._buttonGroupsConfig = new Map<
      FiltersGroupName,
      Map<string, IToggleButtonConfig>
    >([
      [FiltersGroupName.COLLECTION, new Map<string, IToggleButtonConfig>()],
      [FiltersGroupName.LOCATION, new Map<string, IToggleButtonConfig>()],
      [FiltersGroupName.ASSORTMENTS, new Map<string, IToggleButtonConfig>()],
    ]);
    if (this.facets) {
      this._parseFilters();
    }
  }

  /**
   * Returns a config object for a button with the provided label.
   * If a configuration does not exist for that label, a default config for
   * a disabled button with that label is returned.
   */
  public getFilterConfig(
    group: FiltersGroupName,
    filterLabel: string,
  ): IToggleButtonConfig {
    const defaultConfig = {
      label: filterLabel,
      value: '', // irrelevant as button is not toggleable
      filtersKey: '', // irrelevant as button is not toggleable
      disabled: true,
    };
    const groupFiltersMapping = this._buttonGroupsConfig.get(group);
    if (!groupFiltersMapping) return defaultConfig;
    const config = groupFiltersMapping.get(filterLabel);
    if (!config) {
      return {
        label: filterLabel,
        value: '', // irrelevant as button is not toggleable
        filtersKey: '', // irrelevant as button is not toggleable
        disabled: true,
      };
    }
    return config;
  }

  public hasValues(): boolean {
    return (
      !!this._buttonGroupsConfig.get(FiltersGroupName.ASSORTMENTS)?.size ||
      !!this._buttonGroupsConfig.get(FiltersGroupName.LOCATION)?.size ||
      !!this._buttonGroupsConfig.get(FiltersGroupName.COLLECTION)?.size
    );
  }

  /**
   * Recursively add each option of all facets to a dict representing configurations for
   * their respective buttons
   * IMPORTANT: This assumes that all facets options values/labels are unique
   * -------
   * @private
   */
  private _parseFilters(): void {
    if (!this.facets) {
      return;
    }
    for (const filterGroup of this.facets) {
      this._parseFiltersGroup(filterGroup);
    }
  }

  private _parseFiltersGroup(group: IFacet): void {
    if (!group || !group.options) return;
    for (const option of group?.options) {
      this._parseOption(option, group.field);
    }
  }

  /**
   * Create an IToggleButtonConfig obj and add it to the config mapping
   * with the label as key
   * @param option - an IOption object
   * @param field - the value to be used in conditions (ex: location=\"Alte Nationalgalerie\")
   * @private
   */
  private _parseOption(option: IOption, field: string) {
    const groupMapping = this._buttonGroupsConfig.get(field as FiltersGroupName);
    if (!groupMapping) {
      console.warn(`Unrecognized advanced filters group "${field}!"`);
      return;
    }
    groupMapping.set(option.label ?? option.label, {
      value: option.value,
      label: option.label,
      filtersKey: field,
      disabled: false,
    });
    if (option.options) {
      for (const opt of option.options) {
        this._parseOption(opt, field);
      }
    }
  }
}
