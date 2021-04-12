<template>
    <div>
        <a-form-item label="编号">
            <a-input v-model="id" readonly></a-input>
        </a-form-item>
        <a-form-item label="名称">
            <a-input v-model="name" readonly></a-input>
        </a-form-item>
        <a-form-item label="表单标识" v-show="false">
            <a-input v-model="fromKey" readonly></a-input>
        </a-form-item>
        <a-form-item label="文档" v-show="false">
            <a-input type="textarea" v-model="documentation" readonly></a-input>
        </a-form-item>
        <a-form-item label="启动流程的人的id" v-show="false">
            <a-input v-model="initiator"></a-input>
        </a-form-item>
    </div>
</template>
<script>
import bpmnHelper from '../js/helper/BpmnHelper';
export default {
    props: ['element'],
    data(){
        return {
            id : this.element.id || '',
            name: '',
            fromKey:'',
            formFields:'',
            documentation:'',
            initiator:''
        }
    },

    watch: {
        element: {
            deep: true,
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    if(newVal.type === 'bpmn:StartEvent') { // 防止修改其他子组件的属性
                        this.name = newVal.businessObject.name;
                    }
                }
            },

        },
    }
}
</script>
<style>

</style>
