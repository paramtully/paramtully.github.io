
function getDate(start_date, end_date) {
    var date;

    const startMonth = start_date?.toLocaleString('en-us',{month:'short'});
    const endMonth = end_date?.toLocaleString('en-us',{month:'short'});

    const startYear = start_date?.toLocaleString('en-us',{year:'numeric'});
    const endYear = end_date?.toLocaleString('en-us',{year:'numeric'});

    if (!start_date) {
        date = end_date?.toLocaleString('en-us',{month:'short', year:'numeric'});
    } else if (startYear === endYear) {
        date = `${startMonth} - ${endMonth} ${startYear}`;
    } else {
        date = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
    return date;
}

// shows date 
export default function DateHeader({ start_date, end_date }) {
    return <header className='mainSubHeader'>{ getDate(start_date, end_date) }</header>;
}
