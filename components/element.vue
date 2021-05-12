<template>
    <main v-if="hideStatus == false" 
        :class="[...appearanceProperties.fieldElementClasses, '']" 
        :style="{...appearanceProperties.fieldElementCss}"
      > 
       <!-- Custom -->
        <section
            v-if="elementProperty.fieldtype == 'custom'"
            :is="elementProperty.name"
            :style="{background:bgColor}"
            :id="myId"
            :class="classes"
            :props="elementProperty.props"
        >
        </section>
        <!-- String -->
        <section class="padbottom125" v-if="fieldType == 'string'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}"  >
                <template #wrapper="{setFucos}" >
                    <input
                        v-model="inputValue"
                        :class="[classes, 'fullwidth padInp']"
                        :disabled="fieldLoading"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()" 
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- Password -->
        <section class="padbottom125" v-if="fieldType== 'password'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}"  >
                <template #wrapper="{setFucos}" >
                    <input
                        v-model="inputValue"
                        :class="[classes, 'fullwidth padInp']"
                        type="password"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()" 
                    />
                </template>
            </MyInputWrapper>
        </section>        
        <!-- textarea -->
        <section class="padbottom125" v-if="fieldType == 'textarea'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <textarea
                        v-model="inputValue"
                        :style="{minHeight:'150px'}"
                        :class="[classes, 'fullwidth padInp']"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- number -->
        <section class=" padbottom125" v-if="fieldType == 'number'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <MyNumber
                        :class="[classes, 'fullwidth padInp borderRad4']"
                        :appendText="elementProperty.appendText"
                        :appearance="{
                            activeOutlineColor: activeOutlineColor
                        }"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()"
                        @change="(v) => inputValue = v"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- range slider
            TODO:
                1. min and max is static, make it bind
         -->
        <section v-if="fieldType == 'range'">
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <RangeSlider 
                        :min="dataSet && dataSet.min ? dataSet.min : 20"
                        :max="dataSet && dataSet.max ? dataSet.max : 100"
                        @change="(value) => inputValue = value"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- switch -->
        <section v-if="fieldType == 'switch'" >
            <MySwitch 
                :loading="loadingStatus"
                :style="{background:bgColor}"
                :id="myId"
                :class="[classes, 'fullwidth padtop025 padbottom025 borderRad4']"
                :disabled="disableStatus"
                :label="fieldLabel"
                @change="(value) => inputValue = value"
            />
            <span>
                <p class="padtop050 err field-p" >
                    {{fieldError ? fieldError : fieldDetails}}
                </p>
            </span>
        </section>        
        <!-- select -->
        <section class="padbottom125" v-if="fieldType == 'select'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <MySelect
                        :label="elementProperty.fieldLabel"
                        :mode="'single'"
                        :style="{background:bgColor}"
                        :class="classes"
                        :defaultValue="elementProperty.defaultValue"
                        :options="elementProperty.dataSet"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()"
                    ></MySelect>
                </template>
            </MyInputWrapper>
        </section>
        <!-- multiselect -->
        <section class="padbottom125" v-if="fieldType == 'multiselect'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <MySelect
                        :label="elementProperty.fieldLabel"
                        :mode="'multi'"
                        :style="{background:bgColor}"
                        :class="classes"
                        :defaultValue="elementProperty.defaultValue"
                        :options="elementProperty.dataSet"
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()"
                    ></MySelect>
                </template>
            </MyInputWrapper>
        </section>
        <!-- autocomplete: -->
        <section class="padbottom125" v-if="fieldType== 'autocomplete'" >
            <MyInputWrapper :el="{fieldDetails,fieldLabel,fieldError,fieldLoading}" >
                <template #wrapper="{setFucos}" >
                    <MyAutoComplete
                        @focus="setFucos(true,activeOutlineColor)"
                        @blur="setFucos(false), onBlur()" 
                        :defaultValue="elementProperty.defaultValue"
                        :class="classes"
                        :label="elementProperty.fieldLabel"
                        :options="elementProperty.dataSet"
                    />
                </template>
            </MyInputWrapper>
        </section>
        <!-- autocomplete countries: TODO -->
        <section v-if="fieldType == 'countries'" >
        </section>
        <!-- CheckBox: TODO -->
        <section v-if="fieldType == 'checkbox'" >
        </section>
        <!-- Radio: TODO -->
        <section v-if="fieldType == 'radio'" >
        </section>
        <!-- date picker: TODO -->
        <section v-if="fieldType == 'date picker'" >
        </section>
    </main>
