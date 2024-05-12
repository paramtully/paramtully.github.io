import DateHeader from '../shared/DateHeader';
import PositionTitleCard from './PositionTitleCard';
import Description from '../shared/Description';
import Technologies from '../shared/Technologies';
import Links from '../shared/Links';

export default function PositionItem({position}) {
    return (
        <div className='mainItem'>
            <DateHeader start_date={position.start_date} end_date={position.end_date} />
            <div>
                <PositionTitleCard title={position.title} position={position.position} />
                <Description title={position.title} summary={position.summary} description={position.description} />
                <Technologies technologies={position.technologies} />
                <Links github_url={position.github_url} live_url={position.live_url} />
            </div>
        </div>
    );
}