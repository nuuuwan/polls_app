const URL_BASE = [
  "https://raw.githubusercontent.com",
  "nuuuwan/polls_app/main/public",
].join("/");

const URL_CLICK = URL_BASE + "/tabla-click.mp3";
const URL_VOTE = URL_BASE + "/tabla-vote.mp3";

export default class AudioX {
  static tracks = {
    click: new Audio(URL_CLICK),
    vote: new Audio(URL_VOTE),
  };

  static async playIfNotNull(track) {
    if (track && track.play) {
      await track.play();
    }
  }

  static async playVote() {
    await this.playIfNotNull(this.tracks.vote);
  }

  static async playClick() {
    await this.playIfNotNull(this.tracks.click);
  }
}
