import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPasssword] = useState('')
  const { token } = useParams()
  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth)

  const handleResetPassword = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("password", password)
   data.append("confirmPassword",confirmPassword)
    dispatch(resetPassword(data,token))
  }

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(resetAuthSlice())
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [isAuthenticated, error, loading, dispatch, message])

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return <>
    <div className="flex flex-col justify-center  md:flex-row h-screen">
      {/* left section */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex items-center justify-center rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center  h-[450px]">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />

          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">"Your premier digital library for borrowing and reading books?"</h3>
        </div>
      </div>
      {/* right section */}
       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link to="/password/forgot" className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">
          Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-b-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5  overflow-hidden">
              Reset Password</h1>
            <p className="text-gray-800 text-center mb-12 ">
              Please enter your new Password
            </p>

            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"  required/>
              </div>
               <div className="mb-4">
                 <input type="password" value={confirmPassword} onChange={(e) => setConfirmPasssword(e.target.value)} placeholder="Confirm Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"  required/>
              </div>
              <button type="submit" className="border-2 mt-5 w-full font-semibold text-white py-2  border-black rounded-lg hover:bg-white hover:text-black transition bg-black uppercase" disabled={loading?true:false}>Reset Password</button>
            </form>
          </div>

      </div>

    </div>
  </>;
};

export default ResetPassword;
