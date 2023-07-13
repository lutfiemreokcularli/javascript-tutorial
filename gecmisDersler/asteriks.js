function replaceLettersAfterFirst(str) {
  var words = str.split(" "); // Split the string into an array of words
  var result = ""; // Initialize the result string
  
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var modifiedWord = word.charAt(0); // Get the first letter of the word
    
    if (word.length > 1) {
      modifiedWord += word.substring(1).replace(/./g, '*'); // Replace remaining letters with '*'
    }
    
    result += modifiedWord + " "; // Append the modified word to the result string
  }
  
  return result.trim(); // Trim any leading/trailing whitespace before returning the result
}

// Example usage
var input = "Hello";
var output = replaceLettersAfterFirst(input);
console.log(output);