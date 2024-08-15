import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className='flex flex-col bg-blue-500'>
        <div className='flex border-b-2'>
          <div className='text-white w-2/4 p-5'>
            <h3 className='font-extrabold text-3xl text-center py-5'>
              TalentTap
            </h3>
            <p className='text-lg text-justify'>
              TalentTap is a premier job site dedicated to bridging the gap
              between talented job seekers and employers in search of the right
              candidates. Our platform offers a comprehensive database of job
              listings across various industries and locations. We strive to
              provide a user-friendly experience, empowering individuals to find
              opportunities that match their skills and aspirations.
            </p>
          </div>
          <div className='text-white w-2/4 p-5'>
            <h3 className='font-extrabold text-3xl mt-10 text-center'>
              Follow Us
            </h3>
            <div className='flex text-3xl mt-10 hover:mixin/icons:text-black mixin/icons:mx-8  items-center justify-center'>
              <a href='https://www.facebook.com'>
                <FaFacebook className='mixin/icons' />
              </a>
              <a href='https://www.twitter.com'>
                <FaXTwitter className='mixin/icons' />
              </a>
              <a href='https://www.linkedin.com'>
                <FaLinkedin className='mixin/icons' />
              </a>
              <a href='https://www.youtube.com'>
                <FaYoutube className='mixin/icons' />
              </a>
              <a href='https://www.instagram.com'>
                <FaInstagram className='mixin/icons' />
              </a>
            </div>
          </div>
        </div>
        <div className='text-white text-center py-5 text-xl font-bold'>
          Designed and Developed by{" "}
          <a
            href='https://github.com/HananSolves'
            className='underline hover:text-black'
          >
            HananSolves
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
