import {ViewStrategy, InlineViewStrategy} from 'aurelia-framework';
import {inlineView} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';


/*** 
 *  created to : apply and render string inerpolation to templates
 * 
 *  sample use
 *  <compose view-model="interpolator" model.bind="{ state : state , template : 'Hi my name is ${name}' }"></compose>
 *  where state is a property on the parent model eg: state = { name :'Jim' }
 */
export class Interpolator{

    template : string;
    
    activate(model){
        this.template = model.template;
        Object.assign( this, model.state );
    }

    getViewStrategy(){  
        let view = `<template> ${this.template} </template>`;
        return new InlineViewStrategy(view);
    }

    // bind(bindingContext: any, overrideContext: any) {
    //     this.viewStrategy = new InlineViewStrategy(`<template>${this.template}</template>`);
    // }

    // viewStrategy:InlineViewStrategy;
}

