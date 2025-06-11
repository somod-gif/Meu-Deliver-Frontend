import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = () => {
      try {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('access_token');
        const userStr = url.searchParams.get('user');

        if (token && userStr) {
            const user = JSON.parse(decodeURIComponent(userStr));

            localStorage.setItem('userToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Login successful!');
            router.replace('/Portal/Clients/Dashboard'); 
        } else {
          toast.error('Missing login information.');
        }
      } catch (err) {
        toast.error('Failed to process user data.');
      }
    }
    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Logging you in...</p>
    </div>
  );
};

export default CallbackPage;