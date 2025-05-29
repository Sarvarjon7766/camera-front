import React, { useContext, useEffect } from 'react'
import { AiOutlineHistory } from "react-icons/ai"
import { GrDocumentText } from "react-icons/gr"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { LangContext } from '../context/LangContext'

const StatisticsCard = () => {

  const { lang, setLang } = useContext(LangContext)


  const data = [
    {
      icons: GrDocumentText,
      title: {
        uz: "Barcha murojaatlar",
        ru: "Все обращения",
        en: "All appeals"
      },
      amount: 1234
    },
    {
      icons: AiOutlineHistory,
      title: {
        uz: "Jarayonda",
        ru: "В процессе",
        en: "In progress"
      },
      amount: 3
    },
    {
      icons: IoMdCheckmarkCircleOutline,
      title: {
        uz: "Ko'rib chiqilgan",
        ru: "Рассмотрено",
        en: "Reviewed"
      },
      amount: 568
    },
    {
      icons: MdCancel,
      title: {
        uz: "Bekor qilingan",
        ru: "Отменено",
        en: "Cancelled"
      },
      amount: 12
    }
  ]


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <div className="bg-blue-500 text-white rounded-full p-4">
            <item.icons size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{item.title[lang]}</h3>
            <p className="text-2xl font-bold text-blue-600">{item.amount}+</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatisticsCard
