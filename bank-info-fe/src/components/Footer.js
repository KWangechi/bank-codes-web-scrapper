function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-4 text-gray-300">
      <div className="flex justify-between items-center">
        <div>
          &copy; {currentYear} Kenya Bank Info Finder by Rachel Karanja. All
          rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/KWangechi">
            <img
              src="https://1000logos.net/wp-content/uploads/2018/11/GitHub-icon4.png"
              alt="GitHub Logo"
              width="20"
              height="20"
            />
          </a>
          <a href="https://twitter.com/Keshi72438439">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
