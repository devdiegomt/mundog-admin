export namespace Product {
  export interface Props {
    _id: string;
    title: string;
    price: number;
    description: string;
    aroma: string;
    quantity: number;
    image?: string;
    weightKg: string;
  }

  export interface ContextType {
    products: Props[];
    loading: boolean;
    error: string | null;
  }
}
