import { NextRequest, NextResponse } from 'next/server';
import { ApiError, Client, Environment } from 'square/legacy';
import axios from 'axios';
import FormData from 'form-data';
import { CartItem } from '@/types/cart';
import { CustomerInfo } from '@/types/customer'; // Adjust path as needed
import { generateOrderEmailHTMLNew } from '@/emails/orderConfirmationTemplateNew';
import { getFloridaTaxRate } from '@/utils/florida_tax_rate';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production
});

const checkoutApi = client.checkoutApi;
const ordersApi = client.ordersApi;
const locationsApi = client.locationsApi;
const taxesApi = client.catalogApi; // For tax catalog management

/**
 * Find the appropriate tax rate based on customer address
 * Uses the Florida county tax rate system if the customer is in Florida,
 * otherwise falls back to a default rate.
 * 
 * @param customer Customer information with address details
 * @returns The applicable tax rate percentage
 */
function getTaxRateForCustomer(customer: CustomerInfo): number {
  // Extract address components from customer data
  const county = customer.address?.county || '';
  const state = customer.address?.administrativeDistrictLevel1 || '';
  
  // If customer is in Florida, use the Florida county tax system
  if (state.toUpperCase() === 'FL') {
    const floridaTaxRate = getFloridaTaxRate(county, state);
    console.log(`Applying Florida tax rate for ${county}, FL: ${floridaTaxRate.totalRate}%`);
    return floridaTaxRate.totalRate;
  }
  
  // For other states, you would implement their own tax lookup systems
  // This is a simplified example that returns standard rates for other states
  switch (state.toUpperCase()) {
    case 'AL': return 4; // Alabama 4%
    case 'AK': return 0; // Alaska 0%
    case 'AZ': return 5.6; // Arizona 5.6%
    case 'AR': return 6.5; // Arkansas 6.5%
    case 'CA': return 7.25; // California 7.25% (base state rate)
    case 'CO': return 2.9; // Colorado 2.9%
    case 'CT': return 6.35; // Connecticut 6.35%
    case 'DE': return 0; // Delaware 0%
    case 'DC': return 6; // District of Columbia 6%
    case 'GA': return 4; // Georgia 4%
    case 'HI': return 4; // Hawaii 4%
    case 'ID': return 6; // Idaho 6%
    case 'IL': return 6.25; // Illinois 6.25%
    case 'IN': return 7; // Indiana 7%
    case 'IA': return 6; // Iowa 6%
    case 'KS': return 6.5; // Kansas 6.5%
    case 'KY': return 6; // Kentucky 6%
    case 'LA': return 4.45; // Louisiana 4.45%
    case 'ME': return 5.5; // Maine 5.5%
    case 'MD': return 6; // Maryland 6%
    case 'MA': return 6.25; // Massachusetts 6.25%
    case 'MI': return 6; // Michigan 6%
    case 'MN': return 6.875; // Minnesota 6.875%
    case 'MS': return 7; // Mississippi 7%
    case 'MO': return 4.225; // Missouri 4.225%
    case 'MT': return 0; // Montana 0%
    case 'NE': return 5.5; // Nebraska 5.5%
    case 'NV': return 6.85; // Nevada 6.85%
    case 'NH': return 0; // New Hampshire 0%
    case 'NJ': return 6.625; // New Jersey 6.625%
    case 'NM': return 5.125; // New Mexico 5.125%
    case 'NY': return 4; // New York 4%
    case 'NC': return 4.75; // North Carolina 4.75%
    case 'ND': return 5; // North Dakota 5%
    case 'OH': return 5.75; // Ohio 5.75%
    case 'OK': return 4.5; // Oklahoma 4.5%
    case 'OR': return 0; // Oregon 0%
    case 'PA': return 6; // Pennsylvania 6%
    case 'RI': return 7; // Rhode Island 7%
    case 'SC': return 6; // South Carolina 6%
    case 'SD': return 4.5; // South Dakota 4.5%
    case 'TN': return 7; // Tennessee 7%
    case 'TX': return 6.25; // Texas 6.25%
    case 'UT': return 6.1; // Utah 6.1%
    case 'VT': return 6; // Vermont 6%
    case 'VA': return 5.3; // Virginia 5.3%
    case 'WA': return 6.5; // Washington 6.5%
    case 'WV': return 6; // West Virginia 6%
    case 'WI': return 5; // Wisconsin 5%
    case 'WY': return 4; // Wyoming 4%
    default: return 0; // Default to 0% if state unknown
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, customer } = body;

  console.log("Order Payload", JSON.stringify(body, null, 2));

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
  }

   // Get customer's tax rate based on state and county information
  const taxRate = getTaxRateForCustomer(customer);
  console.log(`Applying tax rate for ${customer.address?.county || ''}, ${customer.address?.administrativeDistrictLevel1 || ''}: ${taxRate}%`);

  // Get customer's zip code and apply appropriate tax rate
  // const customerTaxRate = getTaxRateForCustomer(customer);
  // console.log(`Applying tax rate for ${customer.county}, ${customer.state}: ${customerTaxRate}%`);

  const locationRes = await client.locationsApi.listLocations();
  const location = locationRes.result.locations?.find(loc => loc.status === 'ACTIVE');

  if (!location || !location.id) {
    return NextResponse.json({ error: 'No active location found' }, { status: 500 });
  }

  try {
    const lineItems = items.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity.toString(),
        basePriceMoney: {
          amount: BigInt(Math.round(item.price * 100)),
          currency: 'USD',
        },
      };
    });

    // Prepare customer address for tax calculation
    const customerAddress = {
      addressLine1: customer.address?.addressLine1 || '',
      addressLine2: customer.address?.addressLine2 || '',
      locality: customer.address?.locality || '', // City
      administrativeDistrictLevel1: customer.address?.administrativeDistrictLevel1 || 'PA', // State
      postalCode: customer.address?.postalCode || '',
      county: customer.address?.county ||'', // County
      country: 'US'
    };

    // 1. First create an order object with the appropriate tax rate
    const orderRequest = {
      idempotencyKey: new Date().toISOString() + '-order',
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: lineItems,
        // Add the tax directly to this order using the county-specific rate
        taxes: [
          {
            uid: `${customer.address.county.toLowerCase()}-sales-tax`,
            name: `${customer.address.county} Sales Tax`,
            percentage: taxRate.toString(), // County-specific tax rate
            scope: "ORDER"
          }
        ],
        fulfillments: [
          {
            type: "PICKUP",
            state: "PROPOSED",
            pickupDetails: {
              recipient: {
                displayName: customer.name || "Customer",
                emailAddress: customer.email
              },
              pickupAt: new Date(Date.now() + 86400000).toISOString() // 24 hours from now as default
            }
          }
        ],
        // Include customer billing address for tax calculation verification
        billingAddress: customerAddress
      }
    };

    // 2. Create the order with taxes
    const orderResponse = await ordersApi.createOrder(orderRequest);
    const orderId = orderResponse.result.order?.id;

    if (!orderId) {
      throw new Error("Failed to create order ID");
    }

    console.log('Created order with taxes:', orderResponse.result.order);

    // 3. Now create checkout with the order ID
    const checkoutResponse = await checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
      idempotencyKey: new Date().toISOString() + '-checkout',
      order: {
        order:orderRequest.order
      },
      
      redirectUrl: `${req.headers.get('origin')}/thank-you`,
      prePopulateBuyerEmail: customer.email.toString()
    });
    console.log("CHECKOUT RESPONSE", checkoutResponse);
    const checkoutUrl = checkoutResponse.result.checkout?.checkoutPageUrl;

    if (!checkoutUrl) {
      throw new Error("No checkout URL returned");
    }

    // 💌 Send email to business owner
    await sendOrderEmailToOwner(items, checkoutUrl, customer,Number(orderResponse.result.order?.totalTaxMoney)||taxRate);

    return NextResponse.json({ checkoutUrl });

  } catch (error) {
    console.error('Square checkout error:', error);

    if (error instanceof ApiError) {
      const errorMessage = error.message;
      const errorDetails = error.result?.errors ?? null;

      console.error('Square API message:', errorMessage);
      console.error('Square API errors:', JSON.stringify(errorDetails, null, 2));
    } else if (error instanceof Error) {
      const errorMessage = error.message;
      console.error('General error message:', errorMessage);
    }

    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

async function sendOrderEmailToOwner(items: CartItem[], checkoutUrl: string, customer: CustomerInfo, taxAmt: number) {
  const form = new FormData();

  const emailHTML = generateOrderEmailHTMLNew(items, checkoutUrl, customer, taxAmt);

  form.append('from', 'Order Bot <postmaster@sandbox84199c1eb7504f34b8891918eba801e7.mailgun.org>');
  form.append('to', 'marmikmodi209@gmail.com');  //blaine@flowwebdesigner.com
  form.append('subject', '🛒 New Checkout Initiated');
  form.append('html', emailHTML);

  await axios.post(
    `https://api.mailgun.net/v3/sandbox84199c1eb7504f34b8891918eba801e7.mailgun.org/messages`,
    form,
    {
      auth: {
        username: 'api',
        password: process.env.MAILGUN_API_KEY!,
      },
      headers: form.getHeaders(),
    }
  );
}
