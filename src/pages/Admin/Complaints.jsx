import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaRegClock } from 'react-icons/fa'

const Complaints = () => {
  const [datas, setDataa] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [responseMessage, setResponseMessage] = useState('')

  // Ma'lumotlarni olish
  const fetchLeader = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token topilmadi!')
        return
      }

      const res = await axios.post(
        `https://admininteractive.ssuv.uz/api/v1/leader-application/leader-shikoyat`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      if (res.data.status === 'success') {
        setDataa(res.data.data)
      }
    } catch (error) {
      console.error("Xatolik:", error)
    }
  }

  useEffect(() => {
    fetchLeader()
  }, [])

  // Modalni ochish
  const openModal = (complaint) => {
    setSelectedComplaint(complaint)
    setShowModal(true)
  }

  // Modalni yopish
  const closeModal = () => {
    setShowModal(false)
    setSelectedComplaint(null)
    setResponseMessage('')
  }

  // Tasdiqlash funksiyasi: ID va javob bilan so‘rov yuborish
  const handleDeactivate = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token topilmadi!')
        return
      }
      console.log(id)
      console.log(responseMessage)

      const res = await axios.post(
        `https://admininteractive.ssuv.uz/api/v1/leader-application/reply`,
        {
          application_id: id,
          reply_message: responseMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.status === 'success') {
        setDataa(prev =>
          prev.map(item =>
            item._id === id ? { ...item, status: 'hal_qilingan' } : item
          )
        )
        fetchLeader()
      }

      closeModal()
    } catch (error) {
      console.error("Yuborishda xatolik:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📝 Shikoyatlar Jadvali</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
        {/* Sarlavha (header) */}
        <ul className="grid grid-cols-6 gap-4 bg-sky-300 text-white uppercase text-sm font-semibold p-3 rounded-t-md min-w-[900px]">
          <li>#</li>
          <li>Nomi</li>
          <li>Tavsif</li>
          <li>Sana</li>
          <li>Holat</li>
          <li className="text-center">Amal</li>
        </ul>

        {/* Ma'lumotlar */}
        {datas.map((complaint, index) => (
          <ul
            key={complaint._id}
            className="grid grid-cols-6 gap-4 text-gray-700 text-sm items-center border-b hover:bg-gray-100 p-3 min-w-[900px]"
          >
            <li>{index + 1}</li>
            <li className="font-semibold">{complaint.title}</li>

            {/* Scrollga ega matnli bo‘lim */}
            <li className="overflow-auto max-h-24 break-words whitespace-pre-wrap border-none rounded p-1">
              {complaint.message}
            </li>

            <li>{new Date(complaint.created_at).toLocaleString()}</li>

            <li>
              {complaint.status === "yangi" ? (
                <span className="flex items-center gap-2 bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs w-fit">
                  <FaRegClock /> Ko'rib chiqilmoqda
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs w-fit">
                  <FaCheckCircle /> Yechim topildi
                </span>
              )}
            </li>

            <li className="text-center">
              {complaint.status === "yangi" ? (
                <button
                  onClick={() => openModal(complaint)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center transition-all transform hover:scale-105"
                >
                  <FaCheckCircle /> Hal qilingan
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white py-2 px-4 rounded-full flex items-center gap-2 justify-center cursor-not-allowed"
                >
                  <FaCheckCircle /> Hal bo'lgan
                </button>
              )}
            </li>
          </ul>
        ))}
      </div>
      {/* Modal */ }
  {
    showModal && selectedComplaint && (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 transition-all duration-300">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-[700px] z-10 transform transition-all scale-105">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Tasdiqlash</h2>
          <p className="text-blue-500 mb-6 text-center">
            Siz <strong>{selectedComplaint.title}</strong> arizasini tasdiqlaysizmi?
          </p>

          <div className="flex flex-col items-center space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none"
              placeholder="Javobni kiriting..."
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />

            <div className="flex justify-between w-full">
              <button
                onClick={() => handleDeactivate(selectedComplaint.id)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transform transition-all hover:scale-105"
              >
                Tasdiqlash
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transform transition-all hover:scale-105"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
    </div >
  )
}

export default Complaints
