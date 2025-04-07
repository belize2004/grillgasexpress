import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Testimonial = {
  _id: string;
  _createdAt: string;
  clientName: string;
  content: string;
  rating: string; // like "5/5 ★★★★★"
  image?: SanityImageSource & {
    alt?: string;
  };
};
