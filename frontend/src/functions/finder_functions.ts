import { useAPI } from './composables/APICalls';
import { useEntityComponentData } from './composables/EntityComponentData';
import { get_random_index_from_list, get_random_value_from_list, is_empty, get_uri_pattern } from './helper_functions';
import { ParamsObject } from '../classes/ParamsObject';

const { get_entities } = useAPI();
const { load_entity, get_entity_content, get_selected_entity_type } = useEntityComponentData();

const MAIN_TEMP_PROPERTY: string = "https://smart-data-models.github.io/data-models/terms.jsonld#/definitions/dateCreated";
const CALCULATION_PERIOD_PROPERTY: string = "https://smart-data-models.github.io/data-models/terms.jsonld#/definitions/calculationPeriod";

// TODO: retrieve referenced entitys on store whenever an entity is retrieved?
// https://github.com/ScorpioBroker/ScorpioBroker/blob/development-quarkus/docs/en/source/followRelationship.rst
// evaluate performance before using this festure in great scale

function findByReferenceUp() {
  alert("Planned to find referencing entities.\n"+
    "Unfortunately, our broker does not support this functionality yet.\n"+
    "Stay tuned for future updates and follow the development process of this exciting project!\n"+
    "https://github.com/ScorpioBroker/ScorpioBroker"
  );

}

// TODO: This part currently doesn't work with Scorpio. Reason is unclear.
function findByTime() {
  let original_timestamp: string|null = determineCurrentTimestamp();
  if (original_timestamp == null) {
    return;
  }

  try {
    let original_time_information: Date = new Date(original_timestamp);
    let two_days_after: Date = new Date();
    two_days_after.setDate(original_time_information.getDate() + 2);
    let two_days_before: Date = new Date();
    two_days_before.setDate(original_time_information.getDate() - 2);
    console.log(manipulate_iso_format_to_match(two_days_after.toISOString()));
    console.log(manipulate_iso_format_to_match(two_days_before.toISOString()));
    let before_timestamp: string = manipulate_iso_format_to_match(two_days_before.toISOString());
    let after_timestamp: string = manipulate_iso_format_to_match(two_days_after.toISOString());
    
    const search_params = new URLSearchParams({
        limit: "10",
        q: `${MAIN_TEMP_PROPERTY}>${before_timestamp}OR${MAIN_TEMP_PROPERTY}<${after_timestamp}`
      });
    
      get_entities("temporal/near", search_params)
      .then(json => {
        let applicable_entities = exclude_current_entity_from_list(json);
        load_entity(get_random_value_from_list(applicable_entities));
      });
  }
  catch (error) {
    found_error(error);
    return null;
  }

}

function manipulate_iso_format_to_match(time_string: string): string {
  return time_string.substring(0,time_string.length-1) + "000+00:00";
}


function findByLocation() {
  
  let coordinates:string|null = determineCurrentLocation();
  if (coordinates === null) {
    return;
  }

  let selected_type: string = get_selected_entity_type();
  if (is_empty(selected_type)) {
    alert("No entity type selected. Cannot find entities without a type.");
    return;
  }

  const search_params = new URLSearchParams({
    type: selected_type,
    limit: "10",
    coordinates: "[" + coordinates + "]"
  });

  get_entities("location/near", search_params)
  .then(json => {
    let applicable_entities = exclude_current_entity_from_list(json);
    load_entity(get_random_value_from_list(applicable_entities));
  });
}


function findByReferenceDown() {
  let current_entity: Object|null = get_current_entity_if_loaded(true);
  if (current_entity === null) {
    return null;
  }

  let results: Array<Array<string>> = parse_referenced_entities(current_entity);
  let referenced_entities:Array<string> = results[0];
  let referenced_entities_types:Array<string> = results[1];
  let referenced_entities_short_types:Array<string> = results[2];

  if (referenced_entities.length == 0) {
    alert("No referenced entities found.\nPlease try a different entity or connection arrow.");
    return;
  }

  else {
    let entity_types_string: string = "";
    for (let index in referenced_entities_short_types) {
      entity_types_string += referenced_entities_short_types[index] + "\n"
    }
    alert("Found the following referenced entities:\n" + entity_types_string + "\nYou will now discover one of those referenced entities (randomly).\nStay tuned :)");
  }

  let selected_index: number = get_random_index_from_list(referenced_entities_short_types);

  const search_params = new URLSearchParams({
    id: referenced_entities[selected_index]
  });

  get_entities("byID", search_params)
  .then(json => {
    load_entity(json[0]);
  });
}


function parse_referenced_entities(current_entity: Object) {
  let referenced_entities: Array<string> = [];
  let referenced_entities_types: Array<string> = [];
  let referenced_entities_short_types: Array<string> = [];

  Object.keys(current_entity).forEach(function(key:string,index:number) {
    let property: Object = current_entity[key];
    let property_value: Object;
    if (property.hasOwnProperty("value")) {
      property_value = property["value"];
    }
    else if (property.hasOwnProperty("object")) {
      property_value = property["object"];
    }
    else {
      return;
    }

    if (typeof property_value === 'string') {
      let matches: Array<string>|null = test_and_match(property_value, get_uri_pattern());
      if (matches !== null) {
        referenced_entities.push(matches[0])
        referenced_entities_types.push(matches[1])
        referenced_entities_short_types.push(matches[2])
      }
    }

    if (Array.isArray(property_value)) {
      for (let index in property_value) {
        let matches: Array<string>|null = test_and_match(property_value[index], get_uri_pattern());
          if (matches !== null) {
            referenced_entities.push(matches[0])
            referenced_entities_types.push(matches[1])
            referenced_entities_short_types.push(matches[2])
          }
      }
    }

  });

  return [referenced_entities, referenced_entities_types, referenced_entities_short_types]
}


function test_and_match(candidate: string, pattern: RegExp): Array<string>|null {
  if (pattern.test(candidate)) {
    let matches: RegExpMatchArray | null = candidate.match(pattern);
    if (matches != null) {
        return matches;
    }
  }
  return null;
}


function determineCurrentLocation(): string|null {

  let propertyOfInterest: string = "location";
  let pathToPropertyValue: Array<string> = [propertyOfInterest, "value", "coordinates"];
  let notFoundMessage: string = "This entity doesn't have a location, so I cannot find anything near it.";
  let params: ParamsObject = new ParamsObject(propertyOfInterest, pathToPropertyValue, notFoundMessage);

  return determineValue(params, true);
}

function determineCurrentTimestamp(): string|null {

  let propertyOfInterest: string = MAIN_TEMP_PROPERTY;
  let pathToPropertyValue: Array<string> = [propertyOfInterest, "value"];
  let notFoundMessage: string|null = null;
  let params: ParamsObject = new ParamsObject(propertyOfInterest, pathToPropertyValue, notFoundMessage);
  
  let first_try:string|null = determineValue(params, false);

  if (first_try != null) {
    return first_try;
  }

  propertyOfInterest = CALCULATION_PERIOD_PROPERTY;
  pathToPropertyValue = [propertyOfInterest, "value", "to"];
  notFoundMessage = "This entity doesn't have a timestamp, so I cannot find other entities from the same point in time.";
  params = new ParamsObject(propertyOfInterest, pathToPropertyValue, notFoundMessage);

  let last_try:string|null = determineValue(params, true);

  return last_try;

}


function get_current_entity_if_loaded(speakUp: boolean): Object|null  {
  let current_entity: Object|null = get_entity_content();
  if (current_entity === null) {
    if (speakUp) {
      alert("No entity loaded. Please load an entity before you try to go to a neighbouring one.")
    }
    return null;
  }
  return current_entity
}


function determineValue(params: ParamsObject, speakUp: boolean): string|null {
  let current_entity: Object|null = get_current_entity_if_loaded(speakUp);
  if (current_entity === null) {
    return null;
  }

  if (! current_entity.hasOwnProperty(params.propertyOfInterest)) {
    if (params.notFoundMessage != null) {
      alert(params.notFoundMessage);
    }
    return null;
  }
  
  try {
    let param_content: string = current_entity[params.pathToPropertyValue[0]];
    let nested_depth: number = params.pathToPropertyValue.length;
    let counter: number = 1;
    while (counter < nested_depth) {
      param_content = param_content[params.pathToPropertyValue[counter]];
      counter++;
    }
    return param_content;
  }
  catch (error ){
    found_error(error);
    return null;
  }
}


function exclude_current_entity_from_list(found_entities: Array<Object>): Array<Object> {
  let current_entity = get_entity_content();
  if (current_entity === null) {
    return found_entities;
  }
  let current_entity_id = current_entity["id"];
  let remaining_entities = new Array;
  for (let i = 0; i<found_entities.length; i++) {
    if (found_entities[i]["id"] != current_entity_id) {
      remaining_entities.push(found_entities[i]);
    }
  }
  return remaining_entities;
}

function found_error(err) {
  console.log("error in finder_functions");
  console.log(err);
}

export {
  findByTime, findByLocation, findByReferenceUp, findByReferenceDown
}