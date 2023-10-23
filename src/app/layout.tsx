import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Navbar/Header";
import { Providers } from "@/redux/Providers/storeprovider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digit Ecommerce App",
  description: "Get creative, make sales!",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        {/* <PersistGate loading={<div className="loader"></div>} persistor={persistor} > */}
        <body className={inter.className}>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </body>
        {/* </PersistGate> */}
      </Providers>
    </html>
  );
}
