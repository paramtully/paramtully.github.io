
export default function Technologies({ technologies }) {
    const techItems = technologies.map(item => {
        return (
            <li className='techItem' key={ item }> { item } </li>
        );
    });

    return <ul>{ techItems }</ul>;
}
