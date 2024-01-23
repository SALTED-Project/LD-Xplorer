const uri_pattern: RegExp = new RegExp("(urn:ngsi-ld:([A-Za-z\-]+)):.+");

function is_empty(some_value) {
    if (typeof some_value === 'number' || typeof some_value === 'boolean') {
        return false;
    }

    if (typeof some_value === 'undefined' || some_value === null) {
        return true;
    }
    
    if (typeof some_value.length !== 'undefined') {
        return some_value.length === 0;
    }
    
    if (typeof some_value === 'object') {
        return Object.keys(some_value).length === 0;
    }

    return false;
}


function get_random_value_from_list(entities_array: Object[]) {
    const random_index = get_random_number(entities_array.length);
    return entities_array[random_index];
}


function get_random_index_from_list(entities_array: Object[]): number {
    const random_index = get_random_number(entities_array.length);
    return random_index;
}


function get_random_number(array_length: number): number {
    return Math.floor(Math.random() * (array_length-1));
}


function get_uri_pattern(): RegExp {
    return uri_pattern;
}


function is_entity_id(candidate:string): boolean {
    let matched:RegExpMatchArray | null = candidate.match(get_uri_pattern());
    return (matched != null && matched[0].length == candidate.length);
}


export {
    is_empty, get_random_value_from_list, get_random_index_from_list, get_uri_pattern, is_entity_id
}