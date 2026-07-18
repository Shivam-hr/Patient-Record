import "./globals.css";
import InstallBanner from "@/components/InstallBanner";

export const metadata = {
  title: "Wadhawan Hospital — Patient Desk",
  description: "WhatsApp-based patient booking and reminder desk",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Patient Desk",
  },
};

export const viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <InstallBanner />
      </body>
    </html>
  );
}
