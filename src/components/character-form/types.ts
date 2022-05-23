export interface CharacterCustomFormInterface {
  itemGroups: ItemGroupInterface[];
  onItemClick: (item: ItemGroupInterface) => void;
}

interface ItemGroupInterface {
  groupName: string;
  items: ItemsInterface[];
}

interface ItemsInterface {
  code: string;
  url: string;
}

export interface CharacterFormProps {
  onClose?: () => void;
}
