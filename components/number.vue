<template>
    <div :style="{boxShadow: isFucos ? `0 0 5pt 1pt ${appearance.activeOutlineColor}` : ''}"  
        class="borderGray fullwidth flex" >
        <div v-if="appendText" class="fullheight-percent flex flexcenter padleft050" >
            {{appendText}}
        </div>
        <input 
            class="fullwidth padleft050" type="number"
            @focus="isFucos = true"
            @blur="isFucos = false"
            v-model="val"
            @change="$emit('change',val)"
        />
    </div>
</template>

<script>
export default {
    props: ['appearance','appendText','defaultValue'],
    data:() => ({
        isFucos: false,
        val: undefined
    }),
    created() {
        if(this.defaultValue != undefined) {
            this.val = this.defaultValue
        } else {
            this.val = 0
        }
    }
}
</script>