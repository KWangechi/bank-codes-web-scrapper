/**
 * Highlights the matched search terms in the given text.
 *
 * @param {string} text - The text to search within.
 * @param {string} highlight - The term to highlight.
 * @returns {string | JSX.Element} - The text with highlighted terms or the original text if no highlight term is provided.
 */
function highlightText(text, highlight) {
  if (!highlight?.trim()) {
    return text;
  }

  const words = highlight
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const regex = new RegExp(`(${words.join("|")})`, "gi");

  return text?.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-[#175430] px-1">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default highlightText;
