<script>
    export default {
        props: {
            arrow_up: {
                type: Boolean,
                value: false
            },
            arrow_right:{
                type: Boolean,
                value: false
            },
            arrow_down: {
                type: Boolean,
                value: false
            },
            arrow_left: {
                type: Boolean,
                value: false
            }
        },
};

</script>

<template>
    <div id="arrow_wrapper" class="full-size">
        <img v-if="arrow_up"
            alt="this is an arrow up"
            src="../../assets/arrow_up.png"
            class="arrow-connector"
            title="Find referencing entities"
        />
        <img v-if="arrow_right"
            alt="this is an arrow right"
            src="../../assets/arrow_right.png"
            class="arrow-connector"
            title="Find near entities (temporal)"
        />
        <img v-if="arrow_down"
            alt="this is an arrow down"
            src="../../assets/arrow_down.png"
            class="arrow-connector"
            title="Find referenced entities"
        />
        <img v-if="arrow_left"
            alt="this is an arrow left"
            src="../../assets/arrow_left.png"
            class="arrow-connector"
            title="Find near entities (locational)"
        />
    </div>
</template>

<style scoped>
#arrow_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.arrow-connector {
    max-width: 25vh;
    max-height: 25vh;
}
.arrow-connector:hover {
    filter: brightness(50%);
}
</style>