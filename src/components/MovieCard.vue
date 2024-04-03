<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <li>
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
</template>
<style scoped></style>
