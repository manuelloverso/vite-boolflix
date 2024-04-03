<script>
import { store } from "../store.js";

export default {
  name: "MovieCard",
  props: {
    movie: Object,
    title: String,
    originalTitle: String,
  },
  data() {
    return {
      store,
    };
  },

  methods: {
    divideForTwo(n) {
      n = Math.ceil(n / 2);
      return n;
    },
  },
};
</script>
<template>
  <li>
    <img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="" />
    {{ title }}
    {{ originalTitle }}
    {{ movie.original_language }}
    {{ movie.vote_average }}
    <i
      v-for="n in divideForTwo(movie.vote_average)"
      class="fa-solid fa-star"
    ></i>
    <i
      v-for="n in 5 - divideForTwo(movie.vote_average)"
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
