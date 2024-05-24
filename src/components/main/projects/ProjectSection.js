import { useState } from 'react';
import getTitleId from '../../../utility/TitleId';
import MainItem from '../shared/MainItem';
import { categories } from '../../../data/projects';
import CollapsibleButton from '../shared/CollapsibleButton';

export default function ProjectSection({ title, projects }) {
    const importanceTheshold = 4;
    const id = getTitleId(title);
    const buttonId = `${id}_expand`;

    // hides or shows projects below an importance threshold
    const expandProjects = () => {
        projects.forEach(project => {
            const elt = document.getElementById(project.title);
            const height = Math.max(1, project.description.length) * elt.scrollHeight + 'px';

            if (!elt.style.maxHeight) {
                elt.style.maxHeight = height;
            } else {
                elt.style.maxHeight = project.importance >= importanceTheshold ? height: null;
            }
        });
    }

    // sort on importance with secondary sort on date
    projects.sort((p1, p2) => {
        return p1.importance === p2.importance ? p2.end_date.getTime() - p1.end_date.getTime() : p2.importance - p1.importance;
    });

    const listItems = projects.map(project => {
        const className = project.importance >= importanceTheshold ? 'collapsibleOpen collapsibleTasks' : 'collapsibleHidden collapsibleTasks'
        return <li id={project.title} key={project.title} className={className}><MainItem item={project} /></li>;
    });

    return (
        <section id={id}>
            <h2>{title.toUpperCase()}</h2>
            <ol>{ listItems }</ol>
            <div className='expandTask'>
            <CollapsibleButton buttonId={buttonId} collapsedButtonValue='Show More Projects' openButtonValue='Show Less Projects' handleClick={expandProjects} animationDuration={0.7} />
            </div>
        </section>
    );
}