
import {inject, InlineViewStrategy, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable} from 'aurelia-framework';

import { State } from './state';

@noView
@inject(State)
export class Dynamic {

    constructor(state : State){
        this.templateText = state.templateText;
    }

    templateText :string = "okay";

    viewStrategy: InlineViewStrategy;

    bind(bindingContext: any, overrideContext: any) {
        this.viewStrategy = new InlineViewStrategy(`<template>${this.templateText}</template>`, []);
    }
}

