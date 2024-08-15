import JobListing from "./JobListing";
import { useState, useEffect } from "react"; // These are React hooks used for managing state and side effects
import Spinner from "./Spinners";

const JobListings = () => {
  const [jobs, setJobs] = useState([]); // jobs: An array to store the fetched job listings. Initialized as an empty array.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/jobs", {
          method: "GET",
          credentials: "include",
        }); // Use fetch to make an HTTP GET request to the API.
        const data = await res.json(); // Parse the response as JSON, json() returns a promise, await is used to wait for the promise to resolve. res.json() is used to convert the response body of the HTTP request into a JavaScript object.

        // Ensure the data is an array before setting the state
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      } finally {
        // Regardless of success or failure, set a timer to update the loading state to false
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className='px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 text-center pb-8'>
          Browser Jobs
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => <JobListing key={job._id} job={job} />)
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
