import About from "../../about/About";
import MainSection from './mainComponents';
import { personalProjects, academicProjects } from "../../../data/projects";
import { positions, positions_updated } from "../../../data/positions";
import PositionSection from "../positions/PositionSection";

export default function Main() {

    return (
        <main className="main">
            <About />
            <PositionSection title='Updated Experience' positions={positions_updated} />
            <MainSection id='experience' title='Experience' components={positions} />
            <MainSection id='personalprojects' title='Personal Projects' components={personalProjects} />
            <MainSection id='academicprojects' title='Academic Projects' components={academicProjects} />
        </main>
    );
}