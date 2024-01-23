import got from "got";

import CONFIG from '../config_files/config.json' assert {type: 'json'};

class TokenHandler {

    #token;
    #token_endpoint;
    #headers;
    #token_expiry_time;
    #token_type;


    constructor() {
        this.#token_expiry_time = 0;
        this.#token = "";
        this.#headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        this.#token_endpoint = CONFIG.keycloak_url;
        this.#token_type = "";
    }

    #update_token() {
        if (this.#token_expiry_time > new Date().getUTCDate()) {
            return;
        }
        try {
            return got.post(this.#token_endpoint, {
                headers: this.#headers,
                form: {
                    'grant_type': 'client_credentials',
                    'client_id': CONFIG.keycloak_client_id,
                    'client_secret': CONFIG.keycloak_secret,
                    'scope': 'salted'
                }
            }).json();
        }
        
        catch (error) {
            console.log("Error occurred when querying for token.");
        }
        
    }
    
    get_token() {
        return this.#update_token().then( json => { 
            console.log("Token acquired");
            this.#token = json["access_token"];
            this.#token_type = json["token_type"]
            return [this.#token, this.#token_type];
        });
    }

}

export { TokenHandler as default }