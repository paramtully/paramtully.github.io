import { useState } from 'react';

function DateHeader({ date }) {
    return <header>{ date }</header>;
}

function TitleCard({ title, position, detail }) {
    return (
        <h3>
            <div>{title}</div>
            <div>{position}</div>
            <div>{detail}</div>
        </h3>
    );
}

function Description({ description }) {
    return <p>{description}</p>;
}

function Technologies({ technologies }) {
    const techItems = technologies.map(item => {
        return (
            <li key={ item }>
                <div>{ item }</div>
            </li>
        );
    });

    return <ul>{ techItems }</ul>;
}

function Links({ code_url, project_url }) {
    return (
        <div>
            { code_url && <a href={code_url}>Code</a> }
            { project_url && <a href={project_url}>Website</a> }
        </div>
    ) 
}

function MainComponent({ project }) {
    return (
        <div>
            { project.date && <DateHeader date={project.date} /> }
            <TitleCard title={project.title} position={project.position} detail={project.detail} />
            <Description description={project.description} />
            { project.technologies && <Technologies technologies={project.technologies} /> }
            <Links code_url={project.code_url} project_url={project.project_url} />
        </div>
    );
}

export default function MainSection({ components, id }) {
    const [expanded, setExpanded] = useState(false);
    
    const displayedProjects = expanded ? components : components.filter(project => project.shortlist);
    const listItems = displayedProjects.map(project => <li key={project.title}><MainComponent project={project} /></li>);

    return (
        <section id={id}>
            <ol>{ listItems }</ol>
            <button onClick={() => setExpanded(!expanded)} >{expanded ? 'show less' : 'show more'}</button>
        </section>
    );
}