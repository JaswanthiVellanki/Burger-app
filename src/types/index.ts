// Price comes from the API in cents (499 = $4.99).
// Keeping it as cents avoids floating point issues with money.
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    calorie: number;
    slug: string; // used in the URL e.g. /product/burger-a
  }
  
  // When something gets added to the cart it's just a Product with a quantity on top.
  export interface CartItem extends Product {
    quantity: number;
  }