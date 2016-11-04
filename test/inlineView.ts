import {inject, noView, ViewCompiler, ViewSlot, Container, ViewResources} from 'aurelia-framework';

import {State} from './state';

@noView
@inject(ViewCompiler, ViewSlot, Container, ViewResources, State)
export class InlineView {

    viewCompiler : ViewCompiler; 
    viewSlot : ViewSlot;
    state : State;

    title : string = "what";

    constructor(vc : ViewCompiler, vs : ViewSlot, container : Container, resources : ViewResources, state : State){
        this.viewCompiler = vc;
        this.viewSlot = vs;

        var templateText = state.templateText;

        var viewFactory =  this.viewCompiler.compile(`<template><span>${templateText}</span></template>`, resources);

        var bindingContext = { dog_name :'Click Me'};
        var view = viewFactory.create(container, bindingContext);
        this.viewSlot.add(view);
        this.viewSlot.attached();
    }
    
}