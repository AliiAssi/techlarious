var p = new Promise((resolve, reject) => {
    let s = {
        "name": "student name",
        "Age": 51
    }
    if (s.Age === 50) {
        resolve(`resolving: student name = ${s.name} with ${s.Age} years old`);
    } else {
        reject(`rejecting: student name = ${s.name} with ${s.Age} years old`);
    }
});

p
    .then(msg => console.log(msg))
    .catch(err => console.log(err));

console.log("*********************************************************************");

var promise1 = new Promise((resolve, reject) => resolve("success1"));
var promise2 = new Promise((resolve, reject) => resolve("success2"));
var allPromises = [promise1, promise2];

Promise.all(allPromises)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
    
