<script>
//Imports
import MovieCard from "./components/MovieCard.vue";
import SeriesCard from "./components/SeriesCard.vue";
import { store } from "./store.js";

export default {
  name: "App",
  components: {
    MovieCard,
    SeriesCard,
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
      <MovieCard :movie="movie" v-for="movie in store.movies" :key="movie.id" />
    </ul>
    <h1>Series</h1>
    <ul>
      <SeriesCard
        :singleSeries="singleSeries"
        v-for="singleSeries in store.series"
        :key="singleSeries.id"
      />
    </ul>
  </div>
</template>
<style scoped></style>
