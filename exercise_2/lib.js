const rp = require ('request-promise')

//Keep retrying until success.
async function retry(func, retryCount = 1,funcName ,arguments) {

    return await func(arguments)      
      .catch(e => {
          console.log('error ','retrying',funcName,retryCount)
          return retry(func, retryCount + 1,funcName,arguments);
      })
      
  }

// API call to get Rext
async function getText (){

    let text = await rp.get({
        url:'https://join.reckon.com/test2/textToSearch',
        json:true
    })

    return text

}

//API call to get Subtext
async function getSubTexts (){

    let subTexts = await rp.get({
        url:'https://join.reckon.com/test2/subTexts',
        json:true
    })

    return subTexts

}

//API call to post results
async function postResults ( data ){

    let subTexts = await rp({
        method: 'POST',
        url:'https://join.reckon.com/test2/submitResults',
        json:true ,
        body: data
    })

    return subTexts
    
}


// Look for all case-insensitive occurences of a subtext within a text
function find (subtext, text){

    let indecises ='';
    let matchedSubText='';

    // Iterate over Text
    for (let textItertor=0, subTextIterator=0; textItertor < text.length; textItertor++){

        if (text[textItertor].toLowerCase() == subtext[subTextIterator].toLowerCase()) {
            matchedSubText += text[textItertor]
            subTextIterator ++;

        }else{
            // Reset as soon as we get a mismatching character 
            matchedSubText =''
            subTextIterator = 0;
        }

        // Once we find a match, store index and reset subtext's iterator --
        if(matchedSubText.length == subtext.length){
            indecises += `${ indecises.length==0 ? '' : ', ' }${ textItertor - matchedSubText.length + 2 }`;
            matchedSubText = '';
            subTextIterator = 0;
        }
    }

    if (!indecises) 
        indecises = "<No Output>"
    return {
        subtext : subtext,
        result: indecises
    }
}



async function matchAndPostResults (){


        let text = await retry( getText, 0, 'getText' );
        let subTexts = await retry( getSubTexts, 0, 'getSubTexts' );

        let results = []
        for (let subtext of subTexts.subTexts){
           results.push(find(subtext,text.text) )
        }

        await retry ( postResults , 0, 'postResutls' ,  {
            candidate: "Tedy Hitti",
            text: text.text ,
            results: results
        })

        


}

module.exports= { matchAndPostResults }