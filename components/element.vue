<template>
    <div v-if="hideStatus == false" 
        :class="[...appearanceProperties.fieldElementClasses, '']" 
        :style="{...appearanceProperties.fieldElementCss}"
      > 
       <!-- Custom -->
        <div
            v-if="elementProperty.fieldtype == 'custom'"
            :is="elementProperty.name"
            :style="{background:bgColor}"
            :id="myId"
            :class="classes"
            :props="elementProperty.props"
        >
        </div>
        <!-- String -->
        <section class="padbottom125" v-if="elementProperty.fieldtype == 'string'" >
            <MyInputWrapper :el="elementProperty"  >
                <template #wrapper="{setFucos}" >
                    <input
                        v-model="inputValue"
                        :class="[classes, 'fullwidth padInp']"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)" 
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- Password -->
        <section class="padbottom125" v-if="elementProperty.fieldtype == 'password'" >
            <MyInputWrapper :el="elementProperty"  >
                <template #wrapper="{setFucos}" >
                    <input
                        v-model="inputValue"
                        :class="[classes, 'fullwidth padInp']"
                        type="password"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)" 
                    />
                </template>
            </MyInputWrapper>
        </section>        
        <!-- textarea -->
        <section class="padbottom125" v-if="elementProperty.fieldtype == 'textarea'" >
            <MyInputWrapper :el="elementProperty" >
                <template #wrapper="{setFucos}" >
                    <textarea
                        v-model="inputValue"
                        :style="{minHeight:'150px'}"
                        :class="[classes, 'fullwidth padInp']"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- number -->
        <section class=" padbottom125" v-if="elementProperty.fieldtype == 'number'" >
            <MyInputWrapper :el="elementProperty" >
                <template #wrapper="{setFucos}" >
                    <MyNumber
                        :class="[classes, 'fullwidth padInp borderRad4']"
                        :appendText="elementProperty.appendText"
                        :appearance="{
                            activeOutlineColor: activeOutlineColor
                        }"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)"
                        @change="(v) => inputValue = v"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- range slider
            TODO:
                1. min and max is static, make it bind
         -->
        <section v-if="elementProperty.fieldtype == 'range'">
            <MyInputWrapper :el="elementProperty" >
                <template #wrapper="{setFucos}" >
                    <RangeSlider 
                        :min="dataSet && dataSet.min ? dataSet.min : 20"
                        :max="dataSet && dataSet.max ? dataSet.max : 100"
                        @change="(value) => inputValue = value"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- switch -->
        <section v-if="elementProperty.fieldtype == 'switch'" >
            <MySwitch 
                :error-messages="errorMsg"
                :loading="loadingStatus"
                :style="{background:bgColor}"
                :id="myId"
                :class="[classes, 'fullwidth padtop025 padbottom025 borderRad4']"
                :disabled="disableStatus"
                :label="elementProperty.fieldLabel"
                @change="(value) => inputValue = value"
            />
            <span>
                <p class="padtop050 err field-p" >
                    {{errorMsg ? errorMsg : elementProperty.fieldDetails}}
                </p>
            </span>
        </section>        
        <!-- select -->
        <section class="padbottom125" v-if="elementProperty.fieldtype == 'select'" >
            <MyInputWrapper :el="elementProperty" >
                <template #wrapper="{setFucos}" >
                    <MySelect
                        :label="elementProperty.fieldLabel"
                        :mode="'single'"
                        :style="{background:bgColor}"
                        :class="classes"
                        :defaultValue="elementProperty.defaultValue"
                        :options="elementProperty.dataSet"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)"
                    ></MySelect>
                </template>
            </MyInputWrapper>
        </section>
        <!-- multiselect -->
        <section class="padbottom125" v-if="elementProperty.fieldtype == 'multiselect'" >
            <MyInputWrapper :el="elementProperty" >
                <template #wrapper="{setFucos}" >
                    <MySelect
                        :label="elementProperty.fieldLabel"
                        :mode="'multi'"
                        :style="{background:bgColor}"
                        :class="classes"
                        :defaultValue="elementProperty.defaultValue"
                        :options="elementProperty.dataSet"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false)"
                    ></MySelect>
                </template>
            </MyInputWrapper>
        </section>
        <!-- autocomplete -->
        <!-- autocomplete countries -->
        <!-- CheckBox -->
        <!-- Radio -->
    </div>
</template>

<script>
import RangeSlider from './range-slider'
import MySwitch from './switch'
import MySelect from './select'
import MyNumber from './number'
import MyInputWrapper from './input-wrapper'
export default {
    components: {RangeSlider, MySwitch, MySelect, MyNumber,MyInputWrapper},
    props: ['elementProperty','appearanceProperties','formMethods','hostMethods',],
    data: () => ({
        activeOutlineColor: '#cbd7e4',

        inputValue: undefined,
        dataSet: undefined,
        args: undefined,
        errorMsg: undefined,
        hideStatus: false,
        classes: [],
        disableStatus: false,
        loadingStatus: false,
        bgColor: undefined,
        fieldDetails: undefined,
        myId: undefined,
        elementLabel: undefined
    }),
    mounted() {
        this.elementLabel = this.elementProperty.fieldLabel
        this.inputValue = this.elementProperty.defaultValue
        this.dataSet = this.elementProperty.dataSet
        this.classes.push('dq-input-fontsize')

        this.args = {
            element: {
                hide: this.hide,
                show: this.show,
                addClass: this.addClass,
                removeClass: this.removeClass,
                disable: this.disable,
                setBackgroundColor: this.setBackgroundColor,
                showLoading: this.showLoading,
                setFieldDetails: this.setFieldDetails,
                setFieldId: this.setFieldId,
                error: this.error,
                removeError: this.removeError,
                value: this.inputValue
            },
            schema: {

            },
            prevInput: '',
            error: ''
        }

        for(let key in this.args.element) {
            this.formMethods[this.elementProperty.fieldLabel][key] = this.args.element[key]
        }

        this.$emit('fieldItems', this.formMethods)

        this.elementProperty.onLoad(this.args.element,this.formMethods,this.error)
    },
    watch: {
        inputValue: {
            handler(val) {
                this.args.element.value = val
                for(let key in this.args.element) {
                    this.formMethods[this.elementProperty.fieldLabel][key] = this.args.element[key]
                }
                this.elementProperty.onInput(this.args.element,this.formMethods,this.error)
            },
            deep: true
        }
    },
    methods: {
        error(ErrMSg) {
            this.errorMsg = ErrMSg
            const fieldLabel = this.elementProperty.fieldLabel
            const group = this.elementProperty.group
            if(this.formMethods[group]) {
                this.formMethods[group].map(e => {
                    if(e.fieldLabel == fieldLabel) {
                        e.hasError = true
                    }
                })
            }
        },
        removeError() {
            this.errorMsg = undefined
            const fieldLabel = this.elementProperty.fieldLabel
            const group = this.elementProperty.group
            if(this.formMethods[group]) {
                this.formMethods[group].map(e => {
                    if(e.fieldLabel == fieldLabel) {
                        e.hasError = false
                    }
                })
            }
            
        },
        hide() {
            this.hideStatus = true
            this.$emit('onHide',this.elementProperty.fieldLabel)
        },
        show() {
            this.hideStatus = false
            this.$emit('onShow',this.elementProperty.fieldLabel)
        },
        addClass(ArrayOfClasses) {
            if(typeof ArrayOfClasses == 'string') {
                this.classes.push(ArrayOfClasses)
            } else if(Array.isArray(ArrayOfClasses)) {
                ArrayOfClasses.map(e => {
                    this.classes.push(e)
                })
            }
        },
        removeClass(NameOfClass) {
            this.classes = this.classes.filter(e => {
                if(e != NameOfClass) {
                    return e
                }
            })
        },
        disable(isDisable) {
            this.disableStatus = isDisable
        },
        setBackgroundColor(ColorName) {
            this.bgColor = ColorName
        },
        showLoading(Arg) {
            this.loadingStatus = Arg
            this.disable(Arg)
        },
        setFieldDetails(Details) {
            this.fieldDetails = Details
        },
        setFieldId(Id) {
            this.myId = Id
        }
    }
}
</script>

<style>
.v-input--reverse .v-input__slot {
	 flex-direction: row-reverse;
	 justify-content: flex-end;
}
 .v-application--is-ltr .v-input--reverse .v-input__slot .v-input--selection-controls__input {
	 margin-right: 0;
	 margin-left: 8px;
}
 .v-application--is-rtl .v-input--reverse .v-input__slot .v-input--selection-controls__input {
	 margin-left: 0;
	 margin-right: 8px;
}
 .v-input--expand .v-input__slot .v-label {
	 display: block;
	 flex: 1;
}

.dq-input-fontsize, .v-label{
    font-size: 13px !important;
}
.defaultBorder{
    border: 1px solid rgba(51, 51, 51, 0.582);
}

.field-p{
    font-size: 11px;
    color: #333;
    margin: 0;
}
.borderGray{
    border: 1px solid lightgray;
}
.inpLabel {
    color: #3c4257 !important;
    font-weight: 400;
}
 </style>
```