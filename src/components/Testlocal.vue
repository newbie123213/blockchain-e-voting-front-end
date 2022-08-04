<template>
  <button @click="check">click on me</button>
</template>

<script>
// import store from 'store'
var store = require('store')
export default {
    methods: {
        check() {
            store.set('user', { name:'Marcus' })
store.get('user').name == 'Marcus'
        }
    
}
}
</script>

<style>

</style>