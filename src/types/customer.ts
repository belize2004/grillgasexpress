// export interface CustomerInfo {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     address: Address;
//     deliveryOption?: string;
//     message?: string;
//   }
// Example types for the CustomerInfo interface extension
// Add these to your types/customer.ts file

export interface CustomerInfo {
  firstName?: string;
  lastName: string;
  email: string;
  phone?: string;
  deliveryOption?: string;
  message?: string;// Add county field for tax calculation
  address?: Address;
}