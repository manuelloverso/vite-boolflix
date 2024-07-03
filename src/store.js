import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  carouselMovies: [],
  popularLoading: true,
  movies: [],
  popular: [],
  series: [],
  search: "",
  searched: false,
  filtered: false,
  filteredMovies: [],
  filteredSeries: [],
  loading: false,

  //get a list of the most popular movies
  popularMovies() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=84160a7353d1d37c7ead96a2fcac030a"
      )
      .then((resp) => {
        this.popular = resp.data.results;
        for (let i = 0; i < 4; i++) {
          this.carouselMovies.push(resp.data.results[i]);
        }
        this.popularLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //returns the movies and tv series list when the search is submitted
  callApi() {
    (this.loading = true), (this.searched = true);
    this.filtered = false;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${this.search}`
      )
      .then((response) => {
        this.movies = response.data.results;
        this.loading = false;
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
