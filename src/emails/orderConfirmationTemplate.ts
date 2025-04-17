import { CartItem } from "@/types/cart";
import { CustomerInfo } from "@/types/customer";

export function generateOrderEmailHTML(items: CartItem[], checkoutUrl: string, customer: CustomerInfo) {
  console.log("🧾 Cart items received in email generator:", items);

  const itemList = items
    .map(
      item =>
        `<li><strong>${item.name}</strong> (x${item.quantity}) — $${item.price.toFixed(2)}</li>`
    )
    .join('');

  const customerInfo = customer
    ? `
      <h3>👤 Customer Details:</h3>
      <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
    `
    : '';

  return `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
      <h2>🛒 New Checkout Initiated</h2>
      <p>Hello,</p>
      <p>A new customer has initiated a checkout on <strong>Grill Gas Express</strong>.</p>

      ${customerInfo}

      <h3>🧾 Order Details:</h3>
      <ul>
        ${itemList}
      </ul>

      <p>
        <strong>🔗 Checkout Link:</strong><br/>
        <a href="${checkoutUrl}" target="_blank">${checkoutUrl}</a>
      </p>

      <br/>
      <p>Thanks,<br/>Grill Gas Express Bot</p>
    </div>
  `;
}
