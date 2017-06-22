// ----- Storage helpers ----- //
const LOCAL_STORAGE_ALL = 'allFriends';
const LOCAL_STORAGE_SAVED = 'savedFriends';

class storageHelper {
    getAllFriends() {
        let allFrineds = [];

        // Check if there is something in local storage
        //
        // ....

        return allFrineds;
    }

    getSavedFriends() {
        let savedFrineds = [];

        // Check if there is something in local storage
        //
        // ....

        return savedFrineds;
    }

    setToSavedFriends(id) {
        let savedFriends = this.getSavedFriends();

        // console.log('setToSavedFriends', savedFriends, savedFriends.indexOf(id) >= 0);

        if (savedFriends.indexOf(id) >= 0) {
            return;
        }

        this.removeFromAllFriends(id);
        savedFriends.push(id);
        this.updateLocalStorage(LOCAL_STORAGE_SAVED, savedFriends);

        // console.log('setToSavedFriends', savedFriends, LOCAL_STORAGE_NAMES.SAVED);
    }

    setToAllFriends(id) {
        let allFriends = this.getAllFriends();

        if (allFriends.indexOf(id) >= 0) {
            return;
        }

        this.removeFromSavedFriends(id);
        allFriends.push(id);
        this.updateLocalStorage(LOCAL_STORAGE_ALL, allFriends);
    }

    removeFromSavedFriends(id) {
        let savedFriends = this.getSavedFriends();
        let index = savedFriends.indexOf(id);

        savedFriends.splice(index, 1);
        this.updateLocalStorage(LOCAL_STORAGE_SAVED, savedFriends);
    }

    removeFromAllFriends(id) {
        let allFriends = this.getAllFriends();
        let index = allFriends.indexOf(id);

        allFriends.splice(index, 1);
        this.updateLocalStorage(LOCAL_STORAGE_ALL, allFriends);
    }

    updateLocalStorage(type, model) { // eslint-disable-line
        // Update local storage with type and model
    }
}

module.exports = new storageHelper;