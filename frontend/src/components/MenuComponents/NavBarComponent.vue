<script>
    import {find_available_entity_types } from '../../functions/navbar_functions.ts';
    import { is_empty } from '../../functions/helper_functions.ts';
    import NavbarDetailsComponent from './NavbarDetailsComponent.vue';
    import { NavbarDetails } from '../../classes/NavbarDetailsComponentType';
    import { useEntityComponentData } from '../../functions/composables/EntityComponentData';

    
    export default {
        data() {
            return {
                available_entity_types: [],
                // this doesn't look so nice here in the middle of the code - but on the other hand we can re-use the same details component and only care about styling once
                salted_details : new NavbarDetails("This is brought to you by SALTED project", 
                '<b>S</b>ituation-<b>A</b>ware <b>L</b>inked he<b>T</b>erogeneous <b>E</b>nriched <b>D</b>ata<br>Find our code on our <a href="https://github.com/SALTED-Project">GithHub page</a>.',
                "salted-logo-95x128-1.png", "https://salted-project.eu"),
                fiware_details : new NavbarDetails("Meet NGSI-LD", 
                '<a href="https://ngsi-ld-tutorials.readthedocs.io/en/latest/">NGSI-LD Tutorial</a><br>brought to you by FIWARE<br>',
                "Logo_FIWARE.svg", "https://www.fiware.org"),
                kybeidos_details : new NavbarDetails("", 
                'invented and implemented by',
                "kyb_logo.png", "https://www.kybeidos.de"),
            };
        },
        setup() {
            const { get_selected_entity_type, set_selected_entity_type, reset_state, get_selected_entity_type_shortened } = useEntityComponentData();
            return { get_selected_entity_type, set_selected_entity_type, reset_state, get_selected_entity_type_shortened };
        },
        async created() {
            this.find_available_entity_types();
        },
        methods: {
            find_available_entity_types
        },
        computed: {
            selected_entity_type: {
                get() { return this.get_selected_entity_type() },
                set(value) { 
                    this.reset_state(); 
                    this.set_selected_entity_type(value);
                }
            }
        },
        watch: {
            available_entity_types(newValue) {
                if (is_empty(newValue)) {
                    console.warn("available_entity_types changed into empty value!");
                }
            }
        },
        components: { NavbarDetailsComponent }
    }
    </script>

<template>
    <div id="navbar-wrapper" class="full-size">
        <div id="navbar-header-wrapper">
            <h1> 
                <b>
                    Welcome to<br>
                    LD-Xplorer!
                </b>
            </h1>
            <div>
                Dive into the world of<br>Linked Data (NGSI-LD)
            </div>
        </div>
        <div id="navbar-body-wrapper">
            <div id="navbar-selection-wrapper">
                <h4>
                    Choose your settings here:
                </h4>
                Select the entity type you want to start with:
                <select v-model="selected_entity_type">
                    <option v-for="entity_type in this.available_entity_types" :value="entity_type">
                        {{get_selected_entity_type_shortened(entity_type)}}
                    </option>
                </select>
            </div>
            <hr/>
            <div id="navbar-explanation-wrapper">
                <NavbarDetailsComponent v-bind:details="fiware_details"/>
            </div>
            <hr/>
            <div id="navbar-project-wrapper">
                <NavbarDetailsComponent v-bind:details="salted_details"/>
            </div>
            <hr/>
            <div id="navbar-company-wrapper">
                <NavbarDetailsComponent v-bind:details="kybeidos_details"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #navbar-wrapper {
        background-color: var(--kyb-purple-2);
        padding: 10px;
    }

    #navbar-header-wrapper {
        text-align: center;
    }
    
    #navbar-body-wrapper {
        background-color: var(--kyb-purple-1);
        opacity: 0.5;

    }

    #navbar-wrapper div {
        padding: 5px;
    }

</style>
