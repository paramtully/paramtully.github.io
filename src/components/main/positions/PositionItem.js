import DateHeader from '../shared/DateHeader';
import PositionTitleCard from './PositionTitleCard';
import Description from '../shared/Description';
import Technologies from '../shared/Technologies';
import ProjectLinks from '../shared/ProjectLinks';

export default function PositionItem({position}) {
    return (
        <div className='mainItem'>
            <DateHeader start_date={position.start_date} end_date={position.end_date} />
            <PositionTitleCard title={position.title} position={position.position} org_url={position.org_url}/>
            <Description title={position.title} summary={position.summary} description={position.description} />
            <Technologies technologies={position.technologies} />
            <ProjectLinks github_url={position.github_url} live_url={position.live_url} />
        </div>
    );
}