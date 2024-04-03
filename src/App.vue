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
    <input type="text" />
    <button @click="store.getMovies">Click Me</button>
    <ul>
      <li v-for="movie in store.movies">{{ movie.original_title }}</li>
    </ul>
  </div>
</template>
<style scoped></style>
