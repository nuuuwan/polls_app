const SEARCH_TEXT_TO_EMOJI = {
  yes: "👍",
  no: "👎",
  undecided: "🤔",
};

export default function Emoji({ text }) {
  let renderedText = text;
  for (let [searchText, emoji] of Object.entries(SEARCH_TEXT_TO_EMOJI)) {
    if (text.toLowerCase().includes(searchText)) {
      renderedText += " " + emoji;
    }
  }

  return renderedText;
}
