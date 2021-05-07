<template>
    <div class="fullwidth" style="max-height:150px; overflow-y:auto;" >
        <div 
            @click="$emit('itemSelected',item.text)" 
            class="fullwidth pointer listItem" v-for="(item,index) in list" 
            :key="`${item}-${index}`"
            :style="{background: selected.includes(item.text) ? '#cbd7e4' : '', marginBottom:'1px'}" 
        >
            <div class="pad050 flex flexcenter flexstart">
                <div class="pad025" >
                    <div v-if="item.unicode" class="marginright025 flex flexcenter" style="max-width:20px;" >
                        {{item.unicode}}
                    </div>
                    <div class="flex flexcenter flexstart" > 
                        <SvgCheckBox 
                            :isChecked="selected.includes(item.text) ? true : false"
                            class="marginright050"
                        />
                        {{item.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgCheckBox from './_svg-checkbox'
export default {
    components: {SvgCheckBox},
    props: ['list','selected']
}
</script>

<style>
.listItem:hover{
    background: #cbd7e4;
    transition: 0.3s;
}
</style>