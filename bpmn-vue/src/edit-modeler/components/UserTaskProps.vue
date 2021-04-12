<template>
    <div>
        <a-form-item label="编号" required>
            <a-input v-model= "id"></a-input>
        </a-form-item>
        <a-form-item label="名称" required>
            <a-input v-model= "name"></a-input>
        </a-form-item>
        <a-form-item label="文档" v-show="false">
            <a-input type="textarea" v-model="documentation"></a-input>
        </a-form-item>
        <a-form-item label="多实例类型">
            <a-select v-model= "multiinstance_type" label-in-value
                      :default-value="{key: 'None'}"
                      style="width: 120px"
                      @change="handleChange">
                <a-select-option value="None">非多实例</a-select-option>
                <a-select-option value="Parallel">同时进行</a-select-option>
                <a-select-option value="Sequential">顺序进行</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="基数 (多实例)" v-show="false"><!--后端暂时没用到-->
            <a-input v-model= "multiinstance_cardinality" type="number"></a-input>
        </a-form-item>
        <a-form-item label="元素的变量(多实例)" v-show="false"><!--后端暂时没用到-->
            <a-input v-model= "multiinstance_variable" ></a-input>
        </a-form-item>
        <a-form-item label="通过权重[1-100]">
            <a-input v-model= "multiinstance_condition" type="number"></a-input>
        </a-form-item>
        <a-form-item label="表单标识"  required>
            <a-input v-model= "formKey" readonly></a-input>
        </a-form-item>
        <a-form-item label="任务派遣">
            <a-select v-model= "candidateGroups" multiple filterable placeholder="请选择">
                <a-select-option
                v-for=" p in positions"
                :key="p.id"
                :label="p.name"
                :value="p.id">
                </a-select-option>
            </a-select>
        </a-form-item>
    </div>
</template>
<script>
const forEach = require('lodash/forEach');
import {findObjFromArrayByField,isNeedUpdate} from '../js/util/CommonUtils';
import bpmnHelper from '../js/helper/BpmnHelper';
import {NodeTypeMap,TxTypeMap} from '../../static/js/static';
// 用户任务属性组件
export default {
    props:['element'],
    inject: ['bpmnModeler'],
    data(){
        return {
            modeling: null,
            id: this.element.id || '',
            name: '',
            formKey:'',
            documentation: '',
            multiinstance_type: '',
            multiinstance_collection: '',
            multiinstance_condition: '',
            multiinstance_cardinality: null,
            multiinstance_variable: null,

            // 原子节点属性
            positions:[],
            priority:'',
            candidateGroups: '没有受让人'
        }
    },
    methods:{
      handleChange(value) {
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
      },
    },
    mounted() {
        const bpmnModeler = this.bpmnModeler();
        this.modeling = bpmnModeler.get('modeling');
    },
    watch:{
        name: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{
                    name: newVal
                });
            }
        },

        //监视元素变化
        element:{
            deep: true,
            immediate: true,
             handler(newVal,oldVal){
                 if(newVal.type == 'bpmn:UserTask') {
                     const bpmnModeler = this.bpmnModeler();
                     const modeling = bpmnModeler.get('modeling');
                     const businessObject = newVal.businessObject;
                     this.name = businessObject.name;
                     this.formKey = businessObject.get('formKey');
                     // 原子
                     const candidateGroupsTemp = businessObject.get('candidateGroups');
                     // 解决后端反显和切换节点反显candidateGroupsTemp类型不一致问题
                    if(candidateGroupsTemp && candidateGroupsTemp.length > 0) {
                        if(Array.isArray(candidateGroupsTemp)) {
                            //切换节点反显
                            this.candidateGroups = businessObject.get('candidateGroups');
                        } else {
                            //后端反显
                            this.candidateGroups = businessObject.get('candidateGroups').split(',');
                        }

                    }

                     this.multiinstance_type = businessObject.get('multiinstance_type') || '';
                     this.multiinstance_condition = businessObject.get('multiinstance_condition') || '';
                     modeling.updateProperties(newVal,{'multiinstance_type':this.multiinstance_type});
                     //modeling.updateProperties(newVal,{'multiinstance_condition':this.multiinstance_condition});
                 }
             }
        },
        formKey:{
            handler(newVal,oldVal){
                this.modeling.updateProperties(this.element,{'formKey':newVal});
            }
        },
        multiinstance_type: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_type':newVal});
            }
        },
        multiinstance_collection: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_collection':newVal});
            }
        },
        multiinstance_condition: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_condition':newVal});
            }
        },
        priority: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'priority':newVal});
            }
        },
        candidateGroups: {
            handler(newVal,oldVal){
                this.modeling.updateProperties(this.element,{'candidateGroups':newVal});

            }
        }
    }

}
</script>
<style>

</style>
