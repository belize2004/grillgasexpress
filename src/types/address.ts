interface Address {
  addressLine1: string;
  addressLine2: string;
  locality: string;                     // City
  administrativeDistrictLevel1: string; // State
  postalCode: string;
  county?: string;                    // ZIP code
}