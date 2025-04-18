import { NextRequest, NextResponse } from 'next/server';
import { ApiError, Client, Environment } from 'square/legacy';
import axios from 'axios';
import FormData from 'form-data';
import { generateOrderEmailHTML } from '@/emails/orderConfirmationTemplate';
import { CartItem } from '@/types/cart';
import { CustomerInfo } from '@/types/customer'; // Adjust path as needed

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production
});

const checkoutApi = client.checkoutApi;

export async function POST(req: NextRequest) {
  const body = await req.json();
 const { items, customer } = body;

 console.log("Order Payload", JSON.stringify(body, null, 2));

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
  }

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

    const response = await checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
      idempotencyKey: new Date().toISOString(),
      order: {
        order: {
          locationId: process.env.SQUARE_LOCATION_ID!,
          lineItems,
        },
      },
      redirectUrl: `${req.headers.get('origin')}/thank-you`,
    });

    const checkoutUrl = response.result.checkout?.checkoutPageUrl;

    // 💌 Send email to business owner
    await sendOrderEmailToOwner(items, checkoutUrl ?? '', customer);

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

async function sendOrderEmailToOwner(items:CartItem[],checkoutUrl: string, customer: CustomerInfo) {
  const form = new FormData();

  const emailHTML = generateOrderEmailHTML(items, checkoutUrl, customer);

  form.append('from', 'Order Bot <postmaster@sandbox84199c1eb7504f34b8891918eba801e7.mailgun.org>');
  form.append('to', 'blaine@flowwebdesigner.com');
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
