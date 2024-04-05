<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "GenresFilter",
  data() {
    return {
      store,
      allGenres: [],
    };
  },

  methods: {
    getAllGenres() {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=84160a7353d1d37c7ead96a2fcac030a"
        )
        .then((response) => {
          this.allGenres = response.data.genres;
        });
    },

    filterMovies(genreId) {
      store.filtered = true;
      store.filteredMovies = [];
      store.filteredSeries = [];

      console.log(store.movies);

      //save filtered movies
      store.movies.forEach((movie) => {
        if (movie.genre_ids.includes(genreId)) {
          store.filteredMovies.push(movie);
        }
      });

      //save filtered tv series
      store.series.forEach((show) => {
        if (show.genre_ids.includes(genreId)) {
          store.filteredSeries.push(show);
        }
      });
    },
  },

  mounted() {
    this.getAllGenres();
  },
};
</script>
<template>
  <h3>Filter by genre:</h3>
  <ul>
    <li @click="filterMovies(genre.id)" v-for="genre in allGenres">
      {{ genre.name }}
    </li>
  </ul>
</template>
<style scoped>
h3 {
  font-weight: 400;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & li {
    cursor: pointer;
  }
}
</style>
