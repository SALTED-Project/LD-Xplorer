import {useEntityComponentData} from './composables/EntityComponentData';
const { set_selected_entity_type, sort_entity_types_by_short_name } = useEntityComponentData();


async function find_available_entity_types() {
    const options = {
        method: "GET",
        headers: {
            'Accept':'application/ld+json'
        }
    }
    
    const internal_api = '/api/types';
    fetch(internal_api, options)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        let types = json.typeList;
        if (typeof types == "string") {
            types = [types];
        }
        types.sort(sort_entity_types_by_short_name);
        this.available_entity_types = types;
        set_selected_entity_type(this.available_entity_types[0]);
    })
    .catch(found_error)
}

function found_error(err) {
    console.log("error in navbar_functions");
    console.log(err);
}

export {
    find_available_entity_types
}