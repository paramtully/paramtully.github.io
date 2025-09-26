
export default function TitleCard({title, org_url}) {
    return !org_url ? <div className='title'>{title}</div> : (
        <a href={org_url} className="titleLink" >{title}</a>
    )
}