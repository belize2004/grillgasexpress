// // pages/api/checkout.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import {   Client, Environment } from 'square/legacy';

// const client = new Client({
//     accessToken: process.env.SQUARE_ACCESS_TOKEN!,
//     environment: Environment.Sandbox, // Change to Environment.Production when deploying
//   });

// const checkoutApi = client.checkoutApi;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { items } = req.body;

//   if (!items || !Array.isArray(items)) {
//     return res.status(400).json({ error: 'Invalid cart data' });
//   }

//   try {
//     const lineItems = items.map((item: any) => ({
//       name: item.name,
//       quantity: item.quantity.toString(),
//       basePriceMoney: {
//         amount: Math.round(item.price * 100),
//         currency: 'USD',
//       },
//     }));

//     const response = await checkoutApi.createCheckout(process.env.SQUARE_LOCATION_ID!, {
//       idempotencyKey: new Date().toISOString(),
//       order: {
//         order: {
//           locationId: process.env.SQUARE_LOCATION_ID!,
//           lineItems,
//         },
//       },
//       redirectUrl: `${req.headers.origin}/thank-you`,
//     });

//     res.status(200).json({ checkoutUrl: response.result.checkout?.checkoutPageUrl });
//   } catch (error: any) {
//     console.error('Square checkout error:', error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// }
