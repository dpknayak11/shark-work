// Question: 1.......
// console.log('a');
// console.log('b');
// setTimeout(() => console.log('c'), 3000)
// console.log('d');

//Answer..........
// Define a function that returns a promise that resolves after a given time.
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Define an async function that prints the sequence
async function printSequence() {
    console.log('a');
    console.log('b');
    await wait(3000); // Wait for 3 seconds
    console.log('c');
    console.log('d');
    console.log('e');
}
// Call the function
printSequence();
// ..............................................................

// Question: 2.......
// console.log('a');
// console.log('b');
// setTimeout(() => console.log('c'), 3000)
// setTimeout(() => console.log('d'), 0)
// console.log('e');

//Answer..........
// Define a function that returns a promise that resolves after a given time.
// function wait2(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// // Define an async function that prints the sequence
// async function printSequence2() {
//     console.log('a');
//     console.log('b');
//     await wait2(3000);// Wait for 3 seconds
//     console.log('c');
//     await wait2(0);
//     console.log('d');
//     console.log('e');
// }
// // Call the function
// printSequence2();


// ...........................................................
// const fetchData = () => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Done!');
//         }, 1000);
//     });
//     return promise;
// }
// setTimeout(() => {
//     console.log('Start...');
//     fetchData().then((text) => {
//         console.log(text);
//         return fetchData();
//     }).then((text2) => console.log(text2));
// }, 2000);
