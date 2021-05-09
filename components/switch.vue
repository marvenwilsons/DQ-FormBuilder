<template>
    <main class="flex spacebetween" >
        <div class="" >
            <strong>{{label}}</strong>
        </div>
        <div @click="state = !state"  class="flex flexend relative pointer" >
            <div id="fm-switch-container" 
                :style="{background: state ? '#5a8ab9' : 'white', color: 'white'}" 
                :class="['relative flex', state ? 'flexend' : '']" >
                <div class="fullheight-percent pad050 pointer relative flex flexcenter" id="fm-switch" >
                    <!-- <span v-if="state" :style="{left:'-16px'}" class="absolute" >on</span> -->
                    <!-- <span v-if="state == false" style="left:20px;" class="absolute" >off</span> -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: ['label','value'],
    data: () => ({
        state: false
    }),
    watch: {
        state() {
            this.$emit('change',this.state)
        }
    },
    mounted() {
        if(this.value) {
            this.state = this.value
        }
    }
}
</script>

<style>
#fm-switch-container {
    max-width: 45px;
    border-radius: 999px;
    padding: 2px;
    -webkit-box-shadow: inset 0px 0px 30px -17px rgba(0,0,0,0.75);
    -moz-box-shadow: inset 0px 0px 30px -17px rgba(0,0,0,0.75);
    box-shadow: inset 0px 0px 30px -17px rgba(0,0,0,0.75);
    border: 1px solid rgba(211, 211, 211, 0.425);
    transition: 0.3s;
}
#fm-switch {
    max-width: 15px;
    border-radius: 999px;
    height: 100% !important;
    background: white;
}
</style>