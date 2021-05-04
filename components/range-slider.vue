<template>
    <main style="padding:0;" class="flex flexcol borderRad4 relative">
        <div style="border:1px solid gray;" class="pad050 flex spacebetween borderRad4 flexcenter" >
            <div>
                <span style="color: gray" >{{label}}:</span> 
                {{currentValue}}
            </div>
            <div > <ard :show="setSliderVisibility" /> </div>
        </div>
        <div 
            v-if="showSlider"
            :style="{background: 'white', boxShadow: '-1px 4px 9px 0px rgba(187,187,187,1)', top: '100%', zIndex:'100'}" 
            class="absolute flex pad050 fullwidth borderRad4"
            id="rsp" 
        >
            <div class="fullwidth flex pad025" >
                <span class="marginright025" >
                    <small>{{min}}</small>
                </span>
                <input
                    style="z-index: 2" 
                    v-model="currentValue" 
                    id="rangeSlider" 
                    class="margintop050 marginbottom025 fullwidth" 
                    type="range" 
                    :min="min" 
                    :max="max"
                >
                <span class="marginleft025" >
                    <small>{{max}}</small>
                </span>
            </div>
        </div>
    </main>
</template>

<script>
import ard from './ard.vue'
export default {
    props: ['min','max','label'],
    components: {ard},
    data: () => ({
        currentValue: 0,
        pointPos: undefined,
        mousePos: undefined,
        showSlider: false
    }),
    watch: {
        currentValue() {
            this.$emit('change',this.currentValue)
        }
    },
    methods: {
        setSliderVisibility(v) {
            this.showSlider = v
        }
    }
}
</script>

<style>
#rangePoint {
    height: 20px;
    z-index: 5;
}
#rangeLine {
    border: 1px solid rgba(51, 51, 51, 0.459);
    height: 5px;
}
#rangeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
    background: #5a8ab9;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    cursor: pointer;
}
#rangeSlider{
  -webkit-appearance: none;
  height: 1px; 
  border: 1px solid #5a8ab9;
  border-radius: 999px;
  background: #d3d3d334; 
}
#rsp{
    -webkit-box-shadow: 0px 0px 68px -28px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 68px -28px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 68px -28px rgba(0,0,0,0.75);
}
</style>