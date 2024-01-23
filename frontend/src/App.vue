<script>
    import EntityComponent from './components/EntityComponents/EntityComponent.vue';
    import EntityConnectorArrow from './components/EntityConnectors/EntityConnectorArrow.vue';
    import NavBarComponent from './components/MenuComponents/NavBarComponent.vue';

    import {findByLocation, findByReferenceUp, findByReferenceDown, findByTime} from './functions/finder_functions.ts';

    export default {
      components: {
        EntityComponent, EntityConnectorArrow, NavBarComponent
      },
      methods: {
        findByTime,
        findByLocation, 
        findByReferenceUp, 
        findByReferenceDown,
      }

    }
</script>

<template>
  <b-container fluid class="full-size no-padding">
    <b-row align-v="center" class="full-size">
      <b-col xl="2" class="col-100h  no-padding">
        <NavBarComponent class="full-size"/>
      </b-col>
      <b-col xl="10" class="col-100h no-padding">
        <b-container fluid class="full-size no-padding">
          <b-row align-v="center" align-h="center" id="app-first-row">
            <b-col class="full-size"></b-col>
            <b-col class="full-size">
              <EntityConnectorArrow v-bind:arrow_up=true v-on:click="findByReferenceUp"/>
            </b-col>
            <b-col class="full-size"></b-col>
          </b-row>
          <b-row align-v="center" align-h="center" id="app-second-row">
            <b-col cols="2" class="full-height">
              <EntityConnectorArrow v-bind:arrow_left=true v-on:click="findByLocation"/>
            </b-col>
            <b-col cols="8" class="full-height">
              <EntityComponent/>
            </b-col>
            <b-col cols="2" class="full-height">
              <EntityConnectorArrow v-bind:arrow_right=true v-on:click="findByTime"/>
            </b-col>
          </b-row>
          <b-row align-v="center" align-h="center" id="app-third-row">
            <b-col class="full-size"></b-col>
            <b-col class="full-size">
              <EntityConnectorArrow v-bind:arrow_down=true v-on:click="findByReferenceDown"/>
            </b-col>
            <b-col class="full-size"></b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>

  #app-first-row, #app-third-row {
    height: 25%;
    width: 100%;
  }
  
  #app-second-row {
    height: 50%;
    width: 100%;
  }

</style>
