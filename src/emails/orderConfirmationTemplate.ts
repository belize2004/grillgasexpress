import { CartItem } from "@/types/cart";

export function generateOrderEmailHTML(items: CartItem[], checkoutUrl: string): string {
    
    const itemList = items
      .map(
        item =>
          `<li><strong>${item.title}</strong> (x${item.quantity}) — $${item.price}</li>`
      )
      .join('');
  
    return `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
        <h2>🛒 New Checkout Initiated</h2>
        <p>Hello Blaine,</p>
        <p>A new customer has initiated a checkout on <strong>Grill Gas Express</strong>.</p>
        
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
  