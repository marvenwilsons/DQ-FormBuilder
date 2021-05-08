<template>
    <div class="fullwidth flex" >
        <div v-if="appendText" class="fullheight-percent flex flexcenter padleft050" >
            {{appendText}}
        </div>
        <input 
            class="fullwidth padleft050" type="number"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
            v-model="val"
            @change="$emit('change',val)"
        />
    </div>
</template>

<script>
export default {
    props: ['appearance','appendText','defaultValue'],
    data:() => ({
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