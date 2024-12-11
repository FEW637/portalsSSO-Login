import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const targetUrl = urlParams.get('target');
        const token = localStorage.getItem('access_token');

        if (!targetUrl || !token) {
          navigate('/dashboard');
          return;
        }

        // Create form to post to target application
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = targetUrl;
        form.target = '_blank';

        // Add token as hidden input
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'access_token';
        tokenInput.value = token;
        form.appendChild(tokenInput);

        // Submit form
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // Return to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Redirect error:', error);
        navigate('/dashboard');
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default RedirectHandler;