<template>
    <main class="flex flexcol">
        <div class="marginleft050" >
            <small>{{label}}: {{currentValue}}</small>
        </div>
        <div class="relative flex pad050" >
            <span class="marginright025" >{{min}}</span>
            <input
                style="z-index: 2" 
                v-model="currentValue" 
                id="rangeSlider" 
                class="margintop050 marginbottom025 fullwidth" 
                type="range" 
                :min="min" 
                :max="max"
            >
            <span class="marginleft025" >{{max}}</span>
        </div>
        
    </main>
</template>

<script>
export default {
    props: ['min','max','label'],
    data: () => ({
        currentValue: 0,
        pointPos: undefined,
        mousePos: undefined
    }),
    watch: {
        currentValue() {
            this.$emit('change',this.currentValue)
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
    height: 20px;
    width: 20px;
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