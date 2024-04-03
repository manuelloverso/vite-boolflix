<script>
//Imports
import MovieCard from "./components/MovieCard.vue";
import { store } from "./store.js";

export default {
  name: "App",
  components: {
    MovieCard,
  },
  data() {
    return {
      store,
      movies: [],
    };
  },

  created() {},
};
</script>
<template>
  <div class="search-bar">
    <input v-model="store.search" type="text" />
    <button @click="store.getMovies">Click Me</button>
    <ul>
      <li v-for="movie in store.movies">
        {{ movie.title }}
        {{ movie.original_title }}
        {{ movie.original_language }}
        {{ movie.vote_average }}
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
