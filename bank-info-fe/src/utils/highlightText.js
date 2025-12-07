/**
 * Highlights the matched search terms in the given text.
 *
 * @param {string} text - The text to search within.
 * @param {string} highlight - The term to highlight.
 * @returns {string | JSX.Element} - The text with highlighted terms or the original text if no highlight term is provided.
 */
function highlightText(text, highlight) {
  if (!highlight) {
    return text;
  }

  const words = highlight.split(" ");
  const regex = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(regex);
  const result = parts.map(function (part, index) {
    const match = words.some(function (word) {
      return part.toLowerCase() === word.toLowerCase();
    });
    if (match) {
      return (
        <span key={index} className="bg-[#175430] px-1">
          {part}
        </span>
      );
    }
    return part;
  });

  return result;
}

export default highlightText;
