
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  isNewProduct: boolean;
}



export interface productsCardProps {
  Product: {
    Product: any
  }
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

  export interface ProdactCardProps {
    item: {
      _id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    };
    onRemove: (itemId: string) => void;
    onDecreaseQuantity: (itemId: string) => void;
    onIncreaseQuantity: (itemId: string) => void;
  }

  export interface SubtotalProps {
    subtotal: number;
    shipping: number;
    total: number;
  }
  