<template>
    <main>
        <span v-if="el.fieldLabel" class="inpLabel" >
            <strong>{{el.fieldLabel}}</strong>
        </span>
        <section class="margintop050" >
            <div :style="{boxShadow: focus ? `0 0 5pt 1pt ${activeOutlineColor}` : '', transition: '0.3s',background: '' }" 
                :class="['fullwidth borderRad4 flex flexcenter relative', el.fieldError ? 'borderred' : 'borderGray']" 
            >
                <slot name="wrapper" :setFucos="setFucos" ></slot>
                <!-- loading -->
                <div :style="{background:'rgba(220, 220, 220, 0.76)', zIndex: '900'}" class="absolute fullwidth fullheight-percent borderRad4 flex flexend" >
                    <!-- loader -->
                    <div :style="{background:''}" class="padleft050 padright050" >
                        <div class="flex flexcenter fullheight-percent" >
                            <div class="loader">
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="gray" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span>
                <p v-if="el.fieldDetails && !el.fieldError" class="padleft050 padtop025 err field-p" :style="{}" >
                    {{el.fieldDetails}}
                </p>
                <p v-if="el.fieldError" class="padleft050 padtop025 err field-p flex flexstart" :style="{color: 'red'}" >
                    <svg fill="red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15" height="15" viewBox="0 0 24 24"><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" /></svg>
                    <span class="marginleft025" >
                        {{el.fieldError}}
                    </span>
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

<style>
.loader {
  -webkit-animation: spin 500ms linear infinite; /* Safari */
  animation: spin 500ms linear infinite;
  border-radius: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>