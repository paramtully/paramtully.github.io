import CollapsibleButton from './CollapsibleButton';

function Summary({ summaryId, summary }) {
    return (
        <div id={summaryId} className='collapsibleOpen'>
            <p>{summary}</p>
        </div>
    );
}

export default function Description({ title, summary, description }) {

    const descriptionItems = description.map(description_item => <p>{description_item}</p>);
    const buttonId = `${title}_button`;
    const summaryId = `${title}_summary`;
    const descriptionId = `${title}_description`;

    function expandDescription() {
        const descriptionElement = document.getElementById(descriptionId);
        const summaryElement = document.getElementById(summaryId);

        if (descriptionElement.style.maxHeight) {
            descriptionElement.style.maxHeight = null;
            summaryElement.style.maxHeight = summaryElement.scrollHeight + "px";
            summaryElement.style.opacity = 1;
        } else {
            descriptionElement.style.maxHeight = descriptionElement.scrollHeight + "px";
            summaryElement.style.opacity = 0;
            summaryElement.style.maxHeight = 0;
        }
    }

    return (
        <div>
            <Summary summaryId={summaryId} summary={summary} />
            <div id={descriptionId} className='collapsibleHidden' >{descriptionItems}</div>
            { description.length > 0 &&
              <CollapsibleButton buttonId={buttonId} collapsedButtonValue={'Show More'} openButtonValue={'Show Less'} handleClick={expandDescription} />
            }
        </div>
    );
}