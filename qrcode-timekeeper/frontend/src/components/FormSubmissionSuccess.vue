<script setup>
import NavBar from "./NavBar.vue";

defineProps({
    msg: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <NavBar />
    <div class="greetings">
        <h1 class="green">Success</h1>
        <div class="icon_square">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <div>
            <h3>{{ msg }}</h3>
        </div>
        <a class="btn btn-primary" href="/" role="button">Home</a>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 4rem;
}

h3 {
    font-size: 2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

.icon_square {
    height: 20vw;
    width: 65vw;
    margin: 0 auto;
    margin-top: 5vh;
    margin-bottom: 5vh;
}

.icon_square svg {
    color: green;
    width: 100%;
    height: 100%;
}

a[class="btn btn-primary"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    margin-top: 30px;
    margin-bottom: -30px;
}

@media (max-width: 700px) {

    h1 {
        margin-top: -50px;
        font-size: 2.6rem;
    }

    h3 {
        font-size: 1.3rem;
    }

    .icon_square {
        height: 65vw;
        width: 65vw;
        margin: 0 auto;
        margin-top: 5vh;
        margin-bottom: 5vh;
        /* margin-right: 5vh; */
    }

    .icon_square svg {
        color: green;
        width: 100%;
        height: 100%;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    a[class="btn btn-primary"] {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }
}
</style>
