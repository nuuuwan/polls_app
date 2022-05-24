const URL_BASE = [
  "https://raw.githubusercontent.com",
  "nuuuwan/polls_app/main/public",
].join("/");

const URL_CLICK = URL_BASE + "/tabla-click.mp3";
const URL_VOTE = URL_BASE + "/tabla-vote.mp3";

export default class AudioX {
  constructor() {
    this.tracks = {
      click: new Audio(URL_CLICK),
      vote: new Audio(URL_VOTE),
    };
  }

  playVote() {
    this.tracks.vote.play();
  }

  playClick() {
    this.tracks.click.play();
  }
}
