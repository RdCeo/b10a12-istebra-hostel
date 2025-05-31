import { FaFacebook, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import footerLogo from "../../../../src/assets/logo/New Project (1).png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <aside>
          <img
            src={footerLogo}
            alt="Footer Logo"
            className="w-16 h-16 rounded-full object-cover shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
          />
        </aside>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          {["Home", "All Meals", "Upcoming Meals"].map((text, i) => (
            <Link
              key={i}
              to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-white hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out"
            >
              {text}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {[{icon: FaFacebook, color: "blue-400"}, {icon: FaLinkedinIn, color: "blue-400"}, {icon: FaYoutube, color: "red-400"}, {icon: FaTwitter, color: "blue-400"}].map(({icon: Icon, color}, i) => (
            <a
              key={i}
              href="#"
              target="_blank"
              className={`hover:text-${color} hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out`}
            >
              <Icon className="text-2xl" />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-xs font-light text-gray-400 tracking-wider">
          &copy; {new Date().getFullYear()} ISTEBRA Hostel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
