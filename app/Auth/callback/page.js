'use client';

import { useRouter } from 'next/navigation'; // ← use 'next/navigation' in the app directory
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('access_token');
      const userStr = url.searchParams.get('user');

      if (token && userStr) {
        try {
          const decodedUserStr = decodeURIComponent(userStr);
          const user = JSON.parse(decodedUserStr);

          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('Login successful!');
          router.replace('/Portal/Clients/Dashboard');
        } catch (err) {
          console.error('Error parsing user data:', err);
          toast.error('Failed to process user data.');
        }
      } else {
        toast.error('Missing login information.');
      }
    }
  }, [router]);

  return <p>Logging you in...</p>;
};

export default CallbackPage;
