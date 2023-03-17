<template>

	<div class="participant-context">
		<a-tabs class='table-box' default-active-key="assigns" tab-position="left" @change="changeTab">
			<a-tab-pane :tab="local.user" key='assigns' class='flex'>
				<div class="context-left">
					<div class="from">
						<a-form class="from-left" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
							<a-form-item :label="local.fullName">
								<a-input v-model="assignFrom.fullName"/>
							</a-form-item>
							<a-form-item :label="local.username">
								<a-input v-model="assignFrom.name"/>
							</a-form-item>
						</a-form>
						<a-button type="primary" class='from-btn' style="margin-top:48px;" @click="findParticipant()">
							{{local.find}}
						</a-button>
					</div>
					<div class="table-left table-left-user">
						<table>
							<tr>
								<th>{{local.username}}</th>
								<th>{{local.fullName}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.userName}}</td>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
					<div>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.userName}}({{item.fullName}})</td>
							<td>{{item.type}}</td>
						</tr>
					</table>

				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.group" key='groups' class='flex'>
				<div class="context-left">
					<div class="from">
						<a-form class="from-left" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
							<a-form-item :label="local.groupName">
								<a-input v-model="groupFrom.name"/>
							</a-form-item>
						</a-form>
						<a-button type="primary" class='from-btn' style="margin-top:2px;" @click="findParticipant()">
							{{local.find}}
						</a-button>
					</div>
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.group}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.name}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.role" key='roles' class='flex'>
				<div class="context-left">
					<div class="from">
						<a-form class="from-left" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
							<a-form-item :label="local.roleName">
								<a-input v-model="roleForm.roleName"/>
							</a-form-item>
						</a-form>
						<a-button type="primary" class='from-btn' style="margin-top:2px;" @click="findParticipant()">
							{{local.find}}
						</a-button>
					</div>
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.roleName}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.name}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.operator" key='operators' class='flex'>
				<div class="context-left">
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.roleName}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.name}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.team" key='team' class='flex' v-if="false">
				<div class="context-left">
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.team}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.name}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.variable" key='variables' class='flex'>
				<div class="context-left">
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.variable}}</th>
							</tr>
							<tr v-for='(item,index) in leftList' :key='item.id' :class='item.hover?"hover":""'
									@click='add2Cache(index,"left",item)'>
								<td>{{item.name}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='add2Data("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='add2Data("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.name}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
			<a-tab-pane :tab="local.email" key='emails' class='flex'>
				<div class="context-left">
					<div class="table-left">
						<table>
							<tr>
								<th>{{local.email}}</th>
							</tr>
							<tr>
								<td>
									<a-auto-complete placeholder="Email" @change="handleChange" :data-source="dataSource" ref="emailInput"
																	 allow-clear v-model="email"/>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="shuttle-btn">
                    <span :class="rightIconStats ?'hover':''" @click='addEmailData("right")'><a-icon
														type="double-right"/></span>
					<span :class="leftIconStats ?'hover':''" @click='addEmailData("left")'><a-icon
									type="double-left"/></span>
				</div>
				<div class="table-right">
					<table>
						<tr>
							<th>{{local.recipient}}</th>
							<th>{{local.type}}</th>
						</tr>
						<tr v-for='(item,index) in rightList' :key='item.id' :class='item.hover?"hover":""'
								@click='add2Cache(index,"right",item)'>
							<td>{{item.mail}}</td>
							<td>{{item.type}}</td>
						</tr>
					</table>
				</div>
			</a-tab-pane>
		</a-tabs>
	</div>

</template>

<script>
    import {Http} from "../../js/BpmnHelper"

    let leftDataCache = [], rightDataCache = [];
    export default {
        name: "Recipient",
        props: {
            participant: {
                type: Object,
                default: () => ({})
            },
            globalVariables: Array,
        },
        created() {
            this.initParticipant(this.participant, 'assigns');
            this.initParticipant(this.participant, 'groups');
            this.initParticipant(this.participant, 'roles');
            this.initParticipant(this.participant, 'operators');
            this.initParticipant(this.participant, 'variables');
            this.initParticipant(this.participant, 'emails');
            this.rightList = this.participant.assigns;
        },
        watch: {
            participant(newValue) {
                this.initParticipant(newValue, 'assigns');
                this.initParticipant(newValue, 'groups');
                this.initParticipant(newValue, 'roles');
                this.clearData();
                this.rightList = this.participant[this.activeKey];
            }
        },
        data() {
            let local = JSON.parse(localStorage.getItem('activeLocal'));
            return {
                local: local,
                leftIconStats: false, rightIconStats: false, leftList: [], rightList: [], activeKey: 'assigns',
                assignFrom: {name: '', fullName: '', properties: "name,fullName", beanName: "piUser",},
                groupFrom: {name: '', properties: "name", beanName: "piGroup",},
                roleForm: {roleName: '', properties: "roleName", beanName: "piRole",},
                dataSource: [], email: ''
            }
        },
        methods: {
            emailFormatCheck(value) {
                const emailRegex = /^[a-zA-Z0-9._%!!(MISSING)]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var ifMatch = emailRegex.test(value);
                if (value) {
                    if (!ifMatch) {
                        this.$message.error(this.local.emailFormat);
                        return false;
                    }
                }
                return true;
            },
            changeTab(key) {
                this.activeKey = key;
                this.rightList = this.participant[this.activeKey];
                this.clearData();
                let that = this;
                if (key === 'operators') {
                    var initData = [{
                        'id': 'operator_code', 'name': this.local.operator, 'roleCode': 'operator_code',
                        'hover': false, 'type': 'Operator'
                    }];
                    this.leftList = initData.filter(item => {
                        let flag = true;
                        that.rightList.forEach(data => {
                            if (data.id === item.id) {
                                flag = false;
                            }
                        });
                        return flag;
                    });
                }
                if (key === 'variables') {
                    this.leftList = this.globalVariables.filter(item => {
                        let flag = true;
                        that.rightList.forEach(data => {
                            if (data.id === item.id) {
                                flag = false;
                            }
                        });
                        return flag;
                    });
                }
                if (key === 'emails') {
                    this.rightIconStats = true;
                }
            },
            findParticipant() {
                let that = this;
                let requestData = this.activeKey === 'assigns' ? this.assignFrom : this.activeKey === 'groups' ? this.groupFrom : this.roleForm;
                Http.getParticipant(that.activeKey, requestData).then(result => {
                    that.parseLeftList(result);
                });
            },
            addEmailData(type) {
                let optionData = this.participant[this.activeKey];
                if (type === 'right') {
                    var isAdd = true;
                    var data = this.$refs.emailInput.value;
                    if (this.emailFormatCheck(data)) {
                        var initData = [{
                            'id': data, 'mail': data, 'hover': false, 'type': 'Email'
                        }];
                        for (var i = 0; i < optionData.length; i++) {
                            if (optionData[i].id === data) {
                                isAdd = false;
                                break;
                            }
                        }
                        if (isAdd) {
                            this.optionRightList(initData, 'add');
                            this.rightIconStats = true;
                            this.email = '';
                        }
                    }
                } else {
                    let cacheData = type === 'left' ? rightDataCache : leftDataCache;
                    this.optionRightList(cacheData, 'remove');
                    rightDataCache = [];
                    this.leftIconStats = false;
                }
            },
            add2Data(type) {
                if (!(type === 'left' ? this.leftIconStats : this.rightIconStats)) {
                    return
                }
                let add2Data = type === 'left' ? this.leftList : this.rightList;
                let remove4Data = type === 'left' ? this.rightList : this.leftList;
                let cacheData = type === 'left' ? rightDataCache : leftDataCache;


                if (type === 'left') {
                    this.optionRightList(cacheData, 'remove');
                    this.leftList = add2Data.concat(cacheData);
                    rightDataCache = [];
                    this.leftIconStats = false;
                } else {
                    this.optionRightList(cacheData, 'add');
                    //找到没有在缓存中的数据
                    this.leftList = remove4Data.filter(item => {
                        let stats = true;
                        for (let i = 0; i < cacheData.length; i++) {
                            if (cacheData[i].id === item.id) {
                                stats = false;
                                break
                            }
                        }
                        return stats
                    });
                    leftDataCache = [];
                    this.rightIconStats = false
                }
            },
            add2Cache(index, type, item) {
                let key;
                let cacheData = type === 'left' ? leftDataCache : rightDataCache;
                let operateData = type === 'left' ? this.leftList : this.rightList;

                //寻找是否已存在缓存中
                let result = cacheData.some((data, i) => {
                    if (item.id === data.id) {
                        key = i;
                        return true
                    }
                });
                if (result) {
                    item.hover = false;
                    operateData[index] = item;
                    cacheData.splice(key, 1)
                } else {
                    let itemCopy = {...item};
                    item.hover = true;
                    operateData[index] = item;

                    itemCopy.hover = false;
                    cacheData.push(itemCopy);
                }
                if (type === 'left') {
                    this.rightIconStats = leftDataCache.length > 0;
                    this.leftList = [];
                    this.leftList = operateData;
                } else {
                    this.leftIconStats = rightDataCache.length > 0;
                    this.rightList = [];
                    this.rightList = operateData;
                }
            },
            clearData() {
                this.leftList = [];
                leftDataCache = [];
                rightDataCache = [];
            },
            initParticipant(participant, key) {
                if (participant[key]) {
                    participant[key].forEach(item => item.hover = false);
                } else {
                    participant[key] = [];
                }
            },
            optionRightList(participantData, type) {
                let optionData = this.participant[this.activeKey];
                if ('remove' === type) {
                    participantData.forEach(item => {
                        optionData.some((data, index) => {
                            if (item.id === data.id) {
                                optionData.splice(index, 1);
                            }
                        });
                    });
                    this.$emit('updateParticipant', type, this.participant, this.activeKey, participantData);
                } else {
                    this.$emit('updateParticipant', type, this.participant, this.activeKey, participantData);
                }
            },
            parseLeftList(participantData) {
                let that = this;
                this.leftList = participantData.filter(item => {
                    let flag = true;
                    that.rightList.forEach(data => {
                        if (data.id === item.id) {
                            flag = false;
                        }
                    });
                    return flag;
                });
            },
            handleChange(value) {
                this.dataSource =
                    !value || value.indexOf('@') >= 0
                        ? []
                        : [`${value}@pisx.com`, `${value}@163.com`, `${value}@qq.com`];
            }
        }

    }
</script>

<style scoped>
	.participant-context {
		width: 100%;
		overflow: auto;
		height: 64vh;
	}

	.table-box {
		min-width: 700px;
		height: 100%;
	}

	.flex {
		display: flex;
	}

	.context-left {
		width: 250px;
		height: 100%;
	}


	.shuttle-btn {
		padding: 160px 10px 0 10px;
	}

	.shuttle-btn span {
		display: block;
		width: 40px;
		height: 40px;
		background: #fff;
		border: 1px #ddd solid;
		border-radius: 5px;
		margin-bottom: 10px;
		line-height: 40px;
		text-align: center;
	}

	.shuttle-btn span.hover {
		background: #1890ff;
		color: #fff;
	}


	.table-right {
		width: 100%;
		overflow: auto;
		border: 1px #ddd solid;
		background: #fff;
		margin-right: 1px;
	}

	table {
		width: 100%;
	}

	table th, table td {
		padding: 5px 10px;
		text-align: left;
		border: 1px #ddd solid;
	}

	table td {
		border: none;
		border-bottom: 1px #ddd solid;
	}

	table tr:hover {
		background: #f8f8f8;
	}

	table th {
		border-top: none;
		background: #e9e9e9;
	}

	table th:first-child {
		border-left: none;
	}

	table th:last-child {
		border-right: none;
	}

	table tr.hover {
		background: #eeeeee;
	}

	.from {
		display: flex;
	}

	.from-left {
		width: 370px;
	}

	.from-btn {
		margin-top: 70px;
	}

	.table-left {
		width: 100%;
		height: 50vh;
		border: 1px #ddd solid;
		overflow: auto;
		background: #fff;
		margin-right: 1px;
	}

	.table-left-user {
		height: calc(50vh - 45px);
	}


</style>
