let rp = require ('request-promise')

// Retry in case of failure
async function retry(func, retryCount = 1,funcName) {
    return await func()      
      .catch(e => {
          console.log('error ','retrying',funcName,retryCount)
          return retry(func, retryCount + 1,funcName);
      })
      
  }

// API call to get rangeinfo
async function getRangeInfo (){
    let rangeInfo = await rp.get({
        url:'https://join.reckon.com/test1/rangeInfo',
        json:true
    })
    return rangeInfo
}

// API call to get divisorInfo
async function getDivisorInfo(){
    let divisorInfo = await rp.get({
        url:'https://join.reckon.com/test1/divisorInfo',
        json:true
    })
    return divisorInfo
}

// compare function used to sort the divisor info in ascending order based on divisor attribute
function compare(a,b){

    if( a.divisor < b.divisor )
        return -1;
    else if ( a.divisor > b.divisor )
        return 1
    else 
        return 0
}

// Check divibilty
function checkDivisibility(from,to,divisorArray){

    var results = ''

    for (let current=from; current <= to ; current++){
        let output='';

        for (let item of divisorArray){
            
            // skip dividing by 0
            if (item.divisor == 0)
                continue;;

            // if result is less than 0 , there is no point to continue (array is sorted in ascending order)
            if (current / item.divisor < 1 ) {
                break;;
            }

            // if remainder is 0 .. store current item
            if ( current % item.divisor == 0) {
                output += item.output;
            }
     
        }

        results+=(`${current} : ${output}<br>`)
    }

    return(results)
}





async function getDivisibility(){

    let rangeInfo = await retry( getRangeInfo, 0, 'getRangeInfo' );

    let divisorInfo = await retry(getDivisorInfo, 0, 'getDdivisorIngo');

    // sort divisor info in ascending order 
    let sortedDivisorInfo = divisorInfo.outputDetails.sort(compare);

    let results = checkDivisibility(rangeInfo.lower, rangeInfo.upper, sortedDivisorInfo);
    return results;

}



module.exports= { getDivisibility }