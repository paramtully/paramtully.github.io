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

function MainItem({ project }) {
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

export default function MainComponent({ title, components }) {
    const [expanded, setExpanded] = useState(false);
    const id = title.toLowerCase().replace(/\s/g, "");

    const displayedProjects = expanded ? components : components.filter(project => project.shortlist);
    const listItems = displayedProjects.map(project => <li key={project.title}><MainItem project={project} /></li>);

    return (
        <section id={id}>
            <h2 className='sectionTitle'>{title}</h2>
            <ol>{ listItems }</ol>
            { components.length > 1 && <button onClick={() => setExpanded(!expanded)} >{expanded ? 'show less' : 'show more'}</button>}
        </section>
    );
}