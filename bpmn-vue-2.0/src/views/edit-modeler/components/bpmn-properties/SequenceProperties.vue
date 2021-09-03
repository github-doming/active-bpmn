<template>
  <div class="properties">
    <a-tabs type="card">
      <a-tab-pane key="general" :tab="local.general">
        <general-sequence :param="param" @updateGeneral="updateGeneral" @updateCondition="updateCondition"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import GeneralSequence from "./tab/GeneralSequence";
  import {BpmnFunction, BpmnTag} from "../js/BpmnHelper";

  export default {
    name: "SequenceProperties",
    components: {GeneralSequence},
    props: {
      modeler: {
        type: Object,
        default: () => ({})
      }, params: {
        type: Object,
        default: () => ({})
      }, element: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {local: JSON.parse(localStorage.getItem('activeLocal')), param: this.params[this.element.id]}
    },
    watch: {
      element(val) {
        this.param = this.params[val.id]
      },
    },
    methods: {
      updateGeneral(newVal) {
        this.modeler.get('modeling').updateProperties(this.element, newVal);
        if (newVal.name) {
          const sequenceId = this.element.id;
          const sourceElement = this.element.source;
          if (sourceElement.type !== 'bpmn:UserTask') {
            return;
          }
          let values = sourceElement.businessObject.extensionElements.get('values');
          let voteState = 2;
          let votesTemp;
          values = values.forEach(value => {
            if (value['$type'] === BpmnTag.taskListener && value.event === sequenceId) {
              value.name = newVal.name;
            }
            if (value['$type'] === BpmnTag.voteSelect) {
              voteState = 1;
              votesTemp = value;
              if (value.votes) {
                value.votes.forEach(vote => {
                  if (vote.id === sequenceId) {
                    vote.name = newVal.name;
                    voteState = 0;
                  }
                });
              } else {
                value.votes = [];
              }

            }
          });
          if (!votesTemp){
            votesTemp = BpmnFunction.createElementTag(this.modeler, sourceElement.businessObject.extensionElements, BpmnTag.voteSelect);
            values.push(votesTemp);
          }
          if (voteState >= 1) {
            let vote = BpmnFunction.createElementTag(this.modeler, votesTemp, BpmnTag.vote);
            Object.assign(vote, {name: newVal.name, id: sequenceId, priority: 1});
            votesTemp.votes.push(vote);
          }
        } else {
          BpmnFunction.deleteSequence(this.element,this.element.source);
        }
      },
      updateCondition(condition) {
        let expression = this.modeler.get("bpmnFactory").create('bpmn:FormalExpression', {body: condition});
        this.modeler.get('modeling').updateProperties(this.element, {
          conditionExpression: expression
        });
      }
    },
  }
</script>

<style scoped>
  .properties {
    padding: 8px 12px;
    margin: 2px 3px;
  }
</style>
