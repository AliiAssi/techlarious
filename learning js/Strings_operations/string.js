// Create a string
let originalString = "Hello, World!";

// Convert the string to uppercase
let uppercaseString = originalString.toUpperCase();
console.log("Uppercase String:", uppercaseString);

// Extract a substring
let substring = originalString.substring(7, 12); // Extracts characters from index 7 to 11
console.log("Substring:", substring);

// Find the index of a specific character
let indexOfW = originalString.indexOf('W');
console.log("Index of 'W':", indexOfW);

// Concatenate strings
let additionalString = " How are you?";
let concatenatedString = originalString + additionalString;
console.log("Concatenated String:", concatenatedString.trim());

// Replace a substring
let replacedString = originalString.replace('World', 'Universe');
console.log("Replaced String:", replacedString);

// Check if a string contains a certain phrase
let containsPhrase = originalString.includes('Hello');
console.log("Contains 'Hello':", containsPhrase);

// Split the string into an array
let splitArray = originalString.split(' ');
console.log("Split String Array:", splitArray);
