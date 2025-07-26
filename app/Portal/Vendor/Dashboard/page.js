// app/Portal/Vendor/Dashboard/page.js
import { redirect } from 'next/navigation';

export default function VendorPortal() {
  // Redirect to the dashboard by default
  redirect('/Portal/Vendor/Dashboard/dashboard');
}