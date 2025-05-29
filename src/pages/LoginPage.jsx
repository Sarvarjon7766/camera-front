import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaLock, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLang } from '../context/LangContext'

import loginn from '../assets/loginn.png'
import logo from '../assets/logo.jpg'
import Footer from '../components/Footer'

const LoginPage = () => {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const role = ['leader', 'accountant', 'resources', 'officecenter', 'studentapplication', 'default']

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post(`https://admininteractive.ssuv.uz/api/v1/auth/login-google`, {
        id_token: response.credential,
      })

      if (res.data.success && res.data.token) {
        localStorage.setItem('code', res.data.token)

        const role = res.data.role || 'default' // Faqat navigatsiya uchun
        navigate(`/${role}`)
      } else {
        console.error('Login muvaffaqiyatsiz yoki token yo‘q:', res.data)
      }
    } catch (error) {
      console.error("Google login xatoligi:", error)
    }
  }

  const hamisHandler = async () => {
    try {
      const res = await axios.post('https://admininteractive.ssuv.uz/api/v1/hemis-id/auth-url')

      if (res.data && res.data.token) {
        localStorage.setItem('code', res.data.token)

        const role = res.data.role || 'default' // Faqat navigatsiya uchun
        navigate(`/${role}`)
      } else {
        console.error("Token yoki rol topilmadi:", res.data)
      }
    } catch (err) {
      console.error('Server xatoligi:', err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if (login && password) {
        const res = await axios.post(
          `https://admininteractive.ssuv.uz/api/v1/login/login`,
          { login: login, password: password }
        )

        if (res.data.status === 'success' && res.data.token) {
          localStorage.setItem('code', res.data.token)

          const role = res.data.role || 'accountant' // Faqat navigatsiya
          navigate(`/${role}`)
        } else {
          alert(res.data.message || "Login muvaffaqiyatsiz bo‘ldi.")
        }
      } else {
        alert('Iltimos barcha maydonlarni to‘ldiring!')
      }
    } catch (error) {
      console.error("Login xatoligi:", error)
      alert("Server bilan bog‘lanishda xatolik.")
    }
  }


  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div
          className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Rasm */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.img
              src={loginn}
              alt="Ijara uylari rasmi"
              className="rounded-2xl w-full max-w-sm md:max-w-md shadow-xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Login form */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl px-8 py-10 md:px-12 md:py-12 space-y-7 w-full max-w-md mx-auto">
              <div className="flex justify-center">
                <img src={logo} alt="Logo" className="w-20 h-20 rounded-full shadow-md object-cover" />
              </div>
              <h2 className="text-3xl font-bold text-center text-blue-600">
                {lang === 'uz' ? 'Tizimga Kirish' : lang === 'ru' ? "Авторизоваться" : "Login"}
              </h2>
              <p className="text-sm text-center text-gray-500 leading-relaxed">
                {lang === 'uz'
                  ? 'Samarqand davlat veterinariya meditsinasi chorvachilik va biotexnologiyalari universiteti - Interaktiv xizmat tizimi'
                  : lang === 'ru'
                    ? "Самаркандский государственный университет ветеринарной медицины, животноводства и биотехнологии - Интерактивная система обслуживания"
                    : "Samarkand State University of Veterinary Medicine, Animal Husbandry and Biotechnology - Interactive service system"}
              </p>

              {/* Google & Facebook login buttons */}
              {!isAdminLogin && (
                <div className="space-y-4 max-w-md mx-auto  bg-white animate-fade-in">
                  <h2 className="text-2xl font-bold text-center text-gray-800">Tizimga kirish</h2>

                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => console.log("Google orqali kirish muvaffaqiyatsiz bo‘ldi")}
                      theme="filled_blue"
                      size="large"
                      width="250px"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={hamisHandler}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition duration-300 hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Hemis orqali kirish
                    </button>
                  </div>
                </div>
              )}

              {/* Admin login form */}
              {isAdminLogin && (
                <form onSubmit={handleLogin} className="space-y-6 pt-2">
                  <div className="relative">
                    <FaUserAlt className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder={lang === 'uz' ? "Login" : lang === 'ru' ? "Логин" : 'Login'}
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="relative">
                    <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder={lang === 'uz' ? "Parol" : lang === 'ru' ? "Пароль" : 'Password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    {lang === 'uz' ? "Kirish" : lang === 'ru' ? "Авторизоваться" : 'Login'}
                  </button>
                </form>
              )}

              {/* Checkbox toggle */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <input
                  type="checkbox"
                  checked={isAdminLogin}
                  onChange={() => setIsAdminLogin(!isAdminLogin)}
                  id="adminToggle"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="adminToggle"
                  className="text-sm text-gray-700 select-none cursor-pointer"
                >
                  {lang === 'uz' ? "Rahbar sifatida kirish" : lang === 'ru' ? "Войти как менеджер" : 'Login as a manager'}
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
