import { Link } from "react-router-dom";

const Hero = ({
  title = "TalentTap",
  subtitle = "Your Gateway to a World of Careers",
}) => {
  return (
    <section className='bg-blue-500 mt-0.5 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-6xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='my-4 text-3xl font-bold text-white'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
