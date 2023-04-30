<template>
    <div class="title-box" >
        <title class="title">{{ titleText }}</title>
    </div>
</template>

<script>
    export default{
        name: 'Title',
        props:{
            titleText: String
        }
    };
</script>

<style scoped>
    .title-box {
        height: 75px;
        width: 800px;
        background-color: rgb(110, 202, 233);
        border-bottom: 1px solid #ddd;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 10px;
        border-radius: 5px;
    }
    .title {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>