import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  _createdAt: string;
  name: string;
  price: number;
  image: SanityImageSource;
  slug: {
    _type: "slug";
    current: string;
  };
};
