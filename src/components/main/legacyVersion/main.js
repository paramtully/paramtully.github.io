import About from "../../about/about";
import MainSection from './mainComponents';
import { personal_projects_legacy, academic_projects_legacy } from "../../../data/projects";
import { positions_legacy } from "../../../data/positions";

export default function Main() {

    return (
        <main className="main">
            <About />
            <MainSection id='experience' title='Experience' components={positions_legacy} />
            <MainSection id='personalprojects' title='Personal Projects' components={personal_projects_legacy} />
            <MainSection id='academicprojects' title='Academic Projects' components={academic_projects_legacy} />
        </main>
    );
}