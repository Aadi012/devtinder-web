const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">devTinder</span>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Docs</a>
        <a className="link link-hover">Support</a>
      </div>
      <div>
        <span className="footer-title">Community</span>
        <a className="link link-hover">GitHub</a>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Twitter</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms of Use</a>
      </div>
      <div className="mt-6 text-center w-full">
        <p className="text-gray-400">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
