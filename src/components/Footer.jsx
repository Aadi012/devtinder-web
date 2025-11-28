const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-primary">Homio</h2>
          <p className="text-gray-600 mt-2">
            Where meaningful connections begin.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-primary mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/about" className="hover:text-primary">About</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-primary mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions" className="hover:text-primary">Terms & Conditions</a></li>
          </ul>
        </div>

      </div>

      <div className="bg-base-300 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Homio — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
