import { IFacet } from '../types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFetchFacets } from '../hooks/use-fetch-facets.hook';
import { FacetsFiltersParser, GROUPS_NAMES_MAP } from '../parsers/facets-filters.parser';
import { useFilters } from '../components/SearchInput/use-filters.hook';
import { useFormContext } from 'react-hook-form';
import { ESearchFormFields } from '../enums';

/**
 * Structure of the facets context:
 * provides a list of facets, a facets parser, a function to trigger fetching
 * of facets according to current active advanced filters, a boolean showing
 * if context is currently loading facets, a function to check if a function to check
 * if a label name belongs to a selected filter from the filters selected first in a group,
 * two functions to add or remove filters from a filters group
 */
export interface IFacetsContext {
  facets: IFacet[];
  facetsParser: FacetsFiltersParser;
  updateFacets: () => void;
  loading: boolean;
  isFilterInEntryPoint: (label: string) => boolean;
  addFilterToSelectedFiltersList: (group: string, filter: string) => void;
  removeElementFromSelectedFiltersList: (group: string, filter: string) => void;
}

export interface ISelectedFiltersGroup {
  groupName: string;
  selectedFiltersLabels: string[];
}

const GENERIC_MESSAGE = 'Default FacetsContext used!';

export const FacetsContext = createContext<IFacetsContext>({
  facets: [],
  facetsParser: new FacetsFiltersParser([]),
  updateFacets: () => {
    throw new Error(`${GENERIC_MESSAGE} Can't update facets!`);
  },
  loading: false,
  isFilterInEntryPoint: label => {
    throw new Error(`${GENERIC_MESSAGE} Can't verify '${label}'!`);
  },
  addFilterToSelectedFiltersList: (group: string, filter: string) => {
    throw new Error(`${GENERIC_MESSAGE} Can't add '${filter}' to '${group}'!`);
  },
  removeElementFromSelectedFiltersList: (group: string, filter: string) => {
    throw new Error(`${GENERIC_MESSAGE} Can't remove '${filter}' from '${group}'!`);
  },
});

export const useFacetsContext = () => useContext(FacetsContext);

export const LOCAL_STORAGE_FILTERS_KEY = 'filtersEntryPoint';

/**
 * Function to read the value from local storage for the selected filters groups
 * if an error occurs during it's parsing, an empty list is returned
 */
