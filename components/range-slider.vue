<template>
    <main :style="{padding:'0', boxShadow: showSlider ? `0 0 5pt 1pt ${appearance.activeOutlineColor}` : ''}" 
    class="flex flexcol borderRad4 relative borderGray">
        <div @click="setRange" class="padleft050 pad050 flex spacebetween borderRad4 flexcenter pointer" >
            <div>
                <span style="color: gray" >{{label}}:</span> 
                {{currentValue}}
            </div>
            <div > <ard ref="ard" :state="showSlider" :show="setRange" /> </div>
        </div>
        <transition name="fade">
            <div 
                v-if="showSlider"
                :style="{background: 'white', boxShadow: '-1px 4px 9px 0px rgba(187,187,187,1)', top: '104%', zIndex: '0' }" 
                class="absolute flex pad050 fullwidth borderRad4"
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
                        @blur="blur"
                    >
                    <span class="marginleft025" >
                        <small>{{max}}</small>
                    </span>
                </div>
            </div>
        </transition>
    </main>
</template>

<script>
import ard from './ard.vue'
export default {
    props: ['min','max','label', 'appearance'],
    components: {ard},
    data: () => ({
        currentValue: 0,
        pointPos: undefined,
        mousePos: undefined,
        showSlider: false,
        uid: undefined
    }),
    watch: {
        currentValue() {
            this.$emit('change',this.currentValue)
        },
        showSlider() {
            if(this.showSlider) {
                setTimeout(() => {
                    const rangeSlider = document.getElementById('rangeSlider')
                    rangeSlider.focus()
                },0)
            }
        }
    },
    methods: {
        setSliderVisibility(v) {
            this.showSlider = v
        },
        blur() {
            this.$refs.ard.setStatus(false)
        },
        setRange() {
            this.showSlider = !this.showSlider
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 100ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>