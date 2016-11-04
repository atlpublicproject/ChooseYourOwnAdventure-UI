import { Router, RouterConfiguration} from 'aurelia-router';
import { Page, Story } from './../objects/objects';
import { Api } from './../api';
import { inject } from 'aurelia-framework';
import { State } from './../state';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject( Router, Api, State, EventAggregator )
export class Play {

 constructor( private router : Router, private api : Api, private state : State,
              private eventAggregator : EventAggregator ){}

 text: string;
 image : string;
 imagePath : string;
 buttons : Array<Array<string>>;
 input : Array<string>;
 story : Story;

 canActivate( params ){

   if ( this.state.story == null ||
        this.state.story.slug != params.slug ){

      //try load story
      let p  = new Promise( (resolve, reject) => 
        this.api
          .getStory( params.slug )
          .then( res => {

            if ( res.pages == null ){
              resolve(false);
              alert('The story has no pages');
              this.router.navigateToRoute('browse');
            }else{

              this.state.story = res;
              resolve(true);
            }

        }).catch(
          (err) => alert('Unable to load story! ' + err )
        )      
      );

      return p;   
   }
 }

 activate( params ){
         
    let page = 1;
    if ( params.page == null ){
        params.page = 1;
    }    
    
    //params not null
    page = params.page;
    this.setPageData(page);    

    this.eventAggregator.publish("SelectStory", this.story.cover);
 }

 setPageData( pageNum : number ){

   try{
    let page = this.state.story.pages[pageNum];
    this.text = page.text;
    this.image = page.image;
    this.buttons = page.buttons;          
    this.input = page.input;
    this.story = this.state.story;
    this.setImagePath();
   }catch(ex){
     alert(`Unable to find page ${pageNum}`);
   }
 }

 goToPage(pageNum : string){
   if ( this.input && !this.inputVal){
      alert(`Please enter required input`);
      return;
   }  
   this.isPageChanging = true;
   let slug = this.state.story.slug;
   this.router.navigateToRoute('play', { slug:slug  ,page : pageNum})
 }

 setImagePath(){

   if ( this.image.indexOf("www.") > -1 ){
     this.imagePath = this.image;
   }else if (this.image){
     this.imagePath = 'images/' + this.image;
   }else{
     this.imagePath = null;
   }
 }

 isPageChanging : boolean = false;
 canDeactivate(){
   //debugger;

   if ( this.isPageChanging )
      return true;

   return confirm('Are you sure you want to exit?')
 }

 // bound value
 set inputVal(value) {
    console.log("Set: " + value);
    this.state.storyData[ this.input[0] ] = value;
  }

  get inputVal() { 
    if ( !this.state.storyData[ this.input[0] ])
      return null;

    return this.state.storyData[ this.input[0] ];
  }

}


