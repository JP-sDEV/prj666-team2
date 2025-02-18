'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    serialId: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // redirect to login page
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (status == 'authenticated') {
    console.log('000000000000000000000000' + session.user.id);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setError('Device Name are required.');
      return;
    }

    if (!session?.user?.id) {
      setError('User ID not found.');
      return;
    }

    try {
      const response = await fetch(`/api/${session.user.id}/raspberry-pi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Raspberry Pi registered successfully!');
        setFormData({
          userId: '',
          name: '',
          serialId: '',
        });
        setError(''); //reset error message
      } else {
        const data = await response.json();

        if (response.status === 409) {
          setError(data.message || 'Serial ID must be unique !');
        } else {
          setError('Error registering Raspberry Pi!!');
        }
      }
    } catch (error) {
      setError(error + 'Error registering Raspberry Pi');
    }
  };

  const handleGoDashboard = () => {
    router.push('/dashboard');
  };

  if (status === 'loading' || !isClient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="!mt-20 p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      {!successMessage && (
        <h2 className="text-xl font-semibold mb-4">Register Your Raspberry Pi</h2>
      )}
      {successMessage && <h2 className="text-xl font-semibold mb-4">{successMessage}</h2>}

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Conditionally render form fields based on successMessage */}
        {!successMessage && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Device Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="serialId" className="block text-sm font-medium text-gray-700">
                serial Id
              </label>
              <input
                type="text"
                id="serialId"
                name="serialId"
                value={formData.serialId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>

            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
              Register
            </button>
          </>
        )}

        {successMessage && (
          <button
            type="button"
            onClick={handleGoDashboard}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 mt-4"
          >
            Go to Dashboard
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
