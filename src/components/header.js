

function NameCard() {
    return (
        <div>
            <h1>Param Tully</h1>
            <h2>4th Year Computer Science Student at UBC</h2>
            <p>Aspiring Software Engineer based in Vancouver, BC, Canada</p>
        </div>
    );
}

function NavLink({ section }) {
    const id = '#' + section.toLowerCase();
    return (
        <a href={id}>
            <span>line</span>
            <span>{ section }</span>
        </a>
    );
}


function NavBar() {
    const sections = ['About', 'Academic Projects', 'Personal Projects', 'Courses'];

    const section_elts = sections.map(section => {
        return (
            <li id={section}>
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

export default function Header() {
    return (
        <header>
            <NameCard />
            <NavBar />
        </header>
    );
}