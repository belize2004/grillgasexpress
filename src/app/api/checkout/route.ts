// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square/legacy';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Sandbox,
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

    return NextResponse.json({
      checkoutUrl: response.result.checkout?.checkoutPageUrl,
    });
  } catch (error) {
    console.error('Square checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
