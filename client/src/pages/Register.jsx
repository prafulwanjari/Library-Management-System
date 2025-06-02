import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth)
  const navigateTo = useNavigate()

  const handleregister = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    // dispatch(register(data))
     dispatch(register({name,email,password}))
  }
  useEffect(() => {
    if (message) {
      toast.success(message)
      navigateTo(`/otp-verification/${email}`)
    }
     if (error) {
    toast.error(error);
    dispatch(resetAuthSlice());
  }
  }, [isAuthenticated, error, loading, dispatch,message])

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return <>
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* left side */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center mb-12 h-[376px]">
          <div className="flex justify-center mb-12">
            <img className="mb-12 h-44 w-auto" src={logo_with_title} alt="logo" />
          </div>
          <p className="text-gray-300 mb-12">Already have Account? Sign IN now. </p>
          <Link to="/login" className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">Sign IN</Link>
        </div>
      </div>
      {/* right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
              <h3 className="font-medium text-4xl overflow-hidden">Sign UP</h3>
              <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
            </div>


          </div>
          <p className="text-gray-800 text-center mb-12">Please provide your information to sign up</p>

          <form onSubmit={handleregister}>
             <div className="mb-4">
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Full Name"
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" required/>
             </div>
             <div className="mb-4">
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" required/>
             </div>
             <div className="mb-4">
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password"
              className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" required/>
             </div>
             <div className="block md:hidden font-semibold mt-5 text-center">
              <p>Already Have Account ?<Link to="/login" className="text-sm text-gray-500 hover:underline"> Sign IN</Link></p>
              
             </div>
             <button type="submit" className="border-2 mt-5 w-full font-semibold text-white py-2  border-black rounded-lg hover:bg-white hover:text-black transition bg-black">Sign UP</button>
          </form>
        </div>
      </div>
    </div>
  </>;
};

export default Register;
