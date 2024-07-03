<script>
//Imports
import MovieCard from "./components/MovieCard.vue";
import AppHeader from "./components/AppHeader.vue";
import GenresFilter from "./components/GenresFilter.vue";
import AppLoader from "./components/AppLoader.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import { store } from "./store.js";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
    AppHeader,
    MovieCard,
    GenresFilter,
    AppLoader,
  },
  data() {
    return {
      store,
    };
  },

  mounted() {
    store.popularMovies();
  },
};
</script>
<template>
  <div class="container">
    <!-- Site Header -->
    <AppHeader />

    <!-- Loader -->
    <template v-if="store.loading == true">
      <AppLoader />
    </template>

    <!-- Filters by genre bar -->
    <GenresFilter
      v-if="
        store.searched && store.movies.length > 0 && store.series.length > 0
      "
    />

    <!-- Site Main -->
    <main>
      <!-- this shows when nothing has been searched -->
      <div
        class="initial-view"
        v-if="store.searched == false && store.popularLoading == false"
      >
        <Carousel :autoplay="6000" :wrap-around="true">
          <Slide v-for="movie in store.carouselMovies" :key="movie">
            <div class="carousel__item">
              <h2 class="carousel-title">{{ movie.original_title }}</h2>
              <img
                class="carousel-img"
                :src="`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`"
                alt=""
              />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>

        <h2>Popular Movies</h2>
        <ul>
          <MovieCard
            v-for="movie in store.popular"
            :isMovie="true"
            :movie="movie"
            :title="movie.title"
            :originalTitle="movie.original_title"
            :key="movie.id"
          />
        </ul>
      </div>

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

      <template v-if="store.searched == true">
        <!-- Movies -->
        <h2 class="mt" id="movies" v-if="store.movies.length > 0">Movies</h2>
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
        <h2 class="mt" id="series" v-if="store.series.length > 0">TV Series</h2>
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
      </template>
    </main>
  </div>
</template>
<style>
.carousel-img {
  max-height: 600px;
  opacity: 0.5;
}

.carousel-title {
  position: absolute;
  z-index: 2;
  bottom: 50px;
  left: 30px;
}

.carousel__item {
  position: relative;
}

.carousel__icon {
  fill: white;
}
</style>
