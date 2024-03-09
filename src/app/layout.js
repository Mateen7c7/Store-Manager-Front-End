"use client";
import "./globals.css";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className=" pt-7 px-10 sm:pt-10 sm:px-20 ">
          <Header />
          <main className="">{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
