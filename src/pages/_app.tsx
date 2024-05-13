import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer";
import { queryClient } from "../lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useWindowRefresh } from "../hooks/useWindowRefresh";

export default function App({ Component, pageProps }: AppProps) {
  useWindowRefresh();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
