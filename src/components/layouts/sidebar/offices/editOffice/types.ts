export interface EditOfficePropsInterface {
  itemGroups: ItemGroupInterface[]
  onItemClick: (item: ItemGroupInterface) => void
}

interface ItemGroupInterface {
  groupName: string
  items: ItemsInterface[]
}

interface ItemsInterface {
  code: string
  url: string
}
