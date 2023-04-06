<template>
	<div class="general-context">
		<a-form-model ref="form" :model="message" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item :label="local.subject" prop="name">
				<a-input v-model="message.subject" :disabled="disabled" read-only/>
			</a-form-model-item>
			<a-form-model-item :label="local.subjectSelect">
				<a-radio-group v-model="message.subjectSelect" disabled>
					<a-radio value="pboSubject" >
						{{local.pboSubject}}
					</a-radio>
					<a-radio value="templateSubject" >
						{{local.templateSubject}}
					</a-radio>
				</a-radio-group>
			</a-form-model-item>
			<a-form-model-item :label="local.selectTemplate">
				<a-select v-model="message.mailTemplate" :open="false">
					<a-select-option v-for="item in mailTemplates" :key="item.name">
						{{item.name}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item :label="local.messageBody">
				<a-textarea read-only v-model="message.messageBody" style="height: 100px" ></a-textarea>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
    const propertiesType = ['subject', 'subjectSelect', 'mailTemplate', 'messageBody'];
    export default {
        name: "GeneralMailAuto",
        props: {
            param: {
                type: Object,
                default: () => ({})
            },
            message: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {},
        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            let disabled = false;
            return {
                local, mailTemplates: JSON.parse(localStorage.getItem('activeMailTemplates')), disabled
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}
</style>
