
export default function ProjectLinks({ github_url, live_url }) {
    return (
        <div>
            { github_url && <a className='projectLink' href={github_url}>Code</a> }
            { live_url && <a className='projectLink' href={live_url}>Live Project</a> }
        </div>
    ) 
}