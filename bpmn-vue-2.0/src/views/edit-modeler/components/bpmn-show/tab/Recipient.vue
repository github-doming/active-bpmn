<template>

	<div class="participant-context">
		<a-tabs class='table-box' default-active-key="assigns" tab-position="left" @change="changeTab">
			<a-tab-pane :tab="local.user" key='assigns' class='flex'>
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
