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
      const activeGenre = document.querySelector(".active");
      if (activeGenre) {
        activeGenre.classList.remove("active");
      }
      const selected = document.getElementById("genre" + genreId);
      console.log(selected);
      selected.classList.add("active");

      //save filtered movies
      store.filteredMovies = store.movies.filter((movie) => {
        if (movie.genre_ids.includes(genreId)) {
          return movie;
        }
      });

      //save filtered tv series
      store.filteredSeries = store.series.filter((show) => {
        if (show.genre_ids.includes(genreId)) {
          return show;
        }
      });
    },

    removeFilters() {
      store.filtered = false;
      store.filteredMovies = [];
      store.filteredSeries = [];
      const activeGenre = document.querySelector(".active");
      if (activeGenre) {
        activeGenre.classList.remove("active");
      }
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
    <li
      class="genre"
      :id="'genre' + genre.id"
      @click="filterMovies(genre.id)"
      v-for="genre in allGenres"
    >
      {{ genre.name }}
    </li>
  </ul>
  <button
    v-if="store.filtered == true"
    @click="removeFilters()"
    class="remove-btn"
  >
    remove filter
  </button>
</template>
<style scoped>
.active {
  color: red;
}

.remove-btn {
  margin: 10px 0;
  cursor: pointer;
  border: none;
  color: white;
  padding: 5px 10px;
  background-color: red;
  border-radius: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(255, 103, 103);
  }
}
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
