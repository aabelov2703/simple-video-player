import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/appContext";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Player",
  description: "Simple Educational Video Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={`${inter.className} flex flex-col items-center`}>
          <Nav />
          <main className="flex-1 items-center justify-between p-6 sm:p-10 w-full xs:w-[460px] sm:w-[600px] md:w-[750px] lg:w-[900px] xl:w-[1024px] overflow-y-auto">
            {children}
          </main>
          <Footer />
        </body>
      </AppContextProvider>
    </html>
  );
}
