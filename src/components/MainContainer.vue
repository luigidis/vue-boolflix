<template>
  <div class="main container py-5">
    <input type="text" v-model="query">
    <button class="ms-2" @click="searchMovies">Cerca!</button>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>
${this.api_key}
${this.query}
<script>
import axios from 'axios'

export default {
  name: 'MainContainer',
  data() {
    return {
      movies: [],
      api_key: '7b5d3ffe89177bc82927826d88ed3293',
      query: '',
      BASE_URL: 'https://api.themoviedb.org/3',
    }
  },
  methods: {
    searchMovies() {
      axios
        .get(`${this.BASE_URL}/search/movie`, {
          params: {
            api_key: this.api_key,
            query: this.query,
          }
        })
        .then((res) => {
          console.log(res)
          this.movies = res.data.results
        })
    }
  },
  created() {
    this.searchMovies()
  }
}

</script>


<style scoped lang="scss">

</style>
