import About from "../about/about";
import PositionSection from "./positions/PositionSection";
import ProjectSection from "./projects/ProjectSection";
import { personal_projects, academic_projects } from "../../data/projects";
import { courses } from "../../data/courses";
import { positions } from "../../data/positions";

export default function Main() {
    return (
        <main className="main">
            <About />
            <PositionSection title='Experience' positions={positions} />
            <ProjectSection title='Personal Projects' projects={personal_projects} />
            <ProjectSection title='Academic Projects' projects={academic_projects} />
            <ProjectSection title='Courses' projects={courses} />
        </main>
    );
}