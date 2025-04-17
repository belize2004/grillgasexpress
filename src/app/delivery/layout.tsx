// app/layout.tsx or app/page.tsx or any specific page
import DeliveryHeader from './header';

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DeliveryHeader />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
