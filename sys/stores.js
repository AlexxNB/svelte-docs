let STORES = {};

function init_store() {
    const id = {};
    STORES[id] = {};
    return {
        set: (name,value) => {
            STORES[id][name] = value
        },
        get: (name) => {
            if(name)
                return STORES[id][name];
            else
                return STORES[id];
        },
        length: () => {
            return STORES[id].length;
        }
    }
}

export const ClientStore = init_store();