</template>

<script>
import RangeSlider from './range-slider'
import MySwitch from './switch'
import MySelect from './select'
import MyNumber from './number'
import MyInputWrapper from './input-wrapper'
import MyAutoComplete from './autocomplete'
export default {
    components: {RangeSlider,MySwitch,MySelect,MyNumber,MyInputWrapper,MyAutoComplete},
    props: ['elementProperty','appearanceProperties','formMethods','hostMethods',],
    data: () => ({
        activeOutlineColor: '#cbd7e4',


        inputValue: undefined,
        dataSet: undefined,
        args: undefined,
        classes: [],
        disableStatus: false,
        loadingStatus: false,
        bgColor: undefined,
        

        // Field Properties
        fieldDetails: undefined, // display the description of the field
        fieldType: undefined, // the type of the field
        fieldLabel: undefined, // displays field label
        fieldError: undefined, // if defined displays error message on the field
        hideStatus: false, // hides the field if true
        fieldLoading: false,
        myId: undefined,


    }),
    created() {
        const {fieldLabel,fieldtype,fieldDetails,defaultValue,dataSet} = this.elementProperty
        
        // setting configs and defaults
        this.fieldLabel = fieldLabel
        this.inputValue = defaultValue
        this.fieldType = fieldtype
        this.fieldDetails = fieldDetails
        this.dataSet = dataSet

        // classes
        this.classes.push('dq-input-fontsize')

        //
        this.args = {
            element: {
                // addClass: this.addClass,
                // removeClass: this.removeClass,
                // setBackgroundColor: this.setBackgroundColor,
                // showLoading: this.showLoading,
                // setFieldId: this.setFieldId,
                hide: this.hide, // done
                show: this.show, // done
                disable: this.disable,
                setFieldDetails: this.setFieldDetails, // done
                error: this.error, // done
                setError: this.setError, // done
                removeError: this.removeError, // done
                value: this.inputValue, // done
                loading: this.loading
            }
        }

        for(let key in this.args.element) {
            this.formMethods[this.elementProperty.fieldLabel][key] = this.args.element[key]
        }

        this.$emit('fieldItems', this.formMethods)

    },
    mounted() {
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
        error(msg) {
            this.fieldError = msg
            const fieldLabel = this.fieldLabel
            const group = this.elementProperty.group
            if(this.formMethods[group]) {
                this.formMethods[group].map(e => {
                    if(e.fieldLabel == fieldLabel) {
                        e.hasError = true
                    }
                })
            }
        },
        setError(condition,msg) {
            if(condition) {
                this.error(msg)
            } else {
                this.removeError()
            }
        },
        removeError() {
            this.fieldError = undefined
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
            this.$emit('onShow',this.fieldLabel)
        },
        loading(v) {
            this.fieldLoading = v
        },
        disable(isDisable) {
            this.disableStatus = isDisable
        },
        showLoading(Arg) {
            this.loadingStatus = Arg
            this.disable(Arg)
        },
        setFieldDetails(Details) {
            this.fieldDetails = Details
        },
        setFieldType(v) {
            this.fieldType = v
        },
        // for type string, or password
        onBlur() {
            this.fieldError = undefined
            this.elementProperty.onBlur(this.args.element,this.formMethods)
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