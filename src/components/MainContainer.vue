<template>
  <div class="main container py-5">
    <input type="text" v-model="query">
    <button class="ms-2" @click="clickSearch">Cerca!</button>
    <h2>Films</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <div>Titolo:{{ movie.title }}</div>
        <div>Titolo Originale:{{ movie.original_title }}</div>
        <div class="pe-2">Lingua:
          <lang-flag :iso="movie.original_language" :squared="false" />
        </div>
        <div>Voto: {{ movie.vote_average}}</div>
      </li>
    </ul>
    <h2>Series</h2>
    <ul class="series_container">
      <li v-for="serie in series" :key="serie.id">
        <div>Titolo: {{ serie.name }}</div>
        <div>Titolo Originale: {{ serie.original_name}}</div>
        <div>Lingua:
          <lang-flag :iso="serie.original_language" :squared="false" />
        </div>
        <div>Voto: {{ serie.vote_average }}</div>
      </li>

    </ul>
  </div>
</template>
        

<script>
import axios from 'axios'
import LangFlag from 'vue-lang-code-flags'

export default {
  name: 'MainContainer',
  components: {
    LangFlag,
  },
  data() {
    return {
      movies: [],
      series: [],
      api_key: '7b5d3ffe89177bc82927826d88ed3293',
      query: '',
      BASE_URL: 'https://api.themoviedb.org/3',
    }
  },
  methods: {
    searchMovies() {
      if (this.query.trim() === '')
        return
      axios
        .get(`${this.BASE_URL}/search/movie`, {
          params: {
            api_key: this.api_key,
            query: this.query,
          }
        })
        .then((res) => {
          // console.log(res)
          this.movies = res.data.results
        })
    },
    searchSeries() {
      if (this.query.trim() === '')
        return
      axios
        .get(`${this.BASE_URL}/search/tv`, {
          params: {
            api_key: this.api_key,
            query: this.query,
          }
        })
        .then((res) => {
          // console.log(res)
          this.series = res.data.results
        })
    },
    clickSearch() {
       this.searchMovies();
       this.searchSeries();
    }
  },
    
  created() {
    if (this.query) {
      this.clickSearch()
    }
  }
}
      



</script>


<style scoped lang="scss">

</style>
