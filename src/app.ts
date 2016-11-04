import {Router, RouterConfiguration} from 'aurelia-router';
import {Cover} from './objects/objects';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class App {


 constructor( private eventAggregator : EventAggregator){

   this.subscribe();
 }

 message = 'Choose Your Own Adventure';

 router : Router;
  
 configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.map([

      //find an adventure game
      { route: ['', 'browse'], title:'Browse Games',   name: 'browse',   moduleId: './pages/browse', nav:true},

      // play an adventure game => :name is the game name, :id is the page number
      // all state is in the URL!
      { route: 'play/:slug/:page?', name: 'play', 
          moduleId: './pages/play', activationStrategy:'replace',
          // viewPorts: { default : './pages/play',
          //             bottome :'./more' }
                    }

    ]);
  }

  goToHome(){
    this.router.navigateToRoute('browse');
  }

  subscribe(){
   this.eventAggregator.subscribe('SelectStory', story => {
       this.selectedStory = story;
    });
  }
  selectedStory : Cover;


}


