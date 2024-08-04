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

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  const result = parts.map(function (part, index) {
    return part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="bg-yellow-300">
        {part}
      </span>
    ) : (
      part
    );
  });

  return result;
}

export default highlightText;
