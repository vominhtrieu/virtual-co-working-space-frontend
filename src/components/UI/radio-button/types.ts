export interface RadioButtonProps {
     listCategory: {
          id: number;
          name: string;
     }[];

     onClick: (itemId: number) => void;
}