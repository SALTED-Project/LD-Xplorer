import { ref } from 'vue';
import { useAPI } from './APICalls';
import { is_empty, get_random_value_from_list, is_entity_id } from '../helper_functions';

const entity_isLoaded = ref(false);
const entity_content_data = ref({});
const selected_entity_type = ref("no type selected");
const start_ID = ref("");


const { get_entities } = useAPI();

const fiware_URI_template: RegExp = new RegExp("(https:\/\/uri\.fiware\.org\/ns\/data-models#)(.+)");
const smartdatamodel_URI_template: RegExp = new RegExp("https://smartdatamodels.org/[a-zA-Z\-/]+");

const type_mapper = {
    "urn:ngsi-ld:Organization": "https://smartdatamodels.org/dataModel.Organization/Organization",
    "urn:ngsi-ld:DataServiceDCAT-AP": "https://smartdatamodels.org/dataModel.DCAT-AP/DataServiceDCAT-AP",
    "urn:ngsi-ld:DataServiceRun": "https://smartdatamodels.org/dataModel.DCAT-AP/DataServiceRun",
    "urn:ngsi-ld:DistributionDCAT-AP": "https://smartdatamodels.org/dataModel.DCAT-AP/DistributionDCAT-AP"
};

export function useEntityComponentData() {

    function map_type(short_type_name): string {
        return type_mapper[short_type_name]; 
    }

    function load_entity(entity_to_load: Object) {
        if (is_empty(entity_to_load)) {
            alert("no results found for query");
        }
        else {
            set_entity_content(entity_to_load);
            set_entity_loaded();
            set_selected_entity_type(entity_to_load["type"]);
        }
    }

    function get_start_entity_by_type() {

        const search_params = new URLSearchParams({
            type: get_selected_entity_type(),
            limit: "1"
        });
        get_entities("entityByType", search_params)
        .then(json => {
            load_entity(get_random_value_from_list(json));
        });
    }

    function get_start_entity_by_ID(ID: string) {
        if (!is_entity_id(ID)) {
            alert("Please provide an ID only.\n" + ID);
            return;
        }

        const search_params = new URLSearchParams({
            id: ID
        });
    
        get_entities("byID", search_params)
        .then(json => {
        load_entity(json[0]);
        });
    }
    
    function get_random_entity() {
        const search_params = new URLSearchParams({
            limit: "1"
        })
        get_entities("scorpiotestrandom", search_params)
        .then(json => {
            load_entity(get_random_value_from_list(json));
        });
    }

    function get_entity_content(): Object|null{
        if (is_entity_loaded()) {
            return entity_content_data.value;
        }
        else {
            return null;
        }
    }

    function set_entity_content(new_content: Object) {
        entity_content_data.value = new_content;
    }

    function is_entity_loaded(): boolean {
        return entity_isLoaded.value;
    }

    function set_entity_loaded() {
        entity_isLoaded.value = true;
    }

    function set_entity_unloaded() {
        entity_isLoaded.value = false;
    }

    function set_selected_entity_type(new_type: string) {
        selected_entity_type.value = new_type;
    }

    function get_selected_entity_type(): string {
        return selected_entity_type.value;
    }

    function get_selected_entity_type_shortened(long_name: string): string {
        if (fiware_URI_template.test(long_name)) {
            let matches: RegExpMatchArray | null = long_name.match(fiware_URI_template);
            if (matches != null) {
                return matches[2];
            }
        }
        let url_splitted: string[] = long_name.split("/");
        return url_splitted[url_splitted.length-1]
    }

    function is_smartdatamodel(uri: string): boolean {
        return smartdatamodel_URI_template.test(uri);
    }

    function set_start_ID(new_start_ID: string) {
        start_ID.value = new_start_ID;
    }

    function get_start_ID(): string {
        return start_ID.value;
    }
    
    function reset_state() {
        set_entity_content({});
        set_entity_unloaded();
        set_start_ID("");
    }

    function sort_entity_types_by_short_name(type1: string, type2: string): number {
        const type1_short = get_selected_entity_type_shortened(type1);
        const type2_short = get_selected_entity_type_shortened(type2);
        if (type1_short > type2_short) return 1;
        if (type1_short < type2_short) return -1;
        else {
            if (type1 > type2) return 1;
            if (type1 < type2) return -1;
            else {
                console.log("Duplicate type including prefix: ", type1);
                return 0;
            }
        }
    }

    return {is_entity_loaded, set_entity_loaded, set_entity_unloaded, entity_content_data, reset_state, get_random_entity, get_start_entity_by_type, load_entity, 
        get_entity_content, map_type, get_selected_entity_type, set_selected_entity_type, get_selected_entity_type_shortened,
        is_smartdatamodel, get_start_entity_by_ID, set_start_ID, get_start_ID, sort_entity_types_by_short_name}
}