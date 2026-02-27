import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router";


export default function LoginPage() {

 
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   
    try {
  const res = await axios.post('https://task-api-eight-flax.vercel.app/api/login', data);
         
  const token=res.data.token
    localStorage.setItem("dashboard",token)
    
    navigate('/dashboard')
    if(res.data.email){
      console.log("Login successful!");
    } 
} catch(error) {
  if(error.response?.status === 401){
    console.log("Email or password is wrong!");
  } else {
    console.log("Network/server error!");
  }
}
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-4">
          Sign in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors
                ${errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 focus:border-[#2d6a4f]"
                }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-gray-700 text-sm font-medium">Password</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors
                  ${errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 focus:border-[#2d6a4f]"
                  }`}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2d6a4f] hover:bg-[#40916c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            
          >
           Sign in
          </button>
        </form>
      </div>
    </div>
  );
}