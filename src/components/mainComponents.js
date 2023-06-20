import { useState } from 'react';

function DateHeader({ date }) {
    return <header className='mainHeader'>{ date }</header>;
}

function TitleCard({ title, position, detail }) {
    return (
        <h3>
            <div className='mainItemTitle'>{title}</div>
            <div>{position}</div>
            <div>{detail}</div>
        </h3>
    );
}

function Description({ description }) {
    return <p className='mainBodyComponent'>{description}</p>;
}

function Technologies({ technologies }) {
    const techItems = technologies.map(item => {
        return (
            <li key={ item }>
                <div className='bubble'>{ item }</div>
            </li>
        );
    });

    return <ul className='mainBodyComponent bubbleContainer'>{ techItems }</ul>;
}

function Links({ code_url, project_url }) {
    return (
        <div className='mainBodyComponent bubbleContainer'>
            { code_url && <a className='bubble' href={code_url}>Code</a> }
            { project_url && <a className='bubble' href={project_url}>Website</a> }
        </div>
    ) 
}

function MainItem({ project }) {
    return (
        <div className='mainItem'>
            { project.date && <DateHeader date={project.date} /> }
            <div className='mainBody'>
                <TitleCard title={project.title} position={project.position} detail={project.detail} />
                <Description description={project.description} />
                { project.technologies && <Technologies technologies={project.technologies} /> }
                <Links code_url={project.code_url} project_url={project.project_url} />
            </div>
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
            <h2 className='sectionTitle'>{title.toUpperCase()}</h2>
            <ol>{ listItems }</ol>
            { components.length > 1 && <button onClick={() => setExpanded(!expanded)} >{expanded ? 'show less' : 'show more'}</button>}
        </section>
    );
}