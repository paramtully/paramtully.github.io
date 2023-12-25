import About from "./about";
import MainSection from './mainComponents';
import { personalProjects, academicProjects } from "../data/projects";
import { positions } from "../data/experience";
import { courses } from "../data/courses";

export default function Main() {

    return (
        <main className="main">
            <About />
            <MainSection id='experience' title='Experience' components={positions} />
            <MainSection id='personalprojects' title='Personal Projects' components={personalProjects} />
            <MainSection id='academicprojects' title='Academic Projects' components={academicProjects} />
        </main>
    );
}