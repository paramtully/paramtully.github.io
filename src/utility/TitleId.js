

const getTitleId = (title) => {
    return title.toLowerCase().replace(/\s/g, "");
}

export default getTitleId;