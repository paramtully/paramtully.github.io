import { githubLink, linkedinLink, /* instagramLink */ } from "../../data/socialMedia";
import { FaLinkedin, /* FaInstagram, */ FaGithub } from 'react-icons/fa';

// Contains links to social media
export default function SocialMedia() {
    const size = '1.5em';
    const color = 'rgb(148 163 184)';
    return (
        <div>
            <a href={linkedinLink} className="socialLink">
                <FaLinkedin className="socialIcon" size={size} color={color} />
            </a>
            <a href={githubLink} className="socialLink">
                <FaGithub className="socialIcon" size={size} color={color} />
            </a>
            {/* <a href={instagramLink} className="socialLink">
                <FaInstagram className="socialIcon" size={size} color={color} />
            </a> */}
        </div>
    );
}