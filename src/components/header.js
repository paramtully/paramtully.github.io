import { githubLink, linkedinLink, instagramLink } from "../data/socialMedia";
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const sections = ['About', 'Experience', 'Personal Projects', 'Academic Projects', 'Courses'];

// Contains name and brief description
function NameCard() {
    return (
        <div>
            <h1>Param Tully</h1>
            <h2>4th Year Computer Science Student at UBC</h2>
            <p>Aspiring Software Engineer based in Vancouver, BC, Canada</p>
        </div>
    );
}

// Contains one link to a section within the main page
function NavLink({ section }) {
    const sectionId = '#' + section.toLowerCase().replace(/\s/g, "");
    return (
        <a href={sectionId} className="navLink">
            <span className="line"></span>
            <span>{ section }</span>
        </a>
    );
}

// Contains collection of links to sections of main page
function NavBar() {
    const section_elts = sections.map(section => {
        const sectionId = 'NAV_' + section.replace(/\s/g, "");     // removes whitespace
        return (
            <li id={sectionId}>
                <NavLink section={section} />
            </li>
        );
    });

    return (
        <nav>
            <ul>
                { section_elts }
            </ul>
        </nav>
    );
}

// Contains links to social media
function SocialMedia() {
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
            <a href={instagramLink} className="socialLink">
                <FaInstagram className="socialIcon" size={size} color={color} />
            </a>
        </div>
    );
}

// TODO: ADD LINKS TO HEADER
export default function Header() {
    return (
        <header className="header">
            <div className="nav">
                <NameCard />
                <NavBar />
                <SocialMedia />
            </div>
        </header>
    );
}

export { sections };