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
      isHover: false,
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
  <li
    v-if="movie.poster_path != null"
    class="movie-card"
    :class="{ reveal: isHover }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <!-- Showed movie poster -->
    <div class="showed">
      <img
        class="poster-img"
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
        alt=""
      />
    </div>

    <!-- Hidden Content which shows on hover -->
    <div class="hidden">
      <p><span>Title: </span>{{ title }}</p>
      <p><span>Title: </span>{{ originalTitle }}</p>
      <p>
        <span>Vote: </span>
        <i
          v-for="n in divideForTwo(movie.vote_average)"
          class="fa-solid fa-star"
        ></i>
        <i
          v-for="n in 5 - divideForTwo(movie.vote_average)"
          class="fa-regular fa-star"
        ></i>
      </p>
      <p><span>Overview: </span>{{ movie.overview }}</p>
      <div>
        <span>Language: </span>
        <img
          width="40"
          :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${handleLanguage(
            movie.original_language
          )}.svg`"
          alt=""
        />
      </div>
    </div>
  </li>
</template>
<style scoped>
.movie-card {
  width: calc((100% / 6) - 17px);
  position: relative;

  .poster-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hidden,
.showed {
  backface-visibility: hidden;
  transition: transform 0.5s;
  box-shadow: black 0 0 20px 3px;
}

.hidden {
  transform: rotateY(-180deg);
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
}

.showed {
  transform: rotateY(0);
  height: 100%;
}

.reveal .hidden,
.matched .hidden {
  transform: rotateY(0);
}

.reveal .showed,
.matched .showed {
  transform: rotateY(-180deg);
}
</style>
