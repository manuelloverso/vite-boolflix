import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  movies: [],
  series: [],
  search: "",
  searched: false,

  callApi() {
    this.searched = true;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${this.search}`
      )
      .then((response) => {
        this.movies = response.data.results;
      });

    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${this.search}`
      )
      .then((response) => {
        this.series = response.data.results;
      });
  },
});
