<template>
    <div class="" >
        <div 
            v-for="(item, item_idex) in fieldItems" 
            :key="item_idex" >
            <div class="flex flexcol">
                <el 
                    ref="el"
                    :elementProperty="item"
                    :formMethods="formMethods"
                    :appearanceProperties="appearanceProperties"
                />
            </div>
        </div>
        <div class="padleft050 padright050 padtop125 padbottom125 flex flexend" >
            <button class="dq-button fullwidth pad050" style="background: #5a8ab9; color: white; boxShadow: -1px 4px 9px 0px rgba(187,187,187,1);" >
                Submit
            </button>
        </div>
    </div>
</template>

<script>
import element from '../components/element'
export default {
    props: ['behaviorProperties','fieldItems','appearanceProperties','formMethods'],
    components: {
        el: element
    },
    data: () => ({
        isLoading: false
    }),
    methods: {
        setLoading(arg) {
            this.isLoading = arg
        },
        getElementValue() {
            let o = {}

            this.$refs.el.map(e => {
                o[e._data.elementLabel] = e._data.inputValue
            })

            this.$emit('onSubmit',{
                data: o,
                formMethods: this.formMethods,
                submitMethods: {
                    setLoading: this.setLoading
                }
            })
        }
    }
}
</script>