<script>
import axios from "axios";
import { store } from "../store.js";

export default {
  name: "MovieCard",
  props: {
    isMovie: Boolean,
    movie: Object,
    title: String,
    originalTitle: String,
  },
  data() {
    return {
      store,
      apiKey: "84160a7353d1d37c7ead96a2fcac030a",
      isHover: false,
      genres: [],
      cutActors: [],
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

    getGenres(id, boolean) {
      /* axios
        .get(
          `https://api.themoviedb.org/3/${
            boolean == true ? "movie" : "tv"
          }/${id}?api_key=84160a7353d1d37c7ead96a2fcac030a`
        ) // i use ternary operator to generate different api calls based on wether im searching the genres for a movie or a tv series
        .then((response) => {
          this.genres = response.data.genres.map((el) => el.name);
        })
        .catch((err) => {
          console.error(err);
        });
      return this.genres.join(", "); */
      return "work in progress";
    },

    getActors(id, boolean) {
      axios
        .get(
          `https://api.themoviedb.org/3/${
            boolean == true ? "movie" : "tv"
          }/${id}/credits?api_key=84160a7353d1d37c7ead96a2fcac030a`
        )
        .then((response) => {
          const actors = response.data.cast.map((el) => el.name);
          this.cutActors = actors.slice(0, 4).join(", ");
        })
        .catch((err) => {
          console.error(err);
        });
      return this.cutActors;
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
      <p v-if="title != originalTitle">
        <span>Original title: </span>{{ originalTitle }}
      </p>
      <p><span>Genres: </span>{{ getGenres(movie.id, isMovie) }}</p>
      <p><span>Actors: </span>{{ getActors(movie.id, isMovie) }}</p>

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
      <p>
        <span>Language: </span>
        <img
          width="25"
          :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${handleLanguage(
            movie.original_language
          )}.svg`"
          alt=""
        />
      </p>
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
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  padding: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #373737;
  }

  & p {
    & span {
      font-size: 1.1rem;
      font-weight: 500;
    }
    & i {
      color: #ffe066;
    }
  }
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
