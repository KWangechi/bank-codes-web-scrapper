const Footer = () => {
  // get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-2 text-gray-300 w-full flex items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <a href="https://github.com/KWangechi" title="KWangechi">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://twitter.com/Keshi72438439" title="KWangechi">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
      </div>

      <div className="flex  gap-1 items-center justify-center ">
        <small>Kenya Bank Search App by Rachel Karanja.</small>
        <p className="text-sm font-bold">- V0.0.1</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs">© {currentYear} | All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
