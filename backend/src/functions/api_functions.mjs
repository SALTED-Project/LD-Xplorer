import got from "got";
import CONFIG from '../config_files/config.json' assert {type: 'json'};
import TokenHandler from './token_handling.mjs';


const TEST_ENTITY_TYPE = CONFIG.test_type;
const OPTIONS = {
    method: "GET",
    headers: {
        'Accept':'application/ld+json'
    }
};
const EP_ENTITIES = "entities";
const EP_TYPES = "types";
const TESTJSONRESULT = { "test_result": "works" };

const TOKEN_REQUIRED = CONFIG.token_required;
let token_handler;
if (TOKEN_REQUIRED) {
    token_handler = new TokenHandler();
}


async function contact_scorpio() {
    const search_params = new URLSearchParams({
        type: TEST_ENTITY_TYPE,
        limit: "1"
    });
    return await query_with_or_without_token(EP_ENTITIES, search_params);
}


async function get_near_entities_from_scorpio(req) {
    // https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.06.01_60/gs_CIM009v010601p.pdf
    // 4.10 NGSI-LD Geoquery Language
    const search_params = new URLSearchParams({
        type: req.query.type, // in future this should work without type given
        limit: req.query.limit,
        coordinates: req.query.coordinates,
        geoproperty: "location",
        geometry: "Point",
        georel: "near;maxDistance==150000000000",
    });
    return await query_with_or_without_token(EP_ENTITIES, search_params);
}


async function get_temporal_near_entities_from_scorpio(req) {
    // simple filter by attribute, no request to temporal endpoint/history manager yet
    const search_params = new URLSearchParams({
        limit: req.query.limit,
        q: req.query.q
    });
    return await query_with_or_without_token(EP_ENTITIES, search_params);
}


async function get_types_list_from_scorpio() {
    return query_with_or_without_token(EP_TYPES, null).then(result => {
        return result;
    });
}

async function get_entities_by_type_from_scorpio(req) {
    const search_params = new URLSearchParams({
        type: req.query.type,
        limit: req.query.limit
    });
    return await query_with_or_without_token(EP_ENTITIES, search_params);
}

async function get_entity_by_id_from_scorpio(req) {
    console.log(req.query);
    const search_params = new URLSearchParams({
        id: req.query.id
    });
    return await query_with_or_without_token(EP_ENTITIES, search_params);
}

function append_token_to_headers(token_type, token) {
    OPTIONS['headers']['Authorization'] = token_type + " " + token;
}

async function query_with_or_without_token(endpoint, search_params) {
    if (TOKEN_REQUIRED) {
        try {
            return token_handler.get_token().then(async answer => {
                const token = answer[0];
                const token_type = answer[1];
                append_token_to_headers(token_type, token);
                    return await query_scorpio(endpoint, search_params);
            });
        }
        catch(error) {
            console.log("something went wrong in handling token", error);
            return "There was an error. No result available.";
        }
    }
    else {
        return await query_scorpio(endpoint, search_params);
    }
}

async function query_scorpio(endpoint, search_params) {
    console.log("API_FUNCTIONS: " + "received request, contacting scorpio");
    let query = CONFIG.scorpio_url + CONFIG.ngsi_api + endpoint;
    if (search_params !== null) {
        query = query + "?" + search_params;
    }
    console.log("actually issued query: " + query);
    try {
        const scorpio_answer = await got(query, OPTIONS).json();
        console.log("query_scorpio: received answer:");
        console.log(scorpio_answer);
        return scorpio_answer;
    }
    catch (error) {
        console.log("error in query_scorpio");
        return {};
    }
}

export default {
    contact_scorpio, get_types_list_from_scorpio, get_entities_by_type_from_scorpio, 
    get_near_entities_from_scorpio, get_temporal_near_entities_from_scorpio, 
    get_entity_by_id_from_scorpio
}
