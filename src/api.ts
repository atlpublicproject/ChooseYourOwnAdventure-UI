import { Cover, Page, Story} from './objects/objects';
import { inject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

let latency = 200;
let id = 0;

@inject(HttpClient)
export class Api {

  constructor(private http : HttpClient) {
    http
      .configure( config => 
        { config
            .withBaseUrl('http://localhost:3000/')
            .withDefaults({
                credentials: 'omit',
                headers: {
                    'Accept': 'application/json', 
                    'X-Requested-With': 'Fetch'
                }  
             });
        }
      );

    this.http = http;
  }

  isRequesting = false;
  
  /*** search for decks */
  search( searchText : string ) : Promise<Cover[]>{   
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {
        let results = games;

        let mapHeaders = 
          x =>  { return <Cover>{
              title : x.title,
              description : x.description,
              slug : x.slug,
              tags : x.tags,
              authors : x.authors,
              editors: x.editors,

              //aggregate data
              pageCount : x.pageCount, 
              pageStats : x.pageStat
          }};

        let q = !!searchText ? `/?q=${searchText}` : '';
        this.http.fetch(`b/browse${q}`)
          //.catch( error => alert( error ))
          .then( response => response.json() )
          .then( data => {
                  let results = data.map( x => mapHeaders(x) );
                  resolve(results);
            });

          this.isRequesting = false;
      }, latency);
    });
  }

  getStory( storySlug : string  ) : Promise<Story>{

    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {

        this.http.fetch(`s/${storySlug}/all`)
          //.catch( error => alert( error ))
          .then( response => response.json() )
          .then( data => {
                  //let results = data.map( x => mapHeaders(x) );
                  resolve(data);
            });


      }, latency);
    });

  }
            

  /*** search for decks */
  getPage( gameFolderName : string, pageNumber : number ) : Promise<Page>{   
    this.isRequesting = true;

    return new Promise(resolve => {
      setTimeout(() => {

        let page = <Page>game[pageNumber];

        resolve(page);

      }, latency);
    });
  }

  public GetPage( game:string, page: number){

  }


}


var games = [{
  folder : 'sample-game-for-example',
  title : 'Sample Game',
  description : 'This is a sample game',
  pages : 4,
  genres : ['demo', 'test']
}];

var game = {

  state :{
    dog_name:''
  },

  1 : {
    text  : 'This is the text for page 1',
    image :'5-mysterious-columns.jpg',
    input : ['dog_name', 'Enter a name for your dog'],
    buttons : [ ['Continue', '2'], ['Continue Alt','3'] ]  
  },

  2 : {
    text  : 'This is the text for page 2 and his name was ${dog_name}',
    image :'2-fleeting-abstract.jpg',
    buttons : [ ['Back', '1'], ['Continue','3'] ]  
  },

  3 : {
    text  : 'This is the text for page 3',
    image :'4-historic-scene.jpg',
    buttons : [ ['Back to start', '1'], ['Continue','4'] ]      
  },

  4 : {
    text  : 'This is the text for page 4, Is this the end?',
    image : '3-alien-bug.jpg',
    buttons : [ ['Continue', 5]]    
  },
  
  5 : {
    text  : 'You have found the wall painting. The treasure is yours.',
    image : '1-wall-painting.jpg',
    buttons : []    
  }
  
}


// input [ 'dog_name', "Enter a name for your dog"] 
// ^ template / state name, placeholder name
/* folder name = game_title

README.txt (author rules, etc)
meta.json
state.json

pages > 
1.json
2.json
3.json

images >

1_dog_happy.jpg
2_dog_sad.jpg
3_dog_jumping.jpg

*/







