// ----- Storage helpers ----- //
const STORAGE_ALL = 'allFriends';
const STORAGE_SAVED = 'savedFriends';
const currentStorage = {
    [STORAGE_ALL]: [],
    [STORAGE_SAVED]: []
};

class storageHelper {
    saveLocalStorage() {
        const savedFriends = this.getCurrentStorage(STORAGE_SAVED);

        localStorage.removeItem(STORAGE_SAVED);
        localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedFriends));
    }

    getLocalStorage(storageName = STORAGE_SAVED) {
        return JSON.parse(localStorage.getItem(storageName)) || null;
    }

    setCurrentStorage(model, storageName) {
        currentStorage[storageName] = model;
    }

    getCurrentStorage(storageName) {
        return currentStorage[storageName];
    }

    normalizeFriends(model) {
        const localStorageFriends = this.getLocalStorage();

        if (!localStorageFriends) {
            return {
                [STORAGE_ALL]: model
            }
        }

        const localStorageFriendsIds = localStorageFriends.map(item =>{
            return item.id;
        });

        const allFriends = model.filter(item => {
            return localStorageFriendsIds.indexOf(item.id) < 0;
        });

        return {
            [STORAGE_ALL]: allFriends,
            [STORAGE_SAVED]: localStorageFriends
        }
    }
}

module.exports = new storageHelper;