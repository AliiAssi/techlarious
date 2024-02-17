// Array destructuring
const numbers = [1, 2, 3, 4, 5];

// Extract values from the array into variables
const [first, second, , fourth] = numbers;

console.log(first);  // Output: 1
console.log(second); // Output: 2
console.log(fourth); // Output: 4

console.log("****************************************************************"); 
const person ={
    "name": "John",
    "age": 34
}
let {name, age} = person
console.log(name);
console.log(age);
console.log("****************************************************************");

const allMyMembers = ["John1", "John2", "John3", "John4", "John5", "John6", "John7", "John8", "John9", "John10"];

const [firstStudent, ...others] = allMyMembers.slice(0, -1);

console.log("First Student:", firstStudent);
console.log("Others:", others);
console.log("****************************************************************")
const childs = {
    "child1" : "child1",
    "child2" : "child2",
}
const parents = {
    "father" : "father",
    "mother" : "mother"
}
let family = {
    childs,parents
}
family = {
    ...family,
    country : "country",
    city : "city"
}
console.log("Family:", family)
console.log("*****************************************************************")
let names = ['ali', 'ahmad', 'kifah'];
let ages = [23, 98, 100];
let mergeArrays = [...names,...ages]
console.log(mergeArrays)
// Create an object with names as keys and ages as values
let people = {};
for (let i = 0; i < names.length; i++) {
  people[names[i]] = ages[i];
}

console.log("People:", people);