const _getLocalStorageValueParsed = (): ISelectedFiltersGroup[] => {
  const localStorageValue = localStorage.getItem(LOCAL_STORAGE_FILTERS_KEY) as string;
  if (!localStorageValue) {
    return [];
  }
  try {
    return JSON.parse(localStorageValue);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Could not parse local storage value '${localStorageValue}'! ${e}`);
  }
  return [];
};

/**
 * Context provider for working with current toggle-able filters
 * @param children
 * @constructor
 */
export const FacetsContextProvider: React.FC = ({ children }) => {
  const [facets, setFacets] = useState<IFacet[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedFiltersGroups, setSelectedFiltersGroups] = useState<
    ISelectedFiltersGroup[]
  >(_getLocalStorageValueParsed() ?? []);

  useEffect(() => {
    // persist selectedFiltersGroups to local storage between page refresh
    localStorage.setItem(
      LOCAL_STORAGE_FILTERS_KEY,
      JSON.stringify(selectedFiltersGroups),
    );
  }, [selectedFiltersGroups]);

  const fetchFacets = useFetchFacets();
  const { qAdvancedConditions, qAdvancedControls, qAdvancedFilters } = useFilters();
  const { watch } = useFormContext();

  /**
   * Function to check if a label belongs to a filter from the first
   * selected group
   */
  const isFilterInEntryPoint = useCallback(
    (filterLabel: string) => {
      if (!selectedFiltersGroups.length) {
        return false;
      }
      // check if the filter is selected and is in the entry point group
      return selectedFiltersGroups[0].selectedFiltersLabels.includes(filterLabel);
    },
    [selectedFiltersGroups],
  );

  const formQuestion = watch(ESearchFormFields.question);

  useEffect(() => {
    let isCanceled = false; // operations aren't needed if component is unmounted
    if (!isCanceled) {
      // 1: load all facets
      setLoading(true);
      fetchFacets({ qAdvanced: [] })
        // pass default facets to consecutive request (no need to set state)
        .then(resp => resp)
        // 2: update facets, deactivate those which yould yield no results in combination with current settings
        .then(defaultFacets => {
          fetchFacets({
            qAdvanced: [
              ...qAdvancedConditions,
              ...qAdvancedControls,
              ...qAdvancedFilters.filter(
                f =>
                  f.field === GROUPS_NAMES_MAP.get(selectedFiltersGroups?.[0]?.groupName),
              ),
            ],
          })
            .then(resp => {
              // leave the filters from the group selected first
              // same as they were configured by first request
              const newLocations = resp.filter(f => f.field === 'location')[0];
              const newCollections = resp.filter(f => f.field === 'collectionKey')[0];
              const newAssortments = resp.filter(f => f.field === 'assortments')[0];
              let newFacets = resp;
              switch (selectedFiltersGroups?.[0]?.groupName) {
                case 'collections':
                  newFacets = [
                    defaultFacets.filter(f => f.field === 'collectionKey')[0],
                    newLocations,
                    newAssortments,
                  ];
                  break;
                case 'locations':
                  newFacets = [
                    newCollections,
                    defaultFacets.filter(f => f.field === 'location')[0],
                    newAssortments,
                  ];
                  break;
                case 'assortments':
                  newFacets = [
                    newCollections,
                    newLocations,
                    defaultFacets.filter(f => f.field === 'assortments')[0],
                  ];
                  break;
              }
              setFacets(newFacets);
            })
            .finally(() => setLoading(false));
        });
    }

    return () => {
      isCanceled = true;
    };
  }, [trigger, selectedFiltersGroups, formQuestion]);

  const facetsParser = useMemo(() => new FacetsFiltersParser(facets), [facets]);

  const addFilterToSelectedFiltersList = useCallback(
    (group, filter) => {
      const newList = [...selectedFiltersGroups];

      let hasGroup = false;
      for (const filtersGroup of newList) {
        if (filtersGroup.groupName === group) {
          hasGroup = true;
          filtersGroup.selectedFiltersLabels.push(filter);
        }
      }
      if (!hasGroup) {
        newList.push({
          groupName: group,
          selectedFiltersLabels: [filter],
        });
      }
      
      setSelectedFiltersGroups(newList);
    },
    [selectedFiltersGroups],
  );

  const removeElementFromSelectedFiltersList = useCallback(
    (group, filter) => {
      const newList = [...selectedFiltersGroups];

      let emptyPosition = -1;
      for (let i = 0; i < newList?.length; i++) {
        if (newList[i].groupName === group) {
          newList[i].selectedFiltersLabels = newList[i].selectedFiltersLabels.filter(
            elem => elem !== filter,
          );

          if (!newList[i].selectedFiltersLabels.length) {
            emptyPosition = i;
          }
        }
      }
      if (emptyPosition !== -1) {
        newList.splice(emptyPosition, 1);
      }

      setSelectedFiltersGroups(newList);
    },
    [selectedFiltersGroups],
  );

  const triggerFetchFacets = () => setTrigger(prevState => !prevState);

  return (
    <FacetsContext.Provider
      value={{
        facets,
        facetsParser,
        updateFacets: triggerFetchFacets,
        isFilterInEntryPoint: isFilterInEntryPoint,
        loading: loading,
        addFilterToSelectedFiltersList,
        removeElementFromSelectedFiltersList,
      }}
    >
      {children}
    </FacetsContext.Provider>
  );
};
