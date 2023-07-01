import { useState } from 'react';

function DateHeader({ date }) {
    return <header className='mainSubHeader'>{ date }</header>;
}

function TitleCard({ title, position, detail }) {
    return (
        <h3>
            <div>{title}</div>
            <div className='mainSubHeader'>{position}</div>
            <div className='mainSubHeader'>{detail}</div>
        </h3>
    );
}

function Description({ description }) {
    return <p>{description}</p>;
}

function Technologies({ technologies }) {
    const techItems = technologies.map(item => {
        return (
            <li className='techItem' key={ item }> { item } </li>
        );
    });

    return <ul>{ techItems }</ul>;
}

function Links({ code_url, project_url }) {
    return (
        <div>
            { code_url && <a className='projectLink' href={code_url}>Code</a> }
            { project_url && <a className='projectLink' href={project_url}>Website</a> }
        </div>
    ) 
}

function MainItem({ project }) {
    return (
        <div className='mainItem'>
            { project.date && <DateHeader date={project.date} /> }
            <div>
                <TitleCard title={project.title} position={project.position} detail={project.detail} />
                <Description description={project.description} />
                { project.technologies && <Technologies technologies={project.technologies} /> }
                <Links code_url={project.code_url} project_url={project.project_url} />
            </div>
        </div>
    );
}

function Expand({ value, expanded, setExpanded }) {
    return <button className='expand' onClick={() => setExpanded(!expanded)} >{expanded ? 'show less' : 'show more'}</button>;
}

export default function MainComponent({ title, components }) {
    const [expanded, setExpanded] = useState(false);
    const id = title.toLowerCase().replace(/\s/g, "");

    const displayedProjects = expanded ? components : components.filter(project => project.shortlist);
    const listItems = displayedProjects.map(project => <li key={project.title}><MainItem project={project} /></li>);

    return (
        <section id={id}>
            <h2>{title.toUpperCase()}</h2>
            <ol>{ listItems }</ol>
            {   components.length > 1 && 
                <Expand value={expanded ? 'show less' : 'show more'} expanded={expanded} setExpanded={setExpanded} /> 
            }
        </section>
    );
}