// Florida Tax Rate Configuration for 2025
// This includes the state base rate (6%) plus county discretionary surtaxes
// For January 1 through May 31, 2025

interface FloridaTaxRateConfig {
  county: string;
  state: string;
  baseRate: number;        // Florida state base rate (6%)
  countyRate: number;      // County discretionary surtax rate
  totalRate: number;       // Combined rate (baseRate + countyRate)
  effectiveDate?: string;  // When the current surtax rate became effective
  expirationDate?: string; // When the current surtax rate expires (if applicable)
  notes?: string;          // Special notes about suspended rates or changes
}

// Florida state sales tax rate is 6%
const FL_STATE_RATE = 6;

// County discretionary surtax rates for Florida (January 1 through May 31, 2025)
export const FLORIDA_TAX_RATES: FloridaTaxRateConfig[] = [
  { county: 'Alachua', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2023', expirationDate: 'Dec 31, 2032' },
  { county: 'Baker', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 1994', expirationDate: 'None' },
  { county: 'Bay', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2036' },
  { county: 'Bradford', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Mar 1, 1993', expirationDate: 'None' },
  { county: 'Brevard', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2026' },
  { county: 'Broward', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2019', expirationDate: 'Dec 31, 2048' },
  { county: 'Calhoun', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2009', expirationDate: 'Dec 31, 2028' },
  { county: 'Charlotte', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Apr 1, 1995', expirationDate: 'Dec 31, 2026' },
  { county: 'Citrus', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0, totalRate: 6, expirationDate: 'None' },
  { county: 'Clay', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2021', expirationDate: 'Dec 31, 2050' },
  { county: 'Collier', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0, totalRate: 6, expirationDate: 'None' },
  { county: 'Columbia', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2023', expirationDate: 'Dec 31, 2042' },
  { county: 'DeSoto', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2015', expirationDate: 'Dec 31, 2035' },
  { county: 'Dixie', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Apr 1, 1990', expirationDate: 'Dec 31, 2029' },
  { county: 'Duval', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2021', expirationDate: 'Dec 31, 2035' },
  { county: 'Escambia', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 1998', expirationDate: 'Dec 31, 2037' },
  { county: 'Flagler', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2013', expirationDate: 'Dec 31, 2032' },
  { county: 'Franklin', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2023', expirationDate: 'Dec 31, 2042' },
  { county: 'Gadsden', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2009', expirationDate: 'Dec 31, 2038' },
  { county: 'Gilchrist', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Oct 1, 1992', expirationDate: 'None' },
  { county: 'Glades', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2022', expirationDate: 'Dec 31, 2031' },
  { county: 'Gulf', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2010', expirationDate: 'None' },
  { county: 'Hamilton', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 2, totalRate: 8, effectiveDate: 'Jan 1, 2025', expirationDate: 'Dec 31, 2036', notes: 'New 1% enhanced fire protection and rescue services surtax begins 1/1/2025' },
  { county: 'Hardee', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 1998', expirationDate: 'None' },
  { county: 'Hendry', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2023', expirationDate: 'Dec 31, 2042' },
  { county: 'Hernando', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0.5, totalRate: 6.5, effectiveDate: 'Jan 1, 2016', expirationDate: 'Dec 31, 2035' },
  { county: 'Highlands', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2036' },
  { county: 'Hillsborough', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2019', expirationDate: 'Dec 31, 2028', notes: 'Surtax suspended from 1/1/2025 through 5/31/2025' },
  { county: 'Holmes', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2021', expirationDate: 'Dec 31, 2032' },
  { county: 'Indian River', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jun 1, 1989', expirationDate: 'Dec 31, 2034' },
  { county: 'Jackson', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jul 1, 1996', expirationDate: 'Dec 31, 2035' },
  { county: 'Jefferson', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jun 1, 1988', expirationDate: 'None' },
  { county: 'Lafayette', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Sep 1, 1991', expirationDate: 'None' },
  { county: 'Lake', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 1988', expirationDate: 'Dec 31, 2032' },
  { county: 'Lee', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0.5, totalRate: 6.5, effectiveDate: 'Jan 1, 2019', expirationDate: 'Dec 31, 2028' },
  { county: 'Leon', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2003', expirationDate: 'Dec 31, 2039' },
  { county: 'Levy', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Oct 1, 1992', expirationDate: 'None' },
  { county: 'Liberty', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2026' },
  { county: 'Madison', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2007', expirationDate: 'None' },
  { county: 'Manatee', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2032' },
  { county: 'Marion', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2025', expirationDate: 'Dec 31, 2044', notes: 'New .5% school capital outlay surtax begins 1/1/2025' },
  { county: 'Martin', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2025', expirationDate: 'Dec 31, 2034', notes: 'New .5% local government infrastructure surtax begins 1/1/2025' },
  { county: 'Miami-Dade', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2003', expirationDate: 'None' },
  { county: 'Monroe', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 1996', expirationDate: 'Dec 31, 2048' },
  { county: 'Nassau', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Mar 1, 1996', expirationDate: 'None' },
  { county: 'Okaloosa', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2021', expirationDate: 'Dec 31, 2030' },
  { county: 'Okeechobee', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Oct 1, 1995', expirationDate: 'None' },
  { county: 'Orange', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0.5, totalRate: 6.5, effectiveDate: 'Jan 1, 2003', expirationDate: 'Dec 31, 2035' },
  { county: 'Osceola', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2045' },
  { county: 'Palm Beach', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2026' },
  { county: 'Pasco', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2005', expirationDate: 'Dec 31, 2039' },
  { county: 'Pinellas', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Feb 1, 1990', expirationDate: 'Dec 31, 2029' },
  { county: 'Polk', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2005', expirationDate: 'Dec 31, 2044' },
  { county: 'Putnam', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2003', expirationDate: 'Dec 31, 2032' },
  { county: 'St. Johns', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0.5, totalRate: 6.5, effectiveDate: 'Jan 1, 2016', expirationDate: 'Dec 31, 2035' },
  { county: 'St. Lucie', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2019', expirationDate: 'Dec 31, 2036' },
  { county: 'Santa Rosa', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2017', expirationDate: 'Dec 31, 2028' },
  { county: 'Sarasota', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Sep 1, 1989', expirationDate: 'Dec 31, 2039' },
  { county: 'Seminole', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 2015', expirationDate: 'Dec 31, 2034', notes: 'Current 1% local infrastructure surtax extended' },
  { county: 'Sumter', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 1993', expirationDate: 'None' },
  { county: 'Suwannee', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Jan 1, 1988', expirationDate: 'None' },
  { county: 'Taylor', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Aug 1, 1989', expirationDate: 'Dec 31, 2037' },
  { county: 'Union', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Feb 1, 1993', expirationDate: 'None' },
  { county: 'Volusia', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0.5, totalRate: 6.5, effectiveDate: 'Jan 1, 2002', expirationDate: 'Dec 31, 2031' },
  { county: 'Wakulla', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2023', expirationDate: 'Dec 31, 2037' },
  { county: 'Walton', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1, totalRate: 7, effectiveDate: 'Feb 1, 1995', expirationDate: 'None' },
  { county: 'Washington', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 1.5, totalRate: 7.5, effectiveDate: 'Jan 1, 2019', expirationDate: 'Dec 31, 2028' },
  // Default fallback
  { county: 'DEFAULT', state: 'FL', baseRate: FL_STATE_RATE, countyRate: 0, totalRate: 6 }
];

/**
 * Find the appropriate tax rate based on customer's Florida county
 * @param county The customer's county in Florida
 * @param state The customer's state (should be FL)
 * @returns The applicable tax rate configuration
 */
export function getFloridaTaxRate(county: string, state: string = 'FL'): FloridaTaxRateConfig {
  // Handle special case for Hillsborough during suspension period
  const today = new Date();
  const isHillsboroughSuspended = 
    county.toLowerCase() === 'hillsborough' && 
    today >= new Date('2025-01-01') && 
    today <= new Date('2025-05-31');
  
  if (isHillsboroughSuspended) {
    return { 
      county: 'Hillsborough', 
      state: 'FL', 
      baseRate: FL_STATE_RATE, 
      countyRate: 0, 
      totalRate: 6, 
      notes: 'Surtax suspended from 1/1/2025 through 5/31/2025' 
    };
  }

  // Find matching tax rate or use default
  const taxRate = FLORIDA_TAX_RATES.find(rate => 
    rate.county.toLowerCase() === county.toLowerCase() && 
    rate.state.toLowerCase() === state.toLowerCase()
  );
  
  return taxRate || FLORIDA_TAX_RATES[FLORIDA_TAX_RATES.length - 1]; // Fallback to default
}