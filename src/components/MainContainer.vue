<template>
  <div class="main">
    <div class="navbar_start">
      <h1>BoolFlix</h1>
      <div>
        <input type="text" v-model="query" placeholder="Cerca...">
        <button id="search" class="ms-2" @click="clickSearch">Cerca!</button>
      </div>
    </div>
    <div class="card_container">
      <h2 :class="moviesActive">Films</h2>
      <ul class="card_list">
        <li v-for="movie in movies" :key="movie.id">
          <div class="card_figure">
            <img :src="poster_url + movie.poster_path" :alt="movie.title">
            <div class="card_absolute">
              <div>Titolo:{{ movie.title }}</div>
              <div>Titolo Originale:{{ movie.original_title }}</div>
              <div class="pe-2">Lingua:
                <lang-flag :iso="movie.original_language" :squared="false" />
              </div>
              <div>
                {{movie.overview}}
              </div>
              <ul class="d-flex">
                Voto:
                <li v-for="n in getStars(movie.vote_average)" :key="n" class="color_yellow">
                  <font-awesome-icon icon="fa-solid fa-star" />
                </li>
                <li v-for="n in (5 - (getStars(movie.vote_average)))" :key="n + getStars(movie.vote_average)">
                  <font-awesome-icon icon="fa-regular fa-star" />
                </li>
              </ul>
            </div>
          </div>

        </li>
      </ul>


      <h2 :class="seriesActive">Series</h2>
      <ul class="card_list">
        <li v-for="serie in series" :key="serie.id">
          <div class="card_figure">
            <img :src="poster_url + serie.poster_path" :alt="serie.name">
            <div class="card_absolute">
              <div>Titolo: {{ serie.name }}</div>
              <div>Titolo Originale: {{ serie.original_name}}</div>
              <div>Lingua:
                <lang-flag :iso="serie.original_language" :squared="false" />
              </div>
              <div>
                {{ serie.overview }}
              </div>
              <div>
                <ul class="d-flex">
                  Voto:
                  <li v-for="n in getStars(serie.vote_average)" :key="n" class="color_yellow">
                    <font-awesome-icon icon="fa-solid fa-star" />
                  </li>
                  <li v-for="n in (5 - (getStars(serie.vote_average)))" :key="n + getStars(serie.vote_average)">
                    <font-awesome-icon icon="fa-regular fa-star" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      poster_url: 'http://image.tmdb.org/t/p/w342/',
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
      console.log('Le stelle sono:' + stars)
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

  ul,
  ol,
  menu {
    list-style: none;
  }

  h2 {
    display: none;
  }

  .active {
    display: block;
  }

  .navbar_start {
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;

    h1 {
      color: red;
      font-size: 1.2rem;
      text-transform: uppercase;

    }
  }

  .card_container {
    .card_list {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      justify-content: center;
      align-items: center;

      .card_figure {
        position: relative;

        .card_absolute {
          display: none;
          flex-direction: column;
          justify-content: center;
          padding: 10px 3px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          max-width: 342px;
          background-color: black;
          color: white;
          font-size: 0.8rem;
          gap: 5px;
          
          ul {
            padding-left: 0;
          }

          .color_yellow {
            color: yellow;
          }
        }
      }

      .card_figure:hover .card_absolute {
        display: flex;
      }
    }
  }
}
</style>


      



