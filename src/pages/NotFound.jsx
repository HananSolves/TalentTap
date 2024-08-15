const NotFound = () => {
  return (
    <>
      <div className='p-20 flex flex-col items-center'>
        <div className='text-9xl text-center'>
          4<span className='text-blue-500'>0</span>4
        </div>
        <p className='text-center text-3xl my-5'>
          THE PAGE YOU REQUESTED COULD NOT BE FOUND
        </p>
        <button className='text-white p-5 my-5 rounded-full text-xl bg-black'>
          <a href='/'> GO TO HOMEPAGE</a>
        </button>
      </div>
    </>
  );
};

export default NotFound;
