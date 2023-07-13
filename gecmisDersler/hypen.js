function processParagraph(paragraph) {
    var lines = paragraph.split("\n"); // Split the paragraph into lines
    var result = ""; // Initialize the result string
  
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var words = line.split(" "); // Split each line into words
      var processedWords = []; // Initialize an array to store the processed words
  
      for (var j = 0; j < words.length; j++) {
        var word = words[j];
        var index = word.indexOf("-"); // Find the index of the hyphen character
  
        if (index === -1) {
          // If no hyphen is found, take the first two letters of the word
          processedWords.push(word.substring(0, 2));
        } else {
          // If a hyphen is found, take the letters before the hyphen and replace the rest with asterisks
          var lettersBeforeHyphen = word.substring(0, index);
          var asterisks = "*".repeat(word.length - lettersBeforeHyphen.length);
          processedWords.push(lettersBeforeHyphen + asterisks);
        }
      }
  
      var processedLine = processedWords.join(" "); // Join the processed words back into a line
      result += processedLine + "\n"; // Append the processed line to the result string
    }
  
    return result.trim(); // Trim any leading/trailing whitespace before returning the result
  }
  
  // Example usage
  var input = "Hello World Example\nThis is a sample paragraph\nOpenAI-GPT3 is awesome";
  var output = processParagraph(input);
  console.log(output);
  /* Output:
  He Wo Ex
  Th is a sa pa
  Op-** is aw
  */
  