<script>
import axios from "axios";
import { store } from "../store.js";
import { hasFlag } from "country-flag-icons";

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
      hasFlag,
      store,
      apiKey: "84160a7353d1d37c7ead96a2fcac030a",
      isHover: false,
      cutActors: [],
      genres: [],
    };
  },

  methods: {
    divideForTwo(n) {
      n = Math.ceil(n / 2);
      return n;
    },

    editLanguages(array) {
      array.forEach((movie) => {
        if (movie.original_language == "en") {
          movie.original_language = "gb";
        } else if (movie.original_language == "ja") {
          movie.original_language = "jp";
        }
      });
    },

    getGenres(id) {
      axios
        .get(
          `https://api.themoviedb.org/3/${
            this.isMovie == true ? "movie" : "tv"
          }/${id}?api_key=84160a7353d1d37c7ead96a2fcac030a`
        ) // i use ternary operator to generate different api calls based on wether im searching the genres for a movie or a tv series
        .then((response) => {
          this.genres = response.data.genres.map((el) => el.name);
          this.genres = this.genres.join(", ");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getActors(id) {
      axios
        .get(
          `https://api.themoviedb.org/3/${
            this.isMovie == true ? "movie" : "tv"
          }/${id}/credits?api_key=84160a7353d1d37c7ead96a2fcac030a`
        )
        .then((response) => {
          const actors = response.data.cast.map((el) => el.name);
          this.cutActors = actors.slice(0, 4).join(", ");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    this.getGenres(this.movie.id);
    this.getActors(this.movie.id);
    this.editLanguages(store.movies);
    this.editLanguages(store.series);
  },
};
</script>
<template>
  <!-- Single Card -->
  <li v-if="movie.poster_path != null" class="movie-card">
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
      <p><span>Genres: </span>{{ genres }}</p>
      <p><span>Actors: </span>{{ cutActors }}</p>

      <!-- Generate vote stars -->
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
        <!-- Movie /Show Language -->
        <span>Language: </span>
        <img
          v-if="hasFlag(movie.original_language.toUpperCase())"
          width="25"
          :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${movie.original_language.toUpperCase()}.svg`"
          alt=""
        />
        <span v-else>{{ movie.original_language }}</span>
      </p>
    </div>
  </li>
</template>
<style scoped>
.movie-card {
  width: calc((100% / 6) - 17px);
  aspect-ratio: 0.7;
  position: relative;

  .poster-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    .showed {
      transform: rotateY(180deg);
    }

    .hidden {
      transform: rotateY(0);
    }
  }
}

.hidden {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  padding: 15px;
  box-shadow: black 0 0 30px 4px;
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transition: transform 0.7s;

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
  transition: transform 0.7s;
  box-shadow: black 0 0 30px 4px;
  backface-visibility: hidden;
  height: 100%;
}
</style>
