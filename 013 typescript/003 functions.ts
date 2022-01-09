function getAverage(a:number,b:number,c?:number):string{
    let total = a+b;
    let count = 2;
    if(typeof c !== 'undefined'){
        total+=c;
        count++;
    }
    const result = total/count;
    return 'result : ' + result;
}

getAverage(10,20,30);
getAverage(10,20);


//
function getAverageParameter(...a:number[]):string{
    let total = 0;
    let count = a.length;
    for(let i = 0;i<count;i++){
        total += a[i];
    }
    return "result : " + (total/count);
}

getAverageParameter(10,20,30);
getAverageParameter(10,20,30,40);