let STORES = {};

export const ExamplesStore = init_store();

function init_store() {
    const id = {};
    STORES[id] = {};
    return {
        set: (name,value) => {
            STORES[id][name] = value
        },
        get: (name) => {
            if(name){
                let list = {};
                if(name instanceof RegExp){
                    Object.keys(STORES[id]).forEach(item => {
                        if(name.test(item)) list[item]= STORES[id][item];
                    });
                    return list;
                }else{
                    return STORES[id][name];
                }
            }

            return STORES[id];
        },
        length: () => {
            return STORES[id].length;
        },
        clear: () => {
            STORES[id] = {};
        },
        delete: (name) => {
            if(name instanceof RegExp){
                Object.keys(STORES[id]).forEach(item => {
                    if(name.test(item)) delete STORES[id][item];
                });
            }else{
                delete STORES[id][name];
            }
        }
    }
}


