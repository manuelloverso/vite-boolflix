<script>
//Imports
import MovieCard from "./components/MovieCard.vue";
import AppHeader from "./components/AppHeader.vue";
import GenresFilter from "./components/GenresFilter.vue";

import { store } from "./store.js";

export default {
  name: "App",
  components: {
    AppHeader,
    MovieCard,
    GenresFilter,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <div class="container">
    <!-- Site Header -->
    <AppHeader />

    <!-- Filters by genre bar -->
    <GenresFilter
      v-if="
        store.searched && store.movies.length > 0 && store.series.length > 0
      "
    />

    <!-- Site Main -->
    <main>
      <h3 class="err-message" v-if="store.searched == false">
        Search any movies or tv series
      </h3>
      <h3
        class="err-message"
        v-if="
          store.movies.length == 0 &&
          store.series.length == 0 &&
          store.searched == true
        "
      >
        No Movie/TV Series found
      </h3>
      <!-- Movies -->
      <h2 id="movies" v-if="store.movies.length > 0">Movies</h2>
      <ul>
        <!-- Loop to generate movie cards -->
        <MovieCard
          v-if="store.filtered == false"
          :isMovie="true"
          :movie="movie"
          :title="movie.title"
          :originalTitle="movie.original_title"
          v-for="movie in store.movies"
          :key="movie.id"
        />
        <!-- This loops to generate only movies filtered by genre -->
        <MovieCard
          v-if="store.filtered"
          :isMovie="true"
          :movie="movie"
          :title="movie.title"
          :originalTitle="movie.original_title"
          v-for="movie in store.filteredMovies"
          :key="movie.id"
        />
      </ul>

      <!-- Series -->
      <h2 id="series" v-if="store.series.length > 0">TV Series</h2>
      <ul>
        <!-- Loop to generate series cards -->
        <MovieCard
          v-if="store.filtered == false"
          :isMovie="false"
          :movie="singleSeries"
          :title="singleSeries.name"
          :originalTitle="singleSeries.original_name"
          v-for="singleSeries in store.series"
          :key="singleSeries.id"
        />

        <!-- This loops to generate only tv series filtered by genre -->
        <MovieCard
          v-if="store.filtered"
          :isMovie="false"
          :movie="singleSeries"
          :title="singleSeries.name"
          :originalTitle="singleSeries.original_name"
          v-for="singleSeries in store.filteredSeries"
          :key="singleSeries.id"
        />
      </ul>
    </main>
  </div>
</template>
