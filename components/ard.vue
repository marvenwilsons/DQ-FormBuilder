<template>
    <div style="width:24px;height:24px;" @click="setStatus(!status)" class="pointer" >
        <svg :class="[state ? 'on' : 'off']"  fill="gray" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7,10L12,15L17,10H7Z" /></svg>
    </div>
</template>

<script>
export default {
    props: ['show','state'],
    data: () => ({
        status: false
    }),
    methods: {
        setStatus(v) {
            this.status = this.state
        }
    }
}
</script>

<style>
.on {
    transform: rotate( -180deg );            
    transition: transform 500ms ease;
}

.off {
    transform: rotate( -360deg );            
    transition: transform 500ms ease;
}
</style>