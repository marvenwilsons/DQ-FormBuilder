<template>
    <main class="fullwidth" >
        <input 
            class="fullwidth padleft050 padInp" style="outline:none;" type="text"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
            v-model="val"
            @change="$emit('change',val)"
        />
        <!-- dropdown section -->
        <transition name="fade" >
            <section 
                class="absolute flex fullwidth borderRad4 flexcol"
                :style="{
                    top:'105%',background: 'white', 
                    boxShadow: '-1px 4px 9px 0px rgba(187,187,187,1)',
                    zIndex: 100
                }"
                v-if="showMenu" >
                <div class="fullwidth pad050 listItem pointer" v-for="(item,index) in filteredOptions" :key="index * 4 + item" >
                    {{item}}
                </div>
            </section>
        </transition>
    </main>
</template>

<script>
import ListComp from './list-comp'
import SvgClose from './_svg-close-circle-outline'

export default {
    props: ['appearance','appendText','defaultValue','options'],
    components: {ListComp,SvgClose},
    data:() => ({
        val: undefined,
        showMenu: true,
        filteredOptions: []
    }),
    watch: {
        val(n) {
            if(!n) {
                this.showMenu = false
            } else {
                this.showMenu = true
            }

            this.filteredOptions = this.options
            this.filteredOptions = this.filteredOptions.filter((e) => {
                return e.includes(n)
            })
        }
    },
    methods: {
        itemSelected() {
            console.log('item selected')
        },
    },
    created() {
        if(this.defaultValue != undefined) {
            this.val = this.defaultValue
        } else {
            this.val = undefined
        }

        this.filteredOptions = this.options
        this.showMenu = false

    }
}
</script>