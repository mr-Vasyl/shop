import { Products } from "store/types/categories";

export type FilteredProducts = {
  price_min?: string | number;
  price_max: string;
  offset: number;
  limit: number;
};

export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[] | string;
};

export interface productsSchema {
  list: Products[];
  product: Products | null;
  filteredList: Products[];
  oneProduct: Products | null;
  error: string;
  isLoading: boolean;
  errorFilter: string;
  isLoadingFilter: boolean;
}
