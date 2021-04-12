'use strict';

const BpmnElement = {};
module.exports = BpmnElement;

/**
 * Creates a new element and set the parent to it
 *
 * @method ElementHelper#createElement
 *
 * @param {String} elementType of the new element
 * @param {Object} properties of the new element in key-value pairs
 * @param {Moddle.object} parent of the new element
 * @param {BpmnFactory} factory which creates the new element
 *
 * @returns {djs.model.Base} element which is created
 */
BpmnElement.createElement = function(elementType, properties, parent, factory) {
    let element = factory.create(elementType, properties);
    element.$parent = parent;
    return element;
};
