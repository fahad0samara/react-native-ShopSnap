export interface productsCardProps {
    product: {
      _id: string;
      name: string;
      image: string;
      description: string;
      price: number;
      originalPrice: number;
      discountPercentage: number;
      stockQuantity: number;
      isNewProduct: boolean;
    };
  }

  export interface products {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    categories: { _id: string; name: string }[];
    brands: string[];
    stockQuantity: number;
    isNewProduct: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  