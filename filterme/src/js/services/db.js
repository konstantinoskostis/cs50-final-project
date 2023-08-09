class DB {
    constructor() { }

    set(key, value) {
        sessionStorage.setItem(key, value);
    }

    get(key) {
        return sessionStorage.getItem(key);
    }

    remove(key) {
        if (this.exists(key)) {
            sessionStorage.removeItem(key);
        }
    }

    exists(key) {
        if (sessionStorage.getItem(key) === null) return false;
        return true;
    }
}

export { DB };