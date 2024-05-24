import Image from '../../../images/icons8-collapse-arrow-100.png';

export default function CollapsibleButton({ buttonId, collapsedButtonValue, openButtonValue, handleClick, animationDuration }) {
    const buttonIconId = `${buttonId}_icon`;
    const buttonTextId = `${buttonId}_text`;
    const duration = (animationDuration ? animationDuration.toString() : '0.3') + 's';

    function handleCollapseClick() {
        const buttonIcon = document.getElementById(buttonIconId);
        const buttonText = document.getElementById(buttonTextId);

        if (buttonText.innerHTML === collapsedButtonValue) {
            buttonText.innerHTML = openButtonValue;
            buttonIcon.style.animation = "rotateUp " + duration + " linear 0s 1 forwards";
        } else {
            buttonText.innerHTML = collapsedButtonValue;
            buttonIcon.style.animation = "rotateDown " + duration + " linear 0s 1 forwards";
        }
        
        handleClick();
    }

    return (
        <button id={buttonId} className="collapseButton" onClick={handleCollapseClick} value={collapsedButtonValue} >
            <span className="line"></span>
            <span id={buttonTextId}>{ collapsedButtonValue }</span>
            <img src={Image} alt="" className='collapseIcon' id={buttonIconId} />
        </button>
    )
}