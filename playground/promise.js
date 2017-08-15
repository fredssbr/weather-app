var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('Arguments must be numbers.');
            }
        }, 1500);
    });
};

/**
 * The problem with this approach is that once the first promise fails,
 * it calls the resolve for the second promise. 
 * Use catch method to resolve all promises' rejections.
 */
asyncAdd(5, '7').then((res) => {
    console.log('Result: ', res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('Should be 45: ', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         /**
//          * Promises (ES6) can only call either resolve or reject once, never both, unlike our callbacks, 
//          * which we can call more than once.
//          */
//         resolve('Hey. It worked!');
//         //reject('Unable to fulfill promise.');
//     }, 3000);
// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) =>{
//     console.log('Error: ', errorMessage);
// });