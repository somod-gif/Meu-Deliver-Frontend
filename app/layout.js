// app/layout.js
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./hooks/authContext";
import LayoutContent from "./layoutContent";
import { ThemeProvider } from './Context/ThemeProvider';
import { CartProvider } from './Context/CartContext';
import ErrorBoundary from "./errorBoundary";

export const metadata = {
  title: 'MeuDeliver - Angola\'s All-in-One Delivery',
  description: 'Food, pharmacy, supermarket, bar, and post deliveries — fast and reliable!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
        <ThemeProvider>
          <AuthContextProvider>
            <CartProvider>
              <LayoutContent>{children}</LayoutContent>
            </CartProvider>
          </AuthContextProvider>
        </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}