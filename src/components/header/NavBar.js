import NavLink from "./NavLink";

const sections = ['About', 'Experience', 'Personal Projects', 'Academic Projects'];

// Contains collection of links to sections of main page
export default function NavBar() {
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
            <ul>{ section_elts }</ul>
        </nav>
    );
}

export {sections};