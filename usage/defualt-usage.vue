<template>
    <v-flex style="overflow-x : scroll" relative flexcol flexcenter flexstart  >
        <div >
            <formBuilder
            @onSubmit="sumbit"
            @onChange="() => {}"
            :appearance="{
                primaryColor: '#5a8ab9',
                fieldElementClasses: ['pad050'],
                fieldElementCss: {
                    background:'white',
                },
                hostContainerCss: {
                    width: '450px',
                    background: 'white'
                },
                hostContainerClasses: ['margintop125','pad125','borderRad4']
            }"
            :fields="fields"
        />
        </div>
    </v-flex>
</template>

<script>
// import h from '@/helper'
// import Templates from '@/templates'
import formBuilder from '../index'
export default {
    // mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        // this.h = this
    },
    components: {
        formBuilder
    },
    data: () => ({
        fields: undefined
    }),
    methods: {
        sumbit({data,formMethods,submitMethods}) {
            console.log(data)
            // if(data.username == undefined) {
            //     formMethods.username.error('username is a required field')
            // } else {
            //     submitMethods.setLoading(true)
            //     setTimeout(() => {
            //         submitMethods.setLoading(false)
            //     }, 2000);
            // }
        }
    },
    mounted() {
        // console.log('hello world! this is pageContent')
        this.fields = [
            {
                fieldLabel: 'Username',
                fieldtype: 'string', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'type your username',
                fieldId: '',
                defaultValue: '',
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                },
                onInput: (element,form,error) => {
                    console.log(element)
                    // element.error(element.value != 'foo','this is an error')

                    // if(element.value == 'foo') {
                    //     element.removeError()
                    // }


                    // validation
                    // element.value == 'foo' ? error('this is an error') : element.removeError()
                    // hide
                    // element.value == 'hide' && element.hide()
                    // addClass
                    // element.value == 'borderred' ? element.addClass(element.value) : element.removeClass('borderred')
                    // mutate an input
                    // form.password.setFieldDetails(`Set password for ${element.value}`)
                }                    
            },
            {
                fieldLabel: 'Password',
                fieldtype: 'password', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your password',
                fieldId: '',
                dataSet: {},
                onLoad: (element,form,error) => {
                    // console.log('this is form', form)
                },
                onInput: (element,form,error) => {
                    // const username = form.username.value
                    // console.log(username, element.value)
                    // if(username == 'baz' && element.value == 'bar') {
                        // form.Visitors.show()
                        // form['Test Details'].show()
                        // form['Allow Buffering Fragments'].show()
                        // form['Value in numbers'].show()
                        // form.Range.show()
                    // } else {
                        // form.Visitors.hide()
                        // form['Test Details'].hide()
                        // form['Allow Buffering Fragments'].hide()
                        // form['Value in numbers'].hide()
                        // form.Range.hide()
                    // }
                }                    
            },
            {
                fieldLabel: 'Price',
                fieldtype: 'number', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your price',
                fieldId: '',
                appendText: '$',
                dataSet: {},
                onLoad: (element,form,error) => {
                    // console.log('this is form', form)
                },
                onInput: (element,form,error) => {
                    
                }                    
            },
            {
                fieldLabel: 'Desc',
                fieldtype: 'textarea', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your description',
                fieldId: '',
                dataSet: {},
                onLoad: (element,form,error) => {
                    // console.log('this is form', form)
                },
                onInput: (element,form,error) => {
                    
                }                    
            },
            {
                fieldLabel: 'Visitors',
                fieldtype: 'multiselect', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'this is description',
                fieldId: '',
                defaultValue: [
                    {text: 'foo'},
                    {img: '', unicode:'' ,text: 'bar'},
                ],
                dataSet: [
                    {img: '', unicode:'' ,text: 'foo'},
                    {img: '', unicode:'' ,text: 'bar'},
                    {img: '', unicode:'' ,text: 'baz'},
                    {img: '', unicode:'' ,text: 'ben'},
                ],
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {

                }                    
            },
            {
                fieldLabel: 'Test Details',
                fieldtype: 'select',
                fieldDetails: 'Select test details',
                fieldId: '',
                defaultValue: [
                    {img: '', unicode:'' ,text: 'foo'}
                ],
                dataSet: [
                    {img: '', unicode:'' ,text: 'foo'},
                    {img: '', unicode:'' ,text: 'bar'},
                    {img: '', unicode:'' ,text: 'baz'},
                    {img: '', unicode:'' ,text: 'ben'},
                ],
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Allow Buffering Fragments',
                fieldtype: 'switch',
                fieldDetails: 'Switch 1',
                fieldId: '',
                defaultValue: true,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Allow use of slug modes',
                fieldtype: 'switch',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: false,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Value in numbers',
                fieldtype: 'number',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: false,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Range',
                fieldtype: 'range',
                fieldDetails: 'Range Input sample',
                fieldId: '',
                defaultValue: 30,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {
                    // console.log(element.value)
                    // if(element.value == 30) {
                    //     error('error!')
                    // } else {
                    //     element.removeError()
                    // }
                }                    
            },
        ]
    }
}
</script>