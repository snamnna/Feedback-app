const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-400 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            FeedbackApp
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-900 mr-4 visited:text-white"
            >
              Login
            </a>
            <a
              href="/Register"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-900 mr-4 visited:text-white"
            >
              Register
            </a>
            <a
              href="/Home"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-900 mr-4 visited:text-white"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
