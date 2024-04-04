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
    // @todo try to use computed properties

    divideForTwo(n) {
      n = Math.ceil(n / 2);
      return n;
    },

    handleLanguage(language) {
      if (language == "en") {
        language = "us";
      } else if (language == "ja") {
        language = "jp";
      }
      return language.toUpperCase();
    },
  },
};
</script>
<template>
  <li v-if="movie.poster_path != null" class="movie-card">
    <img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="" />
  </li>
</template>
<style scoped>
.movie-card {
  box-shadow: black 0 0 20px 3px;
  width: calc((100% / 6) - 17px);
  & img {
    display: block;
    width: 100%;
  }
}
</style>
<!-- {{ title }}
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
      :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${handleLanguage(
        movie.original_language
      )}.svg`"
      alt=""
    /> -->
