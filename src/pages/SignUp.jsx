// modules
import { useState } from "react";
import { toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// assets
import sideImg from "../assets/images/office.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [role, setRole] = useState("employee");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default browser's behavior which is to make an HTTP request, sending form data and loading a new page. e, represents the event object, here e represents the submit event

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email.toLowerCase());
    formData.append("password", password);
    formData.append("role", role);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        formData,
        {
          // due to await keyword, the code execution will stop here until the network request to given URL is completed
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      const data = response.data; // parses the response body's text in json format

      if (response.status === 201) {
        toast.success(data.msg);
        window.location.href = "/jobs"; // Navigate and refresh the page
      } else {
        toast.error(data.msg); // Display error messages from the server
      }
    } catch (error) {
      console.error("Error during signup:", error); // Log the error details
      toast.error("Error: Something went wrong");
    }
  };

  return (
    <div className='flex flex-col lg:flex-row items-center'>
      <div className='flex flex-col justify-center lg:w-2/4 w-full pl-20'>
        <h2 className='text-3xl font-bold my-5 lg:w-3/4 w-full'>
          Welcome to <span className='text-blue-500'>TalentTap</span>, create a
          new account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-black my-2 rounded-lg w-full lg:w-3/4 py-2 pl-2'
            aria-label='Name'
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className='border-2 border-black my-2 rounded-lg w-full lg:w-3/4 py-2 pl-2'
            aria-label='Email'
            required
          />
          <div className='relative w-full lg:w-3/4'>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Password' // Purpose: Provides a hint to the user about what to enter in the input field.
              value={password} // Purpose: Binds the input field to the password state variable.
              onChange={(e) => setPassword(e.target.value)} //Updates the state when the value of the input field changes.
              className='relative border-2 border-black my-2 rounded-lg py-2 pl-2 pr-12 w-full'
              aria-label='Password' // Used by screen readers, for accessibility
              required // makes input field mandatory
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              aria-label='Toggle Password Visibility'
              className='absolute inset-y-0 right-0 flex items-center px-3'
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className='relative w-full lg:w-3/4'>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Confirm Password' // Purpose: Provides a hint to the user about what to enter in the input field.
              value={passwordAgain} // Purpose: Binds the input field to the password state variable.
              onChange={(e) => setPasswordAgain(e.target.value)} //Updates the state when the value of the input field changes.
              className='relative border-2 border-black my-2 rounded-lg py-2 pl-2 pr-12 w-full'
              aria-label='Password' // Used by screen readers, for accessibility
              required // makes input field mandatory
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              aria-label='Toggle Password Visibility'
              className='absolute inset-y-0 right-0 flex items-center px-3'
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {}}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='border-2 border-black my-2 rounded-lg py-2 pl-2 w-full lg:w-3/4'
            aria-label='Role'
            required
          >
            <option value='employee'>Employee</option>
            <option value='employer'>Employer</option>
          </select>
          <div className='my-3'>
            <label htmlFor='profileImage'> Profile Image </label>
            <input type='file' id='profileImage' onChange={handleFileChange} />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white mt-2 w-full lg:w-3/4 py-3 rounded-lg font-bold'
          >
            Sign Up
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

export default SignUp;
