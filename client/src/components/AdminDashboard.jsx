import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
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
import { useSelector } from "react-redux";
import Header from "../layout/Header";

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

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.user)
  const { books } = useSelector(state => state.book)
  const { allBorrowedBook } = useSelector(state => state.borrow)
  const { settingPopup } = useSelector(state => state.popup)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totaAdmin, setTotalAdmin] = useState(0)
  const [totalBooks, settotalBooks] = useState(books && books.length || 0)
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0)
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0)
  useEffect(() => {
    let numberOfUsers = users.filter(user => user.role === "User")
    let numberOfAdmins = users.filter(user => user.role === "Admin")
    setTotalUsers(numberOfUsers.length)
    setTotalAdmin(numberOfAdmins.length)

    let numberOfTotalBorrowedBooks = allBorrowedBook.filter((book) => book.returnDate === null)
    let numberOfTotalReturnedBooks = allBorrowedBook.filter((book) => book.returnDate !== null)
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length)
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length)




  }, [users, allBorrowedBook])

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
  return <>
    <main className="relative flex-1 p-6 pt-28">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        {/* left side */}
        <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-[4] flex items-end w-full content-center">
            <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:w-full h-auto lg:mx-0" />
          </div>
          <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
            <img src={logo} alt="logo" className="w-auto xl:flex-1 rounded-lg" />
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3D3E3E] flex-shrink-0"></span>
                <span className="truncate">
                  Total Borrowed Books: <span className="font-semibold">{totalBorrowedBooks}</span>
                </span>
              </p>
              <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#151619] flex-shrink-0"></span>
                <span className="truncate">
                  Total Returned Books: <span className="font-semibold">{totalReturnedBooks}</span>
                </span>
              </p>
            </div>

          </div>

        </div>
        {/* right side */}
        <div className="flex flex-[4] flex-col gap-7 lg:gap-16 lg:px-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
          <div className="flex flex-col-reverse gap-7 flex-[4] lg:flex-row">
            <div className="flex flex-col gap-7 flex-1">
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
              <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                <img src={usersIcon} alt="usericon"className="w-8 h-8"/>
              </span>
              <span className="w-[2px] bg-black lg:h-full">
                
              </span>
              <div className="flex flex-col items-center gap-2 ">
                <h4 className="font-black text-3xl">{totalUsers}</h4>
                <p className="font-light text-gray-700 text-sm">Total User Base</p>
              </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
              <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                <img src={bookIcon} alt="bookicon" className="w-8 h-8" />
              </span>
              <span className="w-[2px] bg-black lg:h-full">
                
              </span>
              <div className="flex flex-col items-center gap-2 ">
                <h4 className="font-black text-3xl">{totalBooks}</h4>
                <p className="font-light text-gray-700 text-sm">Total Book Count</p>
              </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
              <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                <img src={adminIcon} alt="bookicon" className="w-8 h-8"/>
              </span>
              <span className="w-[2px] bg-black lg:h-full">
                
              </span>
              <div className="flex flex-col items-center gap-2 ">
                <h4 className="font-black text-3xl">{totaAdmin}</h4>
                <p className="font-light text-gray-700 text-sm">Total Admin Count</p>
              </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row flex-1">
            <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
           <div className="bg-white p-5 rounded-lg shadow-lg h-full flex flex-col justify-center items-center gap-4 ">
             <img src={user && user.avatar?.url} alt="avatar"  className="rounded-full w-32 h-32 object-cover"/>
             <h2 className="text-xl 2xl:text-2xl font-semibold text-center">{user && user.name}</h2>
             <p className="text-gra-600 text-sm 2xl:text-base text-center">
              Welcome To your Admin Dashboard. Here you can Manage the setting and monitor statistics
             </p>
           </div>
            </div>
          </div>
          </div>
          <div className="hidden xl:flex bg-white p-7 text-lg sm:text-xl  xl:text-2xl 2xl:text-4xl font-semibold relative flex-[3] justify-center items-center rounded-2xl ">
            <h4 className="overflow-y-hidden ">"Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinedment of character"</h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]"></p>
          </div>
          
        </div>
      </div>
    </main>

  </>;
};

export default AdminDashboard;
