'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // 로그인 상태 체크를 위한 NextAuth 훅
import { useRouter } from 'next/navigation'; // 페이지 리다이렉트 기능

const RegisterForm = () => {
  const { data: session, status } = useSession(); // 로그인 상태 및 세션 데이터 가져오기
  const [isClient, setIsClient] = useState(false); // 클라이언트에서만 실행되도록 하기 위한 상태
  const router = useRouter(); // 페이지 리다이렉트 기능

  // 클라이언트에서만 useRouter를 사용하도록 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [formData, setFormData] = useState({
    raspberryPiId: '',
    deviceName: '',
    deviceModel: '',
    location: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 로그인 상태에 따라 페이지 리다이렉트
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); // 로그인 페이지로 리다이렉트
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.raspberryPiId || !formData.deviceName) {
      setError('Raspberry Pi ID and Device Name are required.');
      return;
    }

    if (!session?.user?.id) {
      setError('User ID not found.');
      return;
    }

    try {
      const response = await fetch(`/api/${session.user.id}/raspberry-pi/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Raspberry Pi registered successfully!');
        setFormData({ raspberryPiId: '', deviceName: '', deviceModel: '', location: '' });
      } else {
        setError('Error registering Raspberry Pi');
      }
    } catch (error) {
      setError('Error registering Raspberry Pi');
    }
  };

  if (status === 'loading' || !isClient) {
    return <p>Loading...</p>; // 로그인 상태 확인 중일 때 로딩 화면
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Register Your Raspberry Pi</h2>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

        <div className="mb-4">
          <label htmlFor="raspberryPiId" className="block text-sm font-medium text-gray-700">
            Raspberry Pi ID
          </label>
          <input
            type="text"
            id="raspberryPiId"
            name="raspberryPiId"
            value={formData.raspberryPiId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700">
            Device Name
          </label>
          <input
            type="text"
            id="deviceName"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deviceModel" className="block text-sm font-medium text-gray-700">
            Device Model
          </label>
          <input
            type="text"
            id="deviceModel"
            name="deviceModel"
            value={formData.deviceModel}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
