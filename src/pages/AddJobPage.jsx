// modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

// assets
import "react-datepicker/dist/react-datepicker.css";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [postedBy, setPostedBy] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleAddField = (setFunction) => {
    setFunction((prev) => [...prev, ""]);
  };

  const handleRemoveField = (index, setFunction) => {
    setFunction((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, value, setFunction) => {
    setFunction((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 401) {
        setUser(null);
        return null;
      }

      if (!response.ok) {
        console.error(`Error fetching user: HTTP status ${response.status}`);
        return null;
      }

      const data = await response.json();
      setUser(data.user); // Assuming data.user contains user details including avatar
      return data.user._id;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const userId = await fetchUser();

    if (!userId) {
      console.error("User ID is not set");
      toast.error("Error: Unable to fetch User Details");
      return;
    }

    const newJob = {
      title,
      type,
      location,
      description,
      salary,
      responsibilities,
      requirements,
      benefits,
      applicationDeadline,
      postedDate,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
        website,
      },
      postedBy: userId,
    };
    try {
      const res = await fetch(`http://localhost:8000/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
        credentials: "include", // Include cookies in request
      });

      const data = await res.json();

      if (res.status === 201) {
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
    <>
      <section className='bg-indigo-50'>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitForm}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Add Job
              </h2>

              <div className='mb-4'>
                <label
                  htmlFor='type'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Job Type
                </label>
                <select
                  id='type'
                  name='type'
                  className='border rounded w-full py-2 px-3'
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value='Full-Time'>Full-Time</option>
                  <option value='Part-Time'>Part-Time</option>
                  <option value='Remote'>Remote</option>
                  <option value='Internship'>Internship</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Job Listing Name
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='eg. Beautiful Apartment In Miami'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  className='border rounded w-full py-2 px-3'
                  rows='4'
                  placeholder='Add any job duties, expectations, requirements, etc'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='type'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Salary
                </label>
                <select
                  id='salary'
                  name='salary'
                  className='border rounded w-full py-2 px-3'
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                >
                  <option value='Under $50K'>Under $50K</option>
                  <option value='$50K - 60K'>$50K - $60K</option>
                  <option value='$60K - 70K'>$60K - $70K</option>
                  <option value='$70K - 80K'>$70K - $80K</option>
                  <option value='$80K - 90K'>$80K - $90K</option>
                  <option value='$90K - 100K'>$90K - $100K</option>
                  <option value='$100K - 125K'>$100K - $125K</option>
                  <option value='$125K - 150K'>$125K - $150K</option>
                  <option value='$150K - 175K'>$150K - $175K</option>
                  <option value='$175K - 200K'>$175K - $200K</option>
                  <option value='Over $200K'>Over $200K</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Location
                </label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='Company Location'
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className='my-6'>
                <label
                  htmlFor='responsibilities'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Responsibilities
                </label>
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className='flex items-center mb-2'>
                    <input
                      type='text'
                      className='border rounded w-full py-2 px-3 mr-2'
                      value={responsibility}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          e.target.value,
                          setResponsibilities
                        )
                      }
                    />
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveField(index, setResponsibilities)
                      }
                      className='text-red-500 font-bold text-xl cursor-pointer'
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => handleAddField(setResponsibilities)}
                  className='bg-blue-500 text-white py-1 px-2 my-2 rounded'
                >
                  + Add Responsibility
                </button>
              </div>

              <div className='my-6'>
                <label
                  htmlFor='requirements'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Requirements
                </label>
                {requirements.map((requirement, index) => (
                  <div key={index} className='flex items-center mb-2'>
                    <input
                      type='text'
                      className='border rounded w-full py-2 px-3 mr-2'
                      value={requirement}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          e.target.value,
                          setRequirements
                        )
                      }
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveField(index, setRequirements)}
                      className='text-red-500 font-bold text-xl cursor-pointer'
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => handleAddField(setRequirements)}
                  className='bg-blue-500 text-white py-1 px-2 my-2 rounded'
                >
                  + Add Requirement
                </button>
              </div>

              <div className='my-6'>
                <label
                  htmlFor='benefits'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Benefits
                </label>
                {benefits.map((benefit, index) => (
                  <div key={index} className='flex items-center mb-2'>
                    <input
                      type='text'
                      className='border rounded w-full py-2 px-3 mr-2'
                      value={benefit}
                      onChange={(e) =>
                        handleFieldChange(index, e.target.value, setBenefits)
                      }
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveField(index, setBenefits)}
                      className='text-red-500 font-bold text-xl cursor-pointer'
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => handleAddField(setBenefits)}
                  className='bg-blue-500 text-white py-1 px-2 my-2 rounded'
                >
                  + Add Benefit
                </button>
              </div>

              {/* Date Picker for Posted Date */}
              <div className='mb-4'>
                <label
                  htmlFor='postedDate'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Posted Date
                </label>
                <DatePicker
                  selected={postedDate}
                  onChange={(date) => setPostedDate(date)}
                  dateFormat='yyyy/MM/dd'
                  className='border rounded w-full py-2 px-3'
                />
              </div>

              {/* Date Picker for Application Deadline */}
              <div className='mb-4'>
                <label
                  htmlFor='applicationDeadline'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Application Deadline
                </label>
                <DatePicker
                  selected={applicationDeadline}
                  onChange={(date) => setApplicationDeadline(date)}
                  dateFormat='yyyy/MM/dd'
                  className='border rounded w-full py-2 px-3'
                />
              </div>

              <h3 className='text-2xl mb-5'>Company Info</h3>

              <div className='mb-4'>
                <label
                  htmlFor='company'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Company Name
                </label>
                <input
                  type='text'
                  id='company'
                  name='company'
                  className='border rounded w-full py-2 px-3'
                  placeholder='Company Name'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='company_description'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Company Description
                </label>
                <textarea
                  id='company_description'
                  name='company_description'
                  className='border rounded w-full py-2 px-3'
                  rows='4'
                  placeholder='What does your company do?'
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                ></textarea>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='contact_email'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Contact Email
                </label>
                <input
                  type='email'
                  id='contact_email'
                  name='contact_email'
                  className='border rounded w-full py-2 px-3'
                  placeholder='Email address for applicants'
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='contact_phone'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Contact Phone
                </label>
                <input
                  type='tel'
                  id='contact_phone'
                  name='contact_phone'
                  className='border rounded w-full py-2 px-3'
                  placeholder='Optional phone for applicants'
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='website'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Website
                </label>
                <input
                  type='text'
                  id='website'
                  name='website'
                  className='border rounded w-full py-2 px-3'
                  placeholder='website for applicants'
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div>
                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
