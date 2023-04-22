const storageService = () => {
    const get = async(listName) => {
        return JSON.parse(localStorage.getItem(listName))
    }

    const set = (listName, list) => {
        return localStorage.setItem(listName, JSON.stringify(list));
    }

    return {get, set};
}

export default storageService;