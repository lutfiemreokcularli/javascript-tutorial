function convertLettersToAsterisks(paragraph) {
  // Split the paragraph into an array of lines
  const lines = paragraph.split('\n');

  // Iterate over each line
  const modifiedLines = lines.map(line => {
    let isHyphenProcessed = false;
    // Split the line into an array of words
    const words = line.split(' ');

    // Iterate over each word
    const modifiedWords = words.map(word => {
      // Find the index of the first hyphen character in the word
      const hyphenIndex = word.indexOf('-');
      if (hyphenIndex == 0)
        isHyphenProcessed = true;

      if (!isHyphenProcessed) {
        // Extract the first two letters of the word
        const firstTwoLetters = word.substring(0, 2);

        // Convert the remaining letters (after the first two letters) to asterisks
        const convertedPart = word.substring(2, hyphenIndex !== -1 ? hyphenIndex : undefined).replace(/./g, '*');

        // Concatenate the first two letters with the converted part and the remaining part of the word
        const modifiedWord = firstTwoLetters + convertedPart;

        return modifiedWord;
      } else if (isHyphenProcessed) {
        return word;
      }

    });

    // Join the modified words back into a line
    const modifiedLine = modifiedWords.join(' ');

    return modifiedLine;
  });

  // Join the modified lines back into a paragraph
  const modifiedParagraph = modifiedLines.join('\n');

  return modifiedParagraph;
}

// Example usage
let inputParagraph = `This is a - sample paragraph
  with multiple - lines.
  Each line may contain hyphens - to separate information.`;
inputParagraph = convertLettersToAsterisks(inputParagraph);
console.log(inputParagraph);