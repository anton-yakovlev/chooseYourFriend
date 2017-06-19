function storageHelper() {
    const LOCAL_STORAGE_NAMES = {
        ALL: 'allFriends',
        SAVED: 'savedFriends'
    };

    function getAllFriends() {
        let allFrineds = [];

        // Check if there is something in local storage
        //
        // ....

        return allFrineds;
    }

    function getSavedFriends() {
        let savedFrineds = [];

        // Check if there is something in local storage
        //
        // ....

        return savedFrineds;
    }

    function setToSavedFriends(id) {
        let savedFriends = getSavedFriends();

        // console.log('setToSavedFriends', savedFriends, savedFriends.indexOf(id) >= 0);

        if (savedFriends.indexOf(id) >= 0) {
            return;
        }

        removeFromAllFriends(id);
        savedFriends.push(id);
        updateLocalStorage(LOCAL_STORAGE_NAMES.SAVED, savedFriends);

        // console.log('setToSavedFriends', savedFriends, LOCAL_STORAGE_NAMES.SAVED);
    }

    function setToAllFriends(id) {
        let allFriends = getAllFriends();

        if (allFriends.indexOf(id) >= 0) {
            return;
        }

        removeFromSavedFriends(id);
        allFriends.push(id);
        updateLocalStorage(LOCAL_STORAGE_NAMES.ALL, allFriends);
    }

    function removeFromSavedFriends(id) {
        let savedFriends = getSavedFriends();
        let index = savedFriends.indexOf(id);

        savedFriends.splice(index, 1);
        updateLocalStorage(LOCAL_STORAGE_NAMES.SAVED, savedFriends);
    }

    function removeFromAllFriends(id) {
        let allFriends = getAllFriends();
        let index = allFriends.indexOf(id);

        allFriends.splice(index, 1);
        updateLocalStorage(LOCAL_STORAGE_NAMES.ALL, allFriends);
    }

    function updateLocalStorage(type, model) { // eslint-disable-line
        // Update local storage with type and model
    }

    return {
        getAllFriends: getAllFriends,
        getSavedFriends: getSavedFriends,
        setToSavedFriends: setToSavedFriends,
        setToAllFriends: setToAllFriends
    }
}

module.exports = storageHelper();