<template>
    <div>
        <a-form-item label="目标命名空间" >
            <a-input v-model="targetNamespace" readonly></a-input>
        </a-form-item>
        <a-form-item label="标签版本" v-show="isShow">
            <a-input v-model="versionTag" ></a-input>
        </a-form-item>
        <a-form-item>
            <a-checkbox v-model="isExecutable" v-show="isShow">是否可执行</a-checkbox>
        </a-form-item>
        <a-form-item label="任务优先级" v-show="isShow">
            <a-input v-model="taskPriority"  ></a-input>
        </a-form-item>
        <a-form-item label="工作优先级" v-show="isShow">
            <a-input v-model="jobPriority"  ></a-input>
        </a-form-item>
        <a-form-item label="候选开始组"  v-show="isShow">
            <a-select v-model="candidateStarterGroups" multiple filterable placeholder="请选择">
                <a-select-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="候选开始用户"  v-show="isShow">
            <a-input v-model="candidateStarterUsers"></a-input>
        </a-form-item>
        <a-form-item label="历史生存时间"  v-show="isShow">
            <a-input v-model="historyTimeToLive"></a-input>
        </a-form-item>
        <a-form-item label="监听器配置"  v-show="isShow">
            <a-input v-model="historyTimeToLive"></a-input>
        </a-form-item>
    </div>
</template>
<script>
import bpmnHelper from '../js/helper/BpmnHelper';

export default {
    props:['element'],
    inject: ['bpmn'],
    methods:{
    },
    data(){
        return {
            targetNamespace:'',
            isShow:false,
            versionTag:'',
            isExecutable:true,
            taskPriority:'',
            jobPriority:'',
            candidateStarterGroups:'',
            candidateStarterUsers:'',
            historyTimeToLive:'',
            historyTimeToLive:'',
            options: [{
                value: '1',
                label: '黄金糕'
            }, {
                value: '2',
                label: '双皮奶'
            }],
            candidateStarterGroups: []
        }
    },
    mounted(){
        let modelInfo = this.$root.params.modelInfo;
        let modelId = modelInfo.modelId;
        let definition = this.element.parent;
        if(definition){
            let definitionBo = bpmnHelper.getBo(definition);
            definitionBo.set('targetNamespace',modelId);
        }
        this.targetNamespace = modelId;
        this.$emit('updateProperties',{commonProperties:{id:modelId,name:modelInfo.name}});
    }
}
</script>
<style>

</style>
