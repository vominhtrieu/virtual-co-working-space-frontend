import {Item} from "../../../../../services/api/offices/get-office-item/types";

export interface EditOfficePropsInterface {
  onItemClick: (item: Item) => void
  onClose: () => void
}
