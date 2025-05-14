export namespace Product {
  export interface PresentationProps {
    weight: string;
    price: number;
    quantity: number;
    image: string;
  }

  export interface Props {
    _id: string;
    title: string;
    description: string;
    aroma: string;
    presentations: PresentationProps[];
  }

  export interface ContextType {
    products: Props[];
    loading: boolean;
    error: string | null;
  }

  export interface ProductState {
    productToEdit?: Props;
  }
}
