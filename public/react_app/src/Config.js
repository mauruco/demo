class Config {

    static publicUrl = process.env.PUBLIC_URL;
    static apiUrl = process.env.REACT_APP_API_URL;
    static appUrl = process.env.REACT_APP_APP_URL;
    static router = process.env.REACT_APP_ROUTER;
    static storageType = 'sessionStorage';
    static timeout = 500;

    static destroy() {
        
        window[Config.storageType].clear();
    }

    static setItem(name, obj) {

        window[Config.storageType].setItem(name, JSON.stringify(obj));
    }
    
    static getItem(name) {
        
        return JSON.parse(window[Config.storageType].getItem(name));
    }
}

export default Config;