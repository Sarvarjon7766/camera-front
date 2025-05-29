import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('code');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://admininteractive.ssuv.uz/api/v1/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.status === 'success') {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) return <p className="text-center mt-10">Yuklanmoqda...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={user.profile_picture}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-400 shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
            {user.fullname}
          </h1>
          <p className="text-gray-600 mb-4">{user.email} · {user.phone}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <span className="font-semibold">Login:</span> {user.login}
            </div>
            <div>
              <span className="font-semibold">Mutaxassisligi:</span> {user.mutaxasisligi}
            </div>
            <div>
              <span className="font-semibold">Lavozimi:</span> {user.position}
            </div>
            <div>
              <span className="font-semibold">Mamlakat:</span> {user.country}
            </div>
            <div>
              <span className="font-semibold">Ro'yxatdan o'tgan:</span> {user.created_at}
            </div>
            <div>
              <span className="font-semibold">Oxirgi kirish:</span> {user.last_login_at}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
