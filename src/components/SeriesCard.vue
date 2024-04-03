<script>
import { store } from "../store.js";

export default {
  name: "SeriesCard",
  props: {
    singleSeries: Object,
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
    {{ singleSeries.name }}
    {{ singleSeries.original_name }}
    {{ singleSeries.original_language }}
    {{ singleSeries.vote_average }}
    <i
      v-for="n in store.divideForTwo(singleSeries.vote_average)"
      class="fa-solid fa-star"
    ></i>
    <i
      v-for="n in 5 - store.divideForTwo(singleSeries.vote_average)"
      class="fa-regular fa-star"
    ></i>
    <img
      width="40"
      :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${singleSeries.original_language.toUpperCase()}.svg`"
      alt=""
    />
  </li>
</template>
<style scoped></style>
