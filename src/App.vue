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
    };
  },

  mounted() {},
};
</script>
<template>
  <div class="search-bar">
    <input v-model="store.search" type="text" @keyup.enter="store.callApi" />
    <button @click="store.callApi">Click Me</button>
    <h1>Movies</h1>
    <ul>
      <!-- Loop to generate movie cards -->
      <MovieCard
        :movie="movie"
        :title="movie.title"
        :originalTitle="movie.original_title"
        v-for="movie in store.movies"
        :key="movie.id"
      />
    </ul>
    <h1>Series</h1>
    <ul>
      <!-- Loop to generate series cards -->
      <MovieCard
        :movie="singleSeries"
        :title="singleSeries.name"
        :originalTitle="singleSeries.original_name"
        v-for="singleSeries in store.series"
        :key="singleSeries.id"
      />
    </ul>
  </div>
</template>
<style scoped></style>
