"use clients"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('access_token');
      const userStr = url.searchParams.get('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));

          localStorage.setItem('userToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('Login successful!');
          router.replace('/Portal/Clients/Dashboard'); 
        } catch (err) {
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
