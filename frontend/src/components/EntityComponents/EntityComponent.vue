<script>
    import { useEntityComponentData } from '../../functions/composables/EntityComponentData';
    
    export default {
        setup() {
            const {
                is_entity_loaded, reset_state, get_random_entity, get_start_entity_by_type, get_entity_content, 
                get_selected_entity_type, get_selected_entity_type_shortened, is_smartdatamodel, get_start_entity_by_ID,
                set_start_ID, get_start_ID
            } = useEntityComponentData();
            return {
                is_entity_loaded, reset_state, get_random_entity, get_start_entity_by_type, get_entity_content, 
                get_selected_entity_type, get_selected_entity_type_shortened, is_smartdatamodel, get_start_entity_by_ID,
                set_start_ID, get_start_ID
            };
        },
        computed: {
            prettyPrinted() {
                try {
                    return JSON.stringify(this.get_entity_content(), null, 2);
                }
                catch (err) {
                    console.warn("value is not JSON");
                    return "no value available";
                }
            },
            start_ID: {
                get() { 
                    return this.get_start_ID() },
                set(value) { 
                    this.set_start_ID(value);
                }
            }
        },
    }
</script>


<template>
    <div class="entity-frame full-size">
        <h2 class="no-grow-please">
            Selected Entity Type is:<br>
            <b>{{ get_selected_entity_type_shortened(get_selected_entity_type()) }}</b>
        </h2>
        <a v-if="is_smartdatamodel(get_selected_entity_type())" target="_blank" title="Follow the link to see a description of the entity type's data model (works only for SmartDataModels)" v-bind:href=get_selected_entity_type()>{{ get_selected_entity_type() }}</a>
        <div v-else>
            {{ get_selected_entity_type() }}
        </div>
        <div v-show="is_entity_loaded()" class="entity-content flex-grow-please">
            <div class="content-wrapper flex-grow-please">
                <pre id="scrollbox">{{prettyPrinted}}</pre>
            </div>
            <br/>
            <button id="entity-btn-reset" @click="reset_state()" class="no-grow-please entity-btn">
                reset entity component
            </button>
        </div>
        <div v-show="!is_entity_loaded()" class="entity-getstarted flex-grow-please">
            <b-container fluid class="full-size no-padding">
                <b-row align-v="center" class="full-size">
                    <b-col xl="8" id="entity_content_box" class="col-100h">
                        <div id="entity-btn-getstarted-wrapper" class="flex-grow-please">
                            <button id="entity-btn-getstarted" @click="get_random_entity()" class="entity-btn">
                                Get started with a random entity!
                            </button>
                            <button id="entity-btn-getstarted2" @click="get_start_entity_by_type()" class="entity-btn">
                                Get an entity of your selected type!
                            </button>
                        </div>
                        <br/>
                        <div id="entity-input-getstarted" class="flex-grow-please">
                            <label >Get started with an entity you are interested in:</label>
                            <br>
                            <input type="text" v-model="start_ID" placeholder="Put an ID here"/>
                            <button id="entity-btn-getstarted3" @click="get_start_entity_by_ID(start_ID)" class="entity-btn">
                                Get your entity!
                            </button>
                        </div>
                    </b-col>
                    <b-col xl="4" id="explanation_box" class="col-100h">
                        <h4>This is how it works</h4>
                        First you need an entity to start with:
                        <ul>
                            <li>You can choose an entity type on the left and start with a random entity of this type.</li>
                            <li>You can get started by entering a specific entity ID into the search box.</li>
                            <li>Or you let yourself be surprised and start with a random entity.</li>
                        </ul>
                        Once you see your first entity, you can navigate through the World of Linked Data to explore connections, "LINKS", to other entities in the broker.
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<style scoped>
    .entity-frame {
        background-color: var(--kyb-blue-3);
        opacity: 70%;
        display: flex;
        flex-direction: column;
        padding-top: 5px;
        padding-left: 5px;
    }
    
    .entity-frame h2 {
        opacity: 20%;
    }
    
    .entity-content, .entity-getstarted {
        display: flex;
        flex-direction: column;
        min-height: 0;
    }
    
    .flex-grow-please {
        flex: 1 0 auto; /* grow, don't shrink */
    }
    
    .no-grow-please {
        flex: 0 0 auto; /* don't grow, only take up needed space!*/
    }

    .content-wrapper {
        position: relative;
        flex: 1;
    }

    #scrollbox {
        position: absolute;
        left: 0; top: 0; right: 0; bottom: 0; 
        overflow-y: auto;
        margin: 0;
    }

    .entity-btn {
        background-color: var(--kyb-blue-2);
    }

    #explanation_box {
        border: 6px solid var(--kyb-blue-2);
    }

    #entity_content_box {
        padding-top: 30px;
    }

</style>