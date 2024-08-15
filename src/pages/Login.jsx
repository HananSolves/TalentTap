// modules
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// assets
import sideImg from "../assets/images/office.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are included
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        window.location.href = "/jobs"; // Navigate and refresh the page
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error: Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='flex flex-col lg:flex-row items-center'>
      <div className='flex flex-col justify-center lg:w-2/4 w-full pl-20'>
        <h2 className='text-3xl font-bold my-5 lg:w-3/4 w-full'>
          Welcome to <span className='text-blue-500'>TalentTap</span>, sign into
          your account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            name='email'
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className='border-2 border-black my-2 rounded-lg w-full lg:w-3/4 py-2 pl-2'
            aria-label='Email'
            required
          />
          <div className='relative w-full lg:w-3/4'>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Password'
              value={password}
              name='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 border-black my-2 rounded-lg py-2 pl-2 w-full'
              aria-label='Password'
              required
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center px-3'
              aria-label='Toggle Password Visibility'
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white mt-2 w-full lg:w-3/4 py-3 rounded-lg font-bold'
          >
            Log In
          </button>
        </form>
      </div>
      <img
        src={sideImg}
        alt='Office Environment'
        className='lg:w-2/4 w-full object-cover'
      />
    </div>
  );
};

export default Login;
