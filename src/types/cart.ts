import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type CartItem = {
    _id: string;
    name: string;
    image: SanityImageSource;
    price: number;
    quantity: number;
  };
  