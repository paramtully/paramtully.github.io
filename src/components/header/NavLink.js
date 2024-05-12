
// Contains one link to a section within the main page
export default function NavLink({ section }) {
    const sectionId = '#' + section.toLowerCase().replace(/\s/g, "");
    return (
        <a href={sectionId} className="navLink">
            <span className="line"></span>
            <span>{ section }</span>
        </a>
    );
}