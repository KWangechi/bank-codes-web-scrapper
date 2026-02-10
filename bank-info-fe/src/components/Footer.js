function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-4 text-gray-300">
      <div className="flex justify-center items-center">
        <div>
          &copy; {currentYear} Kenya Bank Info Finder by Rachel Karanja. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
