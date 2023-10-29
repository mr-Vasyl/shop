export type Categories = {
  id: string;
  name: string;
  image?: string;
};

export type RelatedProducts = {
  isMount?: boolean;
  categoryId?: string;
  offset: number;
  limit: number;
};

export interface Products {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Categories;
  images: string[];
}

export interface CategoriesSchema {
  list: Categories[];
  related: Products[];
  search: Products[];
  error?: string;
  errorSearch?: string;
  isLoading: boolean;
  isLoadingSearch: boolean;
  isLoadingRelated: boolean;
}
