import TitleCard from "../shared/TitleCard";

export default function PositionTitleCard({ title, position, org_url }) {
    return (
        <h3>
            <TitleCard title={title} org_url={org_url} />
            <div className='mainSubHeader'>{position}</div>
        </h3>
    );
}