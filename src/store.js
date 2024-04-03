import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  movies: [],

  getMovies() {
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=dune"
      )
      .then((response) => {
        this.movies = response.data.results;
      });
  },
});
