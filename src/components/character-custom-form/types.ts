export interface CharacterCustomFormInterface {
  itemGroups: ItemGroupInterface[]
  onItemClick: (groupId, itemIdx) => void
}

interface ItemGroupInterface {
  groupName: string
  items: ItemsInterface[]
}

interface ItemsInterface {
  code: string
  url: string
}
