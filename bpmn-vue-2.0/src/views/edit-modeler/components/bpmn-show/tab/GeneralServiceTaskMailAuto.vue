<template>
	<div class="properties">
		<a-tabs type="card" v-model="activeTab">
			<a-tab-pane key="general" :tab="local.general">
				<general-mail-auto :param="param" :general="mailGeneral" />
			</a-tab-pane>
			<a-tab-pane key="Recipient" :tab="local.recipient">
				<recipient :participant="mailRecipient" :globalVariables="globalVariables"/>
			</a-tab-pane>
			<a-tab-pane key="MailMessage" :tab="local.message">
				<MailMessage :message="mailMessage"/>
			</a-tab-pane>
			<a-tab-pane key="attachment" :tab="local.attachment">
				<MailAttachment :attachment="mailAttachment" :globalVariables="globalVariables"/>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
    import {BpmnMethod, BpmnTag} from "../../js/BpmnHelper";
    import GeneralMailAuto from "./GeneralMailAuto";
    import Recipient from "./Recipient";
    import MailMessage from "./MailMessage";
    import MailAttachment from "./MailAttachment";

    export default {
        name: "GeneralServiceTaskMailAuto",
        components: {GeneralMailAuto, Recipient, MailMessage, MailAttachment},
        props: {
            mailGeneral: {
                type: Object,
                default: () => ({})
            },
            mailRecipient: {
                type: Object,
                default: () => ({})
            },
            mailMessage: {
                type: Object,
                default: () => ({})
            },
            mailAttachment: {
                type: Object,
                default: () => ({})
            },
            param: {
                type: Object,
                default: () => ({})
            }, element: {
                type: Object,
                default: () => ({})
            }, params: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
            globalVariables() {
                let processKey = this.params.process.key;
                let extensionElements = this.params[processKey].extensionElements;
                if (extensionElements) {
                    return extensionElements.get('values').filter(element => element['$type'] === BpmnTag.variable);
                }
                return [];
            }
        },
        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            return {
                local, activeTab: 'general'
            }
        },
        watch: {
            element(newValue) {
                this.activeTab = 'general';
                this.param = this.params[newValue.id];
                this.extensionValues = this.getExtensionElements().get('values');
            },
        },
        methods: {
            getExtensionElements: BpmnMethod.getExtensionElements()
        },
    }
</script>