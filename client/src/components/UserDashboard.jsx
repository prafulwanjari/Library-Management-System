import React, { useEffect, useState } from "react";
import logoWithTitle from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
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
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned).length;
    const returned = userBorrowedBooks.filter((book) => book.returned).length;
    setTotalBorrowedBooks(borrowed);
    setTotalReturnedBooks(returned);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Borrowed", "Returned"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

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
            size: window.innerWidth < 640 ? 12 : 14,
          },
        },
      },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "Books Borrowed vs Returned",
        font: {
          size: window.innerWidth < 640 ? 14 : 16,
        },
      },
    },
    cutout: "60%",
  };

  return (
    <main className="relative flex-1 p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 md:pt-28 bg-gray-50">
      <Header />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-6 xl:flex-[4]">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: bookIcon, title: "Your Borrowed Book Lists" },
              { icon: returnIcon, title: "Your Returned Book Lists" },
            ].map(({ icon, title }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <span className="w-[2px] bg-black h-16 flex-shrink-0" />
                <div className="bg-gray-300 h-16 w-16 flex justify-center items-center rounded-lg">
                  <img src={icon} alt="icon" className="w-8 h-8" />
                </div>
                <p className="text-lg font-semibold leading-tight">{title}</p>
              </div>
            ))}
          </div>

          {/* Browse Card + Optional Logo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <span className="w-[2px] bg-black h-16 flex-shrink-0" />
              <div className="bg-gray-300 h-16 w-16 flex justify-center items-center rounded-lg">
                <img src={browseIcon} alt="browseIcon" className="w-8 h-8" />
              </div>
              <p className="text-lg font-semibold leading-tight">
                Let&apos;s Browse Book Inventory
              </p>
            </div>

            {/* Optional Logo - for larger screens */}
            {/* <div className="hidden lg:flex justify-end">
              <img src={logoWithTitle} alt="logo" className="h-28 object-contain" />
            </div> */}
          </div>

          {/* Quote Box */}
          <div className="bg-white p-6 rounded-xl shadow text-center relative">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
              "Libraries store the energy that fuels the imagination!"
            </h4>
            <p className="text-sm text-gray-600 mt-2 absolute bottom-4 right-6">
              ~ Bookeeda Team
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 xl:flex-[2] xl:py-5">
          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow h-[350px] lg:h-[400px]">
            <Pie data={data} options={chartOptions} />
          </div>

          {/* Summary Cards */}
          <div className="flex flex-col sm:flex-row xl:flex-col gap-6">
            <div className="flex items-center gap-6 p-6 bg-white rounded-lg shadow flex-1">
              <img src={logo} alt="logo" className="h-12 sm:h-14 flex-shrink-0" />
              <div className="w-[2px] bg-black h-20" />
              <div className="flex flex-col gap-3">
                <p className="text-sm sm:text-base flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3D3E3E] inline-block" />
                  Borrowed: <strong>{totalBorrowedBooks}</strong>
                </p>
                <p className="text-sm sm:text-base flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#151619] inline-block" />
                  Returned: <strong>{totalReturnedBooks}</strong>
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
