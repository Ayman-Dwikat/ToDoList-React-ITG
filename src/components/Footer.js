import logo from "../assets/check-list.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <img src={logo} alt="To-Do Img" />
        <div className="footer-text">To-Do List</div>
      </div>

      <div className="footer-item">&copy; 2024 To-Do List</div>

      <div className="footer-item footer-social">
        <a className="social-link facebook" href="#!" role="button">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        <a className="social-link twitter" href="#!" role="button">
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a className="social-link instagram" href="#!" role="button">
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a className="social-link github" href="#!" role="button">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
