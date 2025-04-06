import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // set to true for production
  perspective: "published",
});