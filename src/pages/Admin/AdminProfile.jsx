import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminProfile = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [changePassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [updateStatus, setUpdateStatus] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('https://admininteractive.ssuv.uz/api/v1/leader/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.data.status === 'success') {
          setProfile(res.data.data)
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        } else {
          setError("❌ Profil ma'lumotlarini yuklashda xatolik yuz berdi.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, navigate])

  const handlePasswordUpdate = async () => {
    if (!newPassword) {
      setUpdateStatus("❗Parol maydoni bo‘sh bo‘lmasligi kerak.")
      return
    }

    try {
      const res = await axios.put(
        'https://admininteractive.ssuv.uz/api/v1/leader/me',
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
			console.log(res.data)
      if (res.data.status === 'success') {
        setUpdateStatus('✅ Parol muvaffaqiyatli yangilandi.')
        setNewPassword('')
        setChangePassword(false)
      }
    } catch (err) {
      setUpdateStatus("❌ Parolni yangilashda xatolik yuz berdi.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4">
      <div className="backdrop-blur-lg bg-white/60 shadow-2xl rounded-3xl p-8 max-w-2xl w-full space-y-6 border border-white/30">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800">Shaxsiy Ma'lumotlar</h1>

        {loading ? (
          <div className="text-center text-gray-700 text-lg animate-pulse">⏳ Yuklanmoqda...</div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : profile ? (
          <>
            <div className="grid grid-cols-1 gap-3 text-gray-800">
              <div><strong>Ismi:</strong> {profile.fullname_en}</div>
              <div><strong>Telefon:</strong> {profile.phone}</div>
              <div><strong>Lavozimi:</strong> {profile.position_en}</div>
              <div><strong>Login:</strong> {profile.login}</div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setChangePassword(!changePassword)
                  setUpdateStatus(null)
                }}
                className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition font-semibold shadow"
              >
                {changePassword ? "❌ Bekor qilish" : "🔒 Parolni o‘zgartirish"}
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  changePassword ? 'max-h-60 mt-4' : 'max-h-0'
                }`}
              >
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="🔐 Yangi parolni kiriting"
                  className="w-full mt-3 px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
                />
                <button
                  onClick={handlePasswordUpdate}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
                >
                  🔄 Yangilash
                </button>
              </div>

              {updateStatus && (
                <div
                  className={`mt-4 p-3 text-sm text-center font-medium rounded-xl ${
                    updateStatus.includes('✅')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {updateStatus}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default AdminProfile
