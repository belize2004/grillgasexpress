import { CartItem } from "@/types/cart";
import { CustomerInfo } from "@/types/customer";

export function generateOrderEmailHTMLNew(items: CartItem[], checkoutUrl: string, customer: CustomerInfo, taxAmt: number) {
  console.log("🧾 Cart items received in email generator:", items);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal+taxAmt;

  // Create product table rows
  const productRows = items
    .map(
      item => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">🛒 New Checkout Initiated</h2>
      <p>Hello,</p>
      <p>A new customer has initiated a checkout on <strong>Grill Gas Express</strong>.</p>  

      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Summary</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
            <th style="padding: 8px; text-align: center; border-bottom: 1px solid #ddd;">Qty</th>
            <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>

      <div style="text-align: left; margin-bottom: 20px;">
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${taxAmt.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

      <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">Customer Details</h2>
      <div style="margin-top: 20px;">
        <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone Number:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address?.addressLine1}, ${customer.address?.addressLine2}, ${customer.address?.locality}, ${customer.address?.county} ${customer.address?.administrativeDistrictLevel1}, ${customer.address?.postalCode} </p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><strong>Delivery:</strong> Standard Delivery (2–5 Days)</p>
      </div>
      <br/>
      <p>Thanks,<br/>Grill Gas Express Bot</p>
    </div>
  `;
}