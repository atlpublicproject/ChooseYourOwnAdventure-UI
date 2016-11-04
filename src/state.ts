import {Router, RouterConfiguration} from 'aurelia-router';
import {Story} from './objects/objects';


export class State {

  //templateText : string = "";


  /*** user input for game */
  storyData : any = {};

  /*** story data for active game */
  story : Story  

  /*** projection of placeholder values onto  */
  
  // get placeholderValues() 
  // {
  //   let result = {};

  //   let keys = Object.keys( this.story.placeholders );

  //   keys.forEach(key => {
  //     result[key] = this.story.placeholders[key].value
  //   });

  //   return result;
  // }
}