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
    <input v-model="store.search" type="text" />
    <button @click="store.callApi">Click Me</button>
    <h1>Movies</h1>
    <ul>
      <li v-for="movie in store.movies">
        {{ movie.title }}
        {{ movie.original_title }}
        {{ movie.original_language }}
        {{ movie.vote_average }}
        <img
          width="50"
          :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${movie.original_language.toUpperCase()}.svg`"
          alt=""
        />
      </li>
    </ul>
    <h1>Series</h1>
    <ul>
      <li v-for="singleSeries in store.series">
        {{ singleSeries.name }}
        {{ singleSeries.original_name }}
        {{ singleSeries.original_language }}
        {{ singleSeries.vote_average }}
        <img
          width="50"
          :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${singleSeries.original_language.toUpperCase()}.svg`"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
