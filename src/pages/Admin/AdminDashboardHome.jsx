import React from 'react';
import { FaThumbsUp, FaExclamationTriangle, FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboardHome = () => {
  const navigate = useNavigate(); // useNavigate hookni chaqiramiz

  const data = [
    { icon: <FaThumbsUp size={28} />, title: 'Takliflar', murojat: 68, kutib_chiqilganlar: 45, link: 'offers' },
    { icon: <FaRegCommentDots size={28} />, title: 'Shikoyatlar', murojat: 98, kutib_chiqilganlar: 12, link: 'complaints' },
    { icon: <FaRegCalendarAlt size={28} />, title: 'Appelatsiyalar', murojat: 55, kutib_chiqilganlar: 32, link: 'appellations' },
    { icon: <FaExclamationTriangle size={28} />, title: 'Javoblar', murojat: 302, kutib_chiqilganlar: 302, link: 'answares' },
  ];

  const handleCardClick = (link) => {
    // useNavigate yordamida sahifaga yo'naltiramiz
    navigate(`/admin/${link}`);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center text-blue-500 mb-12">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => handleCardClick(item.link)} // Kartaga bosilganda sahifaga o'tadi
          >
            {/* Card */}
            <div className="block p-6 bg-white rounded-3xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full p-4 mb-4 w-16 h-16 flex items-center justify-center mx-auto">
                {item.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
              <div className="mb-4">
                <p className="text-lg text-gray-600">
                  <strong>Muroojaatlar:</strong> {item.murojat}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Kutib chiqilganlar:</strong> {item.kutib_chiqilganlar}
                </p>
              </div>
              <div className="relative pt-1">
                <label className="block text-gray-600 text-sm font-semibold mb-2">Kutish progressi</label>
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-teal-500 text-white">
                    {Math.round((item.kutib_chiqilganlar / item.murojat) * 100)}%
                  </span>
                </div>
                <div className="flex mb-4">
                  <div
                    className="flex-1 bg-teal-200 rounded-full"
                    style={{ width: `${(item.kutib_chiqilganlar / item.murojat) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Neon border effect on hover */}
            <div className="absolute inset-0 border-4 border-transparent rounded-3xl group-hover:border-teal-500 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
