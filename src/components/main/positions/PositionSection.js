import getTitleId from '../../../utility/TitleId';
import PositionItem from './PositionItem';

export default function PositionSection({ title, positions }) {
    const id = getTitleId(title);
    const listItems = positions.map(position => <li key={position.title}><PositionItem position={position} /></li>);

    return (
        <section id={id}>
            <h2>{title.toUpperCase()}</h2>
            <ol>{ listItems }</ol>
        </section>
    );
}