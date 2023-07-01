
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
        <a href={sectionId}>
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

// TODO: ADD LINKS TO HEADER
export default function Header() {
    return (
        <header className="nav">
            <NameCard />
            <NavBar />
        </header>
    );
}

export { sections };