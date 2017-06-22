// ----- Storage helpers ----- //
const LOCAL_STORAGE_ALL = 'allFriends';
const LOCAL_STORAGE_SAVED = 'savedFriends';

class storageHelper {
    getAllFriends() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL)) || null;
    }

    getSavedFriends() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVED)) || null;
    }

    setAllFriends(model) {
        localStorage.setItem(LOCAL_STORAGE_ALL, JSON.stringify(model));
    }

    setSavedFriends(model) {
        localStorage.setItem(LOCAL_STORAGE_SAVED, JSON.stringify(model));
    }

    update(storageName, model) {
        localStorage.removeItem(storageName);
        localStorage.setItem(storageName, model);
    }
}

module.exports = new storageHelper;