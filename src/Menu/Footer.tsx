import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="relative h-72 flex flex-row justify-between items-center px-6 sm:px-18 md:px-24 lg:px-36 gap-6 bg-gray-700 text-white"
  >
    <ul className="flex flex-col gap-4">
      <li>
        <Link to="/privacy" className="hover:text-gray-300">
          Privacy Policy
        </Link>
      </li>
      <li>
        <p className="text-gray-300">
          &copy; David Park
        </p>
      </li>
    </ul>
    <div className="flex flex-row gap-4">
      <SocialIcon
        href="https://twitter.com/WatermelonFuel"
        src="/media/social/twitter-white.svg"
        alt="🐤"
      />
      <SocialIcon
        href="https://github.com/WatermelonFueled"
        src="/media/social/GitHub-Mark-Light-64px.png"
        alt="🐙"
      />
    </div>
  </footer>
)

export default Footer


const SocialIcon = ({ href, src, alt }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    <img
      src={src}
      alt={alt}
      className="w-8 h-8 transform hover:scale-105"
    />
  </a>
)
