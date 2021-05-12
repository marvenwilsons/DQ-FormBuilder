<template>
    <main class="fullwidth" >
        <input 
            class="fullwidth padleft050 padInp" style="outline:none;" type="text"
            @focus="$emit('focus'), showMenu = true"
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
                    zIndex: 901,
                    maxHeight:'200px',
                    overflowY:'auto'
                }"
                v-if="showMenu" >
                <div @click="assignValue(item)" :id="currentUid+index" class="fullwidth pad050 listItem pointer" v-for="(item,index) in filteredOptions" :key="index * 4 + item + uid()" >
                    {{item}}
                </div>
            </section>
        </transition>
    </main>
</template>

<script>
import ListComp from './list-comp'
import SvgClose from './_svg-close-circle-outline'
import m from './_mixin'
export default {
    props: ['appearance','appendText','defaultValue','options'],
    mixins: [m],
    components: {ListComp,SvgClose},
    data:() => ({
        val: undefined,
        showMenu: true,
        filteredOptions: [],
    }),
    watch: {
        val(n) {
            this.filteredOptions = this.options
            this.filteredOptions = this.filteredOptions.filter((e) => {
                return e.includes(n)
            })
        }
    },
    methods: {
        assignValue(item) {
            this.val = item
            this.showMenu = false
        },
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