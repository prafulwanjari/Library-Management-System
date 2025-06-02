import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux'
import Header from '../layout/Header'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector(state => state.popup)
  const { userBorrowedBooks } = useSelector(state => state.borrow)
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0)
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0)

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter((book) => book.returned === false)
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter((book) => book.returned === true)
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length)
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length)
  }, [userBorrowedBooks])

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: window.innerWidth < 640 ? 12 : 14
          }
        }
      },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Books Borrowed vs Returned",
        font: {
          size: window.innerWidth < 640 ? 14 : 16
        }
      }
    },
    cutout: 0,
  }

  return (
    <main className="relative flex-1 p-3 sm:p-4 md:p-6 pt-20 sm:pt-24 md:pt-28">
      <Header />
      

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 md:gap-8">
        
     
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 xl:flex-[4] xl:min-h-[85.5vh] xl:justify-between">
          
        
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 xl:flex-[4]">
            
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              
          
              <div className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 min-h-[100px] sm:min-h-[120px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="w-[2px] bg-black h-16 sm:h-20 flex-shrink-0"></span>
                <span className="bg-gray-300 h-16 sm:h-20 w-16 sm:w-20 flex justify-center items-center rounded-lg flex-shrink-0">
                  <img src={bookIcon} alt="bookIcon" className="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
                <p className="text-sm sm:text-lg md:text-xl font-semibold leading-tight">
                  Your Borrowed Book Lists
                </p>
              </div>

           
              <div className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 min-h-[100px] sm:min-h-[120px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="w-[2px] bg-black h-16 sm:h-20 flex-shrink-0"></span>
                <span className="bg-gray-300 h-16 sm:h-20 w-16 sm:w-20 flex justify-center items-center rounded-lg flex-shrink-0">
                  <img src={returnIcon} alt="returnIcon" className="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
                <p className="text-sm sm:text-lg md:text-xl font-semibold leading-tight">
                  Your Returned Book Lists
                </p>
              </div>
            </div>

           
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              
              
              <div className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 md:p-6 min-h-[100px] sm:min-h-[120px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="w-[2px] bg-black h-16 sm:h-20 flex-shrink-0"></span>
                <span className="bg-gray-300 h-16 sm:h-20 w-16 sm:w-20 flex justify-center items-center rounded-lg flex-shrink-0">
                  <img src={browseIcon} alt="browseIcon" className="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
                <p className="text-sm sm:text-lg md:text-xl font-semibold leading-tight">
                  Let's Browse Books Inventory
                </p>
              </div>

              {/* Logo - Hidden on mobile, visible on larger screens */}
              {/* <div className="hidden lg:flex justify-center lg:justify-end">
                <img 
                  src={logo_with_title} 
                  alt="logo" 
                  className="w-auto h-20 md:h-24 lg:h-28 xl:h-32 object-contain" 
                />
              </div> */}
            </div>
          </div>

         
          <div className="bg-white p-4 sm:p-6 md:p-8 min-h-[120px] sm:min-h-[160px] md:min-h-[200px] font-semibold relative flex justify-center items-center rounded-xl shadow-sm xl:flex-[3]">
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center text-gray-800 px-4">
             "Libraries store the energy that fuels the imagination!"
            </h4>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base absolute right-4 sm:right-8 md:right-12 bottom-2 sm:bottom-3 md:bottom-4">
              ~ Bookeeda Team
            </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 xl:flex-[2] xl:justify-between xl:py-5">
          
        
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm xl:flex-[4]">
            <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-full">
              <Pie data={data} options={chartOptions} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-col gap-4 sm:gap-6">
            <div className="flex items-center p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 bg-white rounded-lg shadow-sm flex-1 xl:min-h-[150px]">
              <img src={logo} alt="logo" className="w-auto h-8 sm:h-10 md:h-12 lg:h-16 flex-shrink-0" />
              <span className="w-[2px] bg-black h-12 sm:h-16 md:h-20 flex-shrink-0"></span>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 min-w-0">
                <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3D3E3E] flex-shrink-0"></span>
                  <span className="truncate">
                    Borrowed: <span className="font-semibold">{totalBorrowedBooks}</span>
                  </span>
                </p>
                <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#151619] flex-shrink-0"></span>
                  <span className="truncate">
                    Returned: <span className="font-semibold">{totalReturnedBooks}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
