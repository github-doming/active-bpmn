<template>
    <div class="general-context">
        <a-form-model ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                    {{local.wfProcessPbo}}
                </a-checkbox>
            </div>
            <br/>
            <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange"/>
        </a-form-model>
        <p/>
        <h4>{{local.varSelect}}</h4>
        <a-table
                bordered
                :row-selection="rowSelection"
                :custom-row="handleClickRow"
                :columns="columns"
                :data-source="data"
                :pagination="false"
        />
    </div>
</template>

<script>
    var columns = [];
    const data = [
        {
            key: 0,
            varName: 'test01'
        },
        {
            key: 1,
            varName: 'test02'
        }
    ];
    var plainOptions = [];
    const defaultCheckedList = [];
    export default {
        name: "MailAttachment",
        props: {
            param: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {},
        computed: {
            rowSelection() {
                const { selectedRowKeys } = this;
                return {
                    selectedRowKeys,
                    type: 'checkbox'
                }
            }
        },
        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            plainOptions = [local.primaryContent, local.secondContent, local.attrInfo];
            columns = [{
                title: local.varName,
                dataIndex: 'varName'
            }];
            let form = {};
            return {
                local, form, checkedList: defaultCheckedList,
                indeterminate: false,
                checkAll: false,
                plainOptions,
                columns,
                data,
                selectedRowKeys:[]
            }
        },
        methods: {
            handleClickRow(record, index){
                return {
                    on: {
                        click: () => {
                            const indexRow = this.selectedRowKeys.indexOf(record.key);
                            if(indexRow === -1){
                                this.selectedRowKeys.push(record.key);
                            }else{
                                this.selectedRowKeys.splice(indexRow,1);
                            }
                        }

                    }
                }
            },
            updateProperty(type) {
                let properties = {};
                properties[type] = this.form[type];
                this.$emit('updateGeneral', properties);
            },
            onChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
            },
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? plainOptions : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
            }
        },
    }
</script>

<style scoped>
    .general-context {
        height: 64vh;
    }
</style>
