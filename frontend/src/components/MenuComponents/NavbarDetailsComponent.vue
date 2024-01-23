<script setup lang="ts">
    import { computed } from "vue";
    import { NavbarDetails } from '../../classes/NavbarDetailsComponentType'
    const props = defineProps({
        details: {
            type: NavbarDetails,
            default: new NavbarDetails()
        }
    })
    const image_src = computed(() => {
        if (!props.details) {
            return "";
        }
        return `./${props.details.image_path}`
    })
</script>

<template>
    <h6 v-if="details.heading">{{ details.heading }}</h6>
    <div>
        <div v-if="details.description" v-html="details.description"/>
        <div>
            <a v-bind:href="details.image_link">
                <div class="navbar-center-image">
                    <img v-bind:src="image_src" class="navbar-image"/>
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>
    div :deep() div>img.navbar-image {
        max-width: 200px;
        max-height: 200px;
        cursor: pointer;
    }
    
    div :deep() div.navbar-center-image {
        text-align: center;
    }

</style>