function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-6">
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
