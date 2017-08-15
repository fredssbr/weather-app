console.log('Starting app');

//Register a callback to be executed after 2 seconds
setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

//It will print this after showing 'Finishing up' even with 0 seconds delay
setTimeout(() => {
    console.log('Inside of another timeout');
}, 0);

console.log('Finishing up');