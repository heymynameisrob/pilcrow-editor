import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import "microtip/microtip.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Pilcrow Editor";
const APP_DEFAULT_TITLE = "Pilcrow Editor";
const APP_TITLE_TEMPLATE = "%s - Pilcrow Editor";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,  
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "var(--theme-color)",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: "device-width",    
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

  return (
    <html suppressHydrationWarning lang="en">      
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>    
    </html>
  );
}
