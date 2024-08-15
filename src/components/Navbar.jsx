// External Libraries
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    // Fetch user data or check authentication status
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.status === 401) {
          setUser(null);
          return;
        }

        if (!response.ok) {
          console.error(`Error fetching user: HTTP status ${response.status}`);
          return;
        }

        const data = await response.json();
        setUser(data.user); // Assuming data.user contains user details including avatar
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const linkClass = ({ isActive }) =>
    isActive ? "bg-black rounded-lg mixin/links" : "mixin/links";

  const handleSignOut = async () => {
    try {
      // Call the server to handle sign out
      const response = await fetch("http://localhost:8000/user/signout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        console.error(`Error signing out: HTTP status ${response.status}`);
        return;
      }

      // Clear the user state and remove the cookie manually
      setUser(null);
      setShowSignOut(false);

      // Redirect to the jobs page
      window.location.href = "/jobs";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleSignOut = () => {
    setShowSignOut((prevState) => !prevState);
  };

  return (
    <nav className='bg-blue-500 flex justify-between h-20'>
      <div className='text-white font-extrabold text-3xl flex items-center px-10'>
        <NavLink to='/'>TalentTap</NavLink>
      </div>
      <div className='flex items-center text-white font-bold text-xl px-10 mixin/links:m-3 mixin/links:p-2'>
        <NavLink to='/' className={linkClass}>
          Home
        </NavLink>
        <NavLink to='/jobs' className={linkClass}>
          Jobs
        </NavLink>
        {user ? (
          <div className='relative'>
            <img
              src={user.profileImage} // User's avatar URL
              alt='User Avatar'
              className='mx-5 w-10 h-10 rounded-full cursor-pointer'
              onClick={toggleSignOut} // Toggle sign-out button visibility
            />
            {showSignOut && (
              <div className='absolute -left-5 mt-3 w-32 bg-white rounded-lg shadow-lg'>
                <button
                  onClick={handleSignOut}
                  className='w-full px-3 py-2 text-blue-500 bg-white hover:bg-white rounded-lg transition-colors duration-200 ease-in-out cursor-pointer'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to='/login' className={linkClass}>
              Sign In
            </NavLink>
            <NavLink to='/signup' className={linkClass}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
