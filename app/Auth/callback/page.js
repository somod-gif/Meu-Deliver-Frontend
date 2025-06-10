"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = () => {
      try {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('access_token');
        const userStr = url.searchParams.get('user');

        if (!token || !userStr) {
          toast.error('Missing login information.');
          router.replace('/Auth/Login');
          return;
        }

        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Safely set to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        toast.success('Login successful!');
        router.replace('/Portal/Clients/Dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        toast.error('Failed to process login. Please try again.');
        router.replace('/login');
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      handleAuthCallback();
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Logging you in...</p>
    </div>
  );
};

export default CallbackPage;