<script>
export default {
  name: "SeriesCard",
  props: {
    singleSeries: Object,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <li>
    {{ singleSeries.name }}
    {{ singleSeries.original_name }}
    {{ singleSeries.original_language }}
    {{ singleSeries.vote_average }}
    <img
      width="40"
      :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${singleSeries.original_language.toUpperCase()}.svg`"
      alt=""
    />
  </li>
</template>
<style scoped></style>
