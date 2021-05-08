<template>
    <main>
        <span v-if="el.fieldLabel" class="inpLabel" >
            <strong>{{el.fieldLabel}}</strong>
        </span>
        <section class="margintop050" >
            <div :style="{boxShadow: focus ? `0 0 5pt 1pt ${activeOutlineColor}` : '', transition: '0.3s'}" class="fullwidth borderRad4 borderGray flex flexcenter" >
                <slot name="wrapper" :setFucos="setFucos" ></slot>
            </div>
            <span>
                <p class="padleft050 padtop025 err field-p" :style="{}" >
                    <!-- {{errorMsg ? errorMsg : elementProperty.fieldDetails}} -->
                    test
                </p>
            </span>
        </section>
    </main>
</template>

<script>
export default {
    props: ['el'],
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