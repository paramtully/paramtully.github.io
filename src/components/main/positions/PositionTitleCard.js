
export default function PositionTitleCard({ title, position }) {
    return (
        <h3>
            <div className='title'>{title}</div>
            <div className='mainSubHeader'>{position}</div>
        </h3>
    );
}