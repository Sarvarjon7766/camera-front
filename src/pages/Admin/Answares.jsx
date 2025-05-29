import React from 'react';
import { FaRegCommentDots, FaRegThumbsUp, FaRegCalendarAlt, FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const Answares = () => {
  const data = [
    { _id: 1, type: 'offers', title: "Title 1", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
    { _id: 2, type: 'complains', title: "Title 2", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
    { _id: 32, type: 'appellations', title: "Title 3", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
    { _id: 52, type: 'appellations', title: "Title 4", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
    { _id: 45, type: 'complains', title: "Title 5", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
    { _id: 78, type: 'offers', title: "Title 6", description: "Lorem dsvd dvdfv", date: "2025-00", answare: "Lorem dsf vdv dv" },
  ];

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Javoblar');
    XLSX.writeFile(wb, 'javoblar.xlsx');
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Javoblar Jadvali</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-200">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Tur</th>
              <th className="py-3 px-6">Mavzu</th>
              <th className="py-3 px-6">Tavsif</th>
              <th className="py-3 px-6">Sana</th>
              <th className="py-3 px-6">Javob</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {data.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  <span className={`flex items-center gap-2 py-1 px-3 rounded-full text-xs ${item.type === 'offers' ? 'bg-blue-100 text-blue-800' : item.type === 'complains' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.type === 'offers' && <FaRegThumbsUp />}
                    {item.type === 'complains' && <FaRegCommentDots />}
                    {item.type === 'appellations' && <FaRegCalendarAlt />}
                    {item.type === 'offers' && 'Taklif'}
                    {item.type === 'complains' && 'Shikoyat'}
                    {item.type === 'appellations' && 'Appelatsiya'}
                  </span>
                </td>
                <td className="py-3 px-6 font-semibold">{item.title}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6">{item.date}</td>
                <td className="py-3 px-6">{item.answare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadExcel}
        className="fixed bottom-8 right-8 p-4 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <FaDownload size={24} />
      </button>
    </div>
  );
}

export default Answares;
