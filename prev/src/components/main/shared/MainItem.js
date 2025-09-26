import TitleCard from './TitleCard';
import Technologies from './Technologies';
import Description from './Description';
import DateHeader from './DateHeader';
import ProjectLinks from './ProjectLinks';

export default function MainItem({ item }) {
    return (
        <div className='mainItem'>
            <DateHeader start_date={item.start_date} end_date={item.end_date} />
            <TitleCard title={item.title}/>
            <Description title={item.title} summary={item.summary} description={item.description} />
            <Technologies technologies={item.technologies} />
            <ProjectLinks github_url={item.github_url} item_url={item.item_url} />
        </div>
    );
}
