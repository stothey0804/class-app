import "./globals.css";

import { PageHeader } from "@/components/PageHeader";
import { LayoutProvider } from "@/components/LayoutProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <LayoutProvider>
            <PageHeader />
            {children}
          </LayoutProvider>
        </div>
      </body>
    </html>
  );
}
