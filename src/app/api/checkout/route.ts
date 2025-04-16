// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';
import axios from 'axios';
import FormData from 'form-data';
import { generateOrderEmailHTML } from '@/emails/orderConfirmationTemplate'; // 👈 Adjust the path as needed

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Sandbox
});

const checkoutApi = client.checkoutApi;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items } = body;

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
  }

  const locationRes = await client.locationsApi.listLocations();
  const location = locationRes.result.locations?.find(loc => loc.status === 'ACTIVE');

  if (!location || !location.id) {
    return NextResponse.json({ error: 'No active location found' }, { status: 500 });
  }

  try {
    const lineItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency: 'USD',
      },
    }));

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
    await sendOrderEmailToOwner(items, checkoutUrl??'');

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('Square checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

// 👇 Utility function to send email via Mailgun
async function sendOrderEmailToOwner(items: any[], checkoutUrl: string) {
  const form = new FormData();

  const emailHTML = generateOrderEmailHTML(items, checkoutUrl);

  form.append('from', 'Order Bot <postmaster@sandbox84199c1eb7504f34b8891918eba801e7.mailgun.org>');
  form.append('to', 'marmikmodi209@gmail.com'); // must be verified in sandbox
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
