import { Router, RouterConfiguration} from 'aurelia-router';
import { Cover, Page} from './../objects/objects';
import { Api } from './../api';
import { inject } from 'aurelia-framework';
import { EventAggregator} from 'aurelia-event-aggregator';

@inject( Router, Api, EventAggregator )
export class Browse {

 constructor( private router : Router, private api : Api, private eventAggregator:EventAggregator ){
    this.eventAggregator.publish("SelectStory", null);
 }

 activate(){
    return this.api.search('').then(
          res => this.covers = res
        );
 }

 goToGame(cover){
    this.router.navigateToRoute('play', { slug : cover.slug });

    this.eventAggregator.publish("SelectStory", cover);
 }

 covers : Cover[];



}


