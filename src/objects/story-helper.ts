import { Story, Cover, Page } from './objects';
import * as _ from "underscore";

export class StoryHelper {

    static Slugify(str: string): string {
        return str.replace(/ /g, '-').toLowerCase();
    }

    static toHeader( story : Story ) : Cover {
        let c = new Cover();

        c.title = story.title;
        c.description = story.description;
        c.slug = story.slug;
        c.tags = story.tags;
        
        c.pageCount = _.size(story.pages); //slow :(       
        if ( story.pages ){
            c.pageStats = StoryHelper.getStoryStats( story.pages );
        }

        return c;
    }

    static getStoryStats( pages : { [pageNum : number ] : Page } ){
        let getPages = ( p : Page ) => { if (p.buttons == null || p.buttons.length == 0) return null;
                                         else return p.buttons.filter( b => b.length > 0).map( b => new Number(b[1]) as number ) };

        let done : any = {};

        let endings  : any  = {};
        let endPathLength = Array<number>();
        let loops : any  = {};
        let merges : any = {};
        
        function walk( pageNum : number, prevPageNum: number, pathLength: number, mergeWalk : boolean ){

            //handle merges
            if (!mergeWalk){

                if ( done[ pageNum ] !== undefined && prevPageNum < pageNum){
                    mergeWalk = true;
                    merges[ pageNum ] = ( merges[ pageNum ] + 1 ) || 1 ;
                }

                done[ pageNum ] = 1;                
            }


            pathLength++;

            let children = getPages ( pages[ pageNum] );
            if ( children == null ){
                endings[pageNum] = 1;
                endPathLength.push( pathLength );
                return;
            }

            //not complete? continue
            children.forEach(       
                (c) => {
                    if ( c < pageNum && done[c]){
                 
                        if ( !mergeWalk){
                            console.log( "pageNum => c" + pageNum + '=>' + c );
                            loops[c] = (loops[c] + 1) || 1;
                        }
                    }else{
                        walk( c, pageNum, pathLength, mergeWalk );
                    }   
                }
            );
        }

        walk( 1, 0, 0, false );


        console.log( JSON.stringify(loops, null, 4 ));

        let completeCount : number = _.keys(endings).length;

        let loopbackCount : number = _.values(loops).reduce( (sum:number, val:number) => sum + val , 0 );
        let convergeCount : number = _.values(merges).reduce( (sum:number, val:number) => sum + val , 0 );

        let avgPath  : number = -1;
        if ( endPathLength.length > 0)
            avgPath = endPathLength.reduce( (sum : number, val : number) => { return sum + val; }, 0 ) / endPathLength.length;

        // todo :
        // change to qualitative measures
        //  -> cliffs ahead
        //  -> many endings
        //  ^ based on relative to total length
        // ( systematic categorization of x to length)

        return {
            endings : completeCount,
            loops : loopbackCount,
            merges : convergeCount, 
            steps : endPathLength,
        };
    }

}