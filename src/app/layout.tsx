import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Example Signup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-content1 sm:bg-content2 fenix">
      <body>
        <Providers>
          <div className="min-h-dvh w-full flex flex-col items-center justify-center sm:p-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
