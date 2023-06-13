import About from "./about";
import MainSection from './projects';
import { personalProjects, academicProjects } from "../data/projects";
import { positions } from "../data/experience";
import { courses } from "../data/courses";

export default function Main() {
    return (
        <main>
            <About />
            <MainSection id='experience' components={positions} />
            <MainSection id='personalprojects' components={personalProjects} />
            <MainSection id='academicprojects' components={academicProjects} />
            <MainSection id='courses' components={courses} />
        </main>
    );
}