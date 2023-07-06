import {
  IFacet,
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch
} from "./index";
import { SortOption } from "../utils/configuration/sorting-info.config";

export interface ISearchFormData {
  question: string;
  conditions?: IVirtualSearchAttributeCondition[];
  searchControls?: IVirtualSearchSwitch[];
  advancedFilters?: IVirtualSearchFilterGroup[];
  sort?: SortOption;
}
