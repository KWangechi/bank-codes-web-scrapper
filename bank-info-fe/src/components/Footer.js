function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-4 text-gray-300 flex justify-center">
      &copy; {currentYear} Kenya Bank Search App by Rachel Karanja. All rights
      reserved.
      {/* <a href="https://github.com/KWangechi">
        
      </a>
      <a href="https://twitter.com/Keshi72438439">
        
      </a> */}
    </footer>
  );
}

export default Footer;
