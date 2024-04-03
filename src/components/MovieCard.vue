<script>
import { store } from "../store.js";

export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <li>
    {{ movie.title }}
    {{ movie.original_title }}
    {{ movie.original_language }}
    {{ movie.vote_average }}
    <i
      v-for="n in store.divideForTwo(movie.vote_average)"
      class="fa-solid fa-star"
    ></i>
    <i
      v-for="n in 5 - store.divideForTwo(movie.vote_average)"
      class="fa-regular fa-star"
    ></i>
    <img
      width="50"
      :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${movie.original_language.toUpperCase()}.svg`"
      alt=""
    />
  </li>
</template>
<style scoped></style>
