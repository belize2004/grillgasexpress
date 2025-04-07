import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Profile = {
  _id: string;
  _createdAt: string;
  name: string;
  role: string;
  image: SanityImageSource;
  externalLink?: string;
};
