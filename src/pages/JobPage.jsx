// modules
import {
  useParams,
  useLoaderData,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";

// assets
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const JobPage = ({ deleteJob }) => {
  const location = useLocation();
  const { title } = useParams();
  const job = location.state?.job;

  const postedDate = job.postedDate;
  const toFormatPostedDate = new Date(postedDate);
  const deadlineDate = job.applicationDeadline;
  const toFormatDeadlineDate = new Date(deadlineDate);
  const formattedPostedDate = toFormatPostedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDeadine = toFormatDeadlineDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();
  if (!job) {
    navigate("/jobs"); // Redirect to jobs page if job data is not found
    return null;
  }

  const onDeleteClick = async (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete the job");
      }

      toast.success("Job deleted successfully");
      navigate("/jobs");
    } catch (error) {
      console.error("Error deleting the job:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <section>
        <div className='container px-16 py-6'>
          <Link
            to='/jobs'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='fas fa-arrow-left mr-2' /> Back to Job
            Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-6 w-full gap-6'>
            <main className='col-span-4'>
              <div className='bg-white  p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaLocationDot className='text-lg text-orange-700 mr-2' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Job Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Salary
                </h3>

                <p className='mb-4'>{job.salary} / Year</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-3'>
                  Responsibilities
                </h3>
                <ul className='mb-4 list-inside list-disc'>
                  {job.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                <h3 className='text-indigo-800 text-lg font-bold mb-3'>
                  Requirements
                </h3>
                <ul className='mb-4 list-inside list-disc'>
                  {job.requirements.map((requirement) => {
                    return <li key={requirement}>{requirement}</li>;
                  })}
                </ul>
                <h3 className='text-indigo-800 text-lg font-bold mb-3'>
                  Benefits
                </h3>
                <ul className='mb-4 list-inside list-disc'>
                  {job.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-3'>
                  Job Posted On
                </h3>
                <p className='mb-4'>{formattedPostedDate}</p>
                <h3 className='text-indigo-800 text-lg font-bold mb-3'>
                  Job Deadline
                </h3>
                <p className='mb-4'>{formattedDeadine}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside className='col-span-2'>
              {/* <!-- Company Info --> */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>
                <h2 className='text-3xl font-bold mb-5'>{job.company.name}</h2>
                <p className='my-2'>{job.company.description}</p>
                <hr className='my-4' />
                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>

                <h3 className='text-xl'>Website:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.website}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>
                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/jobs/${slugify(job.title, { lower: true })}/edit-job`}
                  state={{ job }}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job._id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
