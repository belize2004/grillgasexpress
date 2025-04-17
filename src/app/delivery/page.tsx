// // app/delivery/page.tsx
// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { CartItem } from '@/types/cart';

// const DeliveryPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const cart = searchParams.get('cart');
//   const items: CartItem[] = cart ? JSON.parse(decodeURIComponent(cart)) : [];

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     phone: '',
//     email: '',
//     deliveryOption: 'Standard',
//     message: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           items: items.map(i => ({
//             name: i.title,
//             quantity: i.quantity,
//             price: i.price,
//           })),
//           customer: formData,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Checkout failed');

//       toast.success('Redirecting...');
//       window.location.href = data.checkoutUrl;
//     } catch (err: any) {
//       toast.error(err.message || 'Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/form_bg.png')" }}>
//       <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-lg w-full max-w-lg border border-blue-300">
//         <h2 className="text-2xl font-bold mb-2 text-center">Complete Your Delivery</h2>
//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Enter your details to get your propane tank delivered fast and hassle-free.
//         </p>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input className="border rounded p-2" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
//           <input className="border rounded p-2" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
//         </div>
//         <input className="w-full border rounded p-2 mb-4" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input className="border rounded p-2" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
//           <input className="border rounded p-2" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
//         </div>
//         <select className="w-full border rounded p-2 mb-4" value={formData.deliveryOption} onChange={e => setFormData({ ...formData, deliveryOption: e.target.value })}>
//           <option>Standard Delivery (2-5 Days)</option>
//           <option>Express Delivery (Next Day)</option>
//         </select>
//         <textarea className="w-full border rounded p-2 mb-4" placeholder="Message (optional)" rows={2} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>

//         <button
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Processing...' : 'Confirm'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeliveryPage;
