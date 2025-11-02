import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Login = ({ loginUser, user }) => { // ✅ user bhi receive karo
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // ✅ CORRECT: user check karo, token nahi
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
    setError('');

    setTimeout(() => {
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
    }, 100);
  }, []);

  useEffect(() => {
    const checkAndClearAutoFill = () => {
      setTimeout(() => {
        if (emailRef.current && emailRef.current.value !== formData.email) {
          emailRef.current.value = '';
        }
        if (passwordRef.current && passwordRef.current.value !== formData.password) {
          passwordRef.current.value = '';
        }
      }, 200);
    };

    window.addEventListener('load', checkAndClearAutoFill);
    window.addEventListener('focus', checkAndClearAutoFill);

    return () => {
      window.removeEventListener('load', checkAndClearAutoFill);
      window.removeEventListener('focus', checkAndClearAutoFill);
    };
  }, [formData.email, formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || data?.message || 'Login failed';
        setError(errorMessage);
        toast.error(`❌ ${errorMessage}`, {
          position: "top-left", 
          autoClose: 2000,
        });
        setLoading(false);
        return;
      }

      toast.success('Login successful!', {
        position: "top-left",
        autoClose: 2000,
      });

      setFormData({ email: '', password: '' });
      
      localStorage.setItem('user', JSON.stringify(data.data));
      
      if (loginUser) {
        loginUser(data.data);
      }
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      setError('Network error. Please try again.');
      toast.error('❌ Network error. Please try again.', {
        position: "top-left",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img 
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=pink&shade=600" 
            alt="Your Company" 
            className="mx-auto h-10 w-auto" 
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Do not have an account?{' '}
            <Link href="/signup" className="font-semibold text-pink-600 hover:text-pink-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input 
                  ref={emailRef}
                  id="email" 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  autoComplete="new-email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/forgot" className="font-semibold text-pink-600 hover:text-pink-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input 
                  ref={passwordRef}
                  id="password" 
                  type="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Do not have an account?{' '}
              <Link href="/signup" className="font-semibold text-pink-600 hover:text-pink-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;