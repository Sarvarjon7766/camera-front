import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaRegClock } from 'react-icons/fa'

const Appellations = () => {
  const [datas, setDatas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedAppellation, setSelectedAppellation] = useState(null)
  const [responseText, setResponseText] = useState('')

  // Ma'lumotlarni olish
  const fetchLeader = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token topilmadi!')
        return
      }
      const res = await axios.post(
        'https://admininteractive.ssuv.uz/api/v1/leader-application/leader-appellatsiya',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (res.data.status === 'success') {
        setDatas(res.data.data)
      }
    } catch (error) {
      console.error('Xatolik:', error)
    }
  }

  useEffect(() => {
    fetchLeader()
  }, [])

  // Modalni ochish
  const openModal = (appellation) => {
    setSelectedAppellation(appellation)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAppellation(null)
    setResponseText('')
  }

  // Arizani tasdiqlash
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token topilmadi!')
        return
      }
      console.log(selectedAppellation)
      console.log(responseText)

      const res = await axios.post(
        `https://admininteractive.ssuv.uz/api/v1/leader-application/reply`,
        {
          application_id: selectedAppellation.id,
          reply_message: responseText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (res.data.status === 'success') {
        closeModal()
        fetchLeader() // Ma'lumotlarni yangilash
      } else {
        alert('Xatolik yuz berdi!')
      }
    } catch (error) {
      console.error('Tasdiqlashda xatolik:', error)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Arizalar Jadvali</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
        {/* Jadval sarlavhasi */}
        <ul className="grid grid-cols-6 gap-4 bg-sky-300 text-white uppercase text-sm font-semibold p-3 rounded-t-md min-w-[900px]">
          <li>#</li>
          <li>Nomi</li>
          <li>Tavsif</li>
          <li>Sana</li>
          <li>Holat</li>
          <li className="text-center">Amal</li>
        </ul>

        {/* Ma'lumotlar qatori */}
        {datas.map((appellation, index) => (
          <ul
            key={appellation._id}
            className="grid grid-cols-6 gap-4 text-gray-700 text-sm items-center border-b hover:bg-gray-100 p-3 min-w-[900px]"
          >
            <li>{index + 1}</li>
            <li className="font-semibold">{appellation.title}</li>

            {/* Tavsif scroll bilan */}
            <li className="overflow-auto max-h-24 break-words whitespace-pre-wrap border-none rounded p-2">
              {appellation.message}
            </li>

            <li>{new Date(appellation.created_at).toLocaleString()}</li>

            <li>
              {appellation.status === 'yangi' ? (
                <span className="flex items-center gap-2 bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs w-fit">
                  <FaRegClock /> Ko'rib chiqish kerak
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs w-fit">
                  <FaCheckCircle /> Ko'rib chiqildi
                </span>
              )}
            </li>

            <li className="text-center">
              {appellation.status === 'yangi' ? (
                <button
                  onClick={() => openModal(appellation)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center transition"
                >
                  <FaCheckCircle /> Tasdiqlash
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center cursor-not-allowed"
                >
                  <FaCheckCircle /> Tasdiqlangan
                </button>
              )}
            </li>
          </ul>
        ))}
      </div>


      {/* Modal */}
      {showModal && selectedAppellation && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-[700px] z-10">
            <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Tasdiqlash</h2>
            <p className="text-blue-500 mb-4 text-center">
              Siz <strong>{selectedAppellation.title}</strong> arizasini tasdiqlaysizmi?
            </p>

            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none"
              placeholder="Javobni kiriting..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full"
              >
                Tasdiqlash
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appellations
