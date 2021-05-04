<template>
    <main style="padding:0;" class="flex flexcol borderRad4 relative overflowhidden">
        <div style="border:1px solid gray;" class="pad050 flex spacebetween borderRad4 flexcenter" >
            <div>
                <span style="color: gray" >{{label}}:</span> 
                {{currentValue}}
            </div>
            <div > <ard :show="setSliderVisibility" /> </div>
        </div>
        <div 
            v-if="showSlider"
            :style="{background: 'whitesmoke'}" 
            class="relative flex pad050 " 
        >
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
</style>