export function useAPI() {

    async function get_entities(endpoint: string, search_params: URLSearchParams|null): Promise<Array<Object>> {
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        }
        var internal_api_call = "api/" + endpoint
        if (search_params != null) {
            internal_api_call += "?" + search_params;
        } 
        return fetch(internal_api_call, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .catch(found_error);
    }
    
    function found_error(err) {
        console.log("error in useAPI");
        console.log(err);
    }

    return {get_entities}
}