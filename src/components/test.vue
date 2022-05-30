<template>
    <div class="container">
        <img :src="ptUrl" alt="no pic">
    </div>
</template>

<script>

export default {
    name: "test",
    data(){
        return {
            url: "http://localhost:8080/common/download",
        }
    },
    methods: {

    },
    computed: {
        ptUrl(){
            return this.url + "?name=97e67df1-16e0-4669-ae81-cf4db1625679.jpeg";
        }
    }
    
}
</script>

<style>

</style>