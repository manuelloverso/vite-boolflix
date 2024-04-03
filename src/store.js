import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  movies: [],
  search: "",

  getMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${this.search}`
      )
      .then((response) => {
        this.movies = response.data.results;
      });
  },
});
