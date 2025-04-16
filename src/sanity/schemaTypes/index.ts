import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../schemas/product-schema'
import { testimonial } from '../schemas/testimonial-schema'
import { profile } from '../schemas/profile-schema'
import { cartItem } from '../schemas/cartItem'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, testimonial, profile, cartItem],
}
