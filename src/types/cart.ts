import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type CartItem = {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    image: SanityImageSource;
    note?: string;
  };
  