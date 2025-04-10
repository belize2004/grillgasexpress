import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
// Import the context

// Configure the Lato font
const lato = Lato({
  weight: ['300','400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: {
    default:"Grill Gas Express",  // default tab title for all pages
    template: '%s | GrillGasExpress',  // used when individual pages set a title
  },
  description: "Your trusted gas delivery service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <head>
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </head>
      <body className={`${lato.variable}`}>
      <Toaster position="top-right" reverseOrder={false} />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
