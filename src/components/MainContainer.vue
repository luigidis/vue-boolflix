<template>
  <div class="main container py-5">
    <input type="text" v-model="query">
    <button id="search" class="ms-2" @click="clickSearch">Cerca!</button>
    <h2 :class="moviesActive">Films</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <div>Titolo:{{ movie.title }}</div>
        <div>Titolo Originale:{{ movie.original_title }}</div>
        <div class="pe-2">Lingua:
          <lang-flag :iso="movie.original_language" :squared="false" />
        </div>
        <div>
          Voto: {{ getStars(movie.vote_average) }}
          <li v-for="n in getStars(movie.vote_average)" :key="n">{{n}}</li>
        </div>
        <figure>
          <img :src="poster_url + movie.poster_path" :alt="movie.title">
        </figure>
      </li>
    </ul>
    <h2 :class="seriesActive">Series</h2>
    <ul class="series_container">
      <li v-for="serie in series" :key="serie.id">
        <div>Titolo: {{ serie.name }}</div>
        <div>Titolo Originale: {{ serie.original_name}}</div>
        <div>Lingua:
          <lang-flag :iso="serie.original_language" :squared="false" />
        </div>
        <div>
          Voto: {{ getStars(serie.vote_average) }}
          <ul>
            <li v-for="n in getStars(serie.vote_average)" :key="n">{{n}}</li>
          </ul>
        </div>
        <figure>
          <img :src="poster_url + serie.poster_path" :alt="serie.name">
        </figure>
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
      poster_url: 'http://image.tmdb.org/t/p/w154/',
      moviesActive: '',
      seriesActive: '',

    }
  },

  computed: {

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
          this.movies = res.data.results
          this.seriesActive = 'active'
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
          this.series = res.data.results
          this.moviesActive = 'active'
        })

    },

    clickSearch() {
      this.searchMovies();
      this.searchSeries();
    },
    getStars(vote) {
      const stars = Math.round(vote / 2)
      return stars
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
.main {
  h2 {
    display: none;
  }

  .active {
    display: block;
  }
}
</style>



