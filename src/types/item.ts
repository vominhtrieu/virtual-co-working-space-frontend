export interface ItemInterface {
    id: number;
    name: string;
    modelPath: string;
    createdAt: string;
    category:CategoryInterface;
    image: string;
  };

export interface CategoryInterface {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}