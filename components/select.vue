<template>
    <main class="flex flexcol borderRad4 relative">
        <!--  -->
        <section style="min-height:40px;" @click="toggle" class="padleft050 padtop025 padright050 flex spacebetween borderRad4 flexcenter pointer" >
            <div class="flex flexwrap" >
                <!-- Displays the current selected options -->
                <div 
                v-for="(itemSeleceted,index) in currentValue" :key="`${itemSeleceted}--${index * 4}`" 
                class="DM_itemSelected padleft050 padright025 padtop025 padbottom025 marginleft025 marginbottom025" >
                    <div class="flex flexcenter" >
                        <span class="marginright025" >{{itemSeleceted}}</span>
                        <span @click.stop="itemSelected(itemSeleceted)" class="flex flexcenter" >
                            <SvgClose  ></SvgClose>
                        </span>
                    </div>
                </div>
            </div>

            <div> 
                <!-- The arrow down icon--> <ard ref="ard" :state="showMenu" :show="toggleDropDown"  /> 
            </div>
        </section>
        <!-- dropdown section -->
        <transition name="fade" >
            <section 
                class="absolute flex fullwidth borderRad4"
                :style="{
                    top:'105%',background: 'white', 
                    boxShadow: '-1px 4px 9px 0px rgba(187,187,187,1)',
                    zIndex: 100
                }"
                v-if="showMenu" >
                <ListComp
                    @itemSelected="itemSelected" 
                    :list="options"
                    :selected="currentValue"
                ></ListComp>
            </section>
        </transition>
    </main>
</template>

<script>
import ard from './ard'
import ListComp from './list-comp'
import SvgClose from './_svg-close-circle-outline'

export default {
    props: ['options','label','mode','defaultValue'],
    components: {ard,ListComp, SvgClose},
    data: () => ({
        currentValue: [],
        showMenu: false
    }),
    watch: {
        showMenu(n) {
            if(n) {
                this.$emit('focus')
            } else {
                this.$emit('blur')
            }
        }
    },
    methods: {
        toggleDropDown(v) {
            this.showMenu = v
        },
        toggle() {
            this.showMenu = !this.showMenu
        },
        itemSelected(e) {
            this.showMenu = false

            if(this.currentValue.includes(e)) {
                this.currentValue.splice(this.currentValue.indexOf(e),1)
            } else {
                if(this.mode == 'multi') {
                    this.currentValue.push(e)
                } else {
                    this.currentValue = []
                    this.currentValue.push(e)
                }
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.defaultValue.map(e => {
                this.currentValue.push(e.text)
            })
        },0)
    }
}
</script>

<style>
.DM_itemSelected {
    background: #cbd7e4;
    border-radius: 999px;
    z-index: 99;
}
.DM_itemSelected:hover {
    background: #cbd7e4cb;
    transition: 0.9s;
}
</style>