<template>
    <div :style="{boxShadow: focus ? `0 0 5pt 1pt ${activeOutlineColor}` : ''}" class="fullwidth borderRad4 borderGray flex flexcenter" >
        <slot name="wrapper" :setFucos="setFucos" ></slot>
    </div>
</template>

<script>
export default {
    data: () => ({
        focus: false,
        activeOutlineColor: undefined
    }),
    methods: {
        setFucos(state,color) {
            
            this.focus = state
            
            if(state) {
                this.activeOutlineColor = color
            } else {
                this.activeOutlineColor = undefined
            }
        }
    }
}
</script>