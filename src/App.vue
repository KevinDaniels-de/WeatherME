<template>
  <div id="app">
    <div class="app-bg"></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <CurrentDay v-on:swipeUp="swipeUp" />
        <NextDays v-on:reloadData="startApp" />
      </div>
    </div>
    <div class="toast">
      <span>Daten wurden aktualisiert</span>
    </div>
  </div>
</template>

<script>
import CurrentDay from '@/views/CurrentDay.vue'
import NextDays from '@/views/NextDays.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import { mapState } from 'vuex'
 
let swiper, lat, long;

export default {
  name: 'app',
  components: {
    CurrentDay,
    NextDays
  },
  created() {
    this.startApp(this);
  },
  mounted() {
    var t = this;

    swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      resistanceRatio: 0
    });

    swiper.on('transitionStart', function () {
      let el = document.querySelector('.swiper-btn');
      let curr = document.querySelector('.current-day-section');

      if(swiper.isEnd) {
        if (!el.classList.contains('active')) el.classList.add('active');
        if (!curr.classList.contains('active')) curr.classList.add('active');
      }
      else {
        el.classList.remove('active');
        curr.classList.remove('active');
      }
    });

    window.addEventListener("resize", t.adjustHeight);
    t.adjustHeight();
  },
  computed: {
    currentWeather() {
      return this.$store.state.currentWeather
    }
  },
  methods: {
    adjustHeight() {
      document.getElementsByClassName('swiper-container')[0].style.height = window.innerHeight + 'px';
      swiper.update();
    },
    swipeUp() {
      if(swiper.isEnd) swiper.slidePrev();
      else swiper.slideNext();
    },
    startApp() {
      var t = this;

      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          
          // console.log(lat + " / " + long);
          const coords = {x: lat, y: long};
          
          t.$store.dispatch('updateCurrent', coords);
          t.$store.dispatch('updateForecast', coords);

          t.changeBackground();
        });
      } else {
        /* geolocation IS NOT available */
      }
    },
    changeBackground() {
      var d = new Date(this.currentWeather.time * 1000);
      var n = d.getHours();

      if(n >= 18) document.querySelector('.app-bg').classList.add('night');
      else if(n >= 12) document.querySelector('.app-bg').classList.add('evening');
      else if(n >= 6) document.querySelector('.app-bg').classList.add('day');
      else document.querySelector('.app-bg').classList.add('morning');
    }
  }
}
</script>

<style lang="scss">
$gr_morning: linear-gradient(0deg, #fda085 0%, #f6d365 100%);
$gr_day: linear-gradient(0deg, #2848b5 0%, #4c77d8 100%);
$gr_evening: linear-gradient(0deg, #f43b47 0%, #453a94 100%);
$gr_night: linear-gradient(0deg, #152f5d 0%, #2a5298 100%);

/* playfair-display-regular - latin */
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  src: local('Playfair Display Regular'), local('PlayfairDisplay-Regular'),
       url('./assets/fonts/playfair-display-v15-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/playfair-display-v15-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* roboto-regular - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'),
       url('./assets/fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/roboto-v20-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-900 - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  src: local('Roboto Black'), local('Roboto-Black'),
       url('./assets/fonts/roboto-v20-latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/roboto-v20-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

[v-cloak] {
  * {
    display:none;
    }
}

* {
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
}

body {
  font-size: 2rem;
  line-height: 1.618em;
  font-family: 'Playfair Display', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto', sans-serif;
}

.swiper-container {
  height: 100vh;

  .swiper-slide {
    height: auto;
  }
}

.btn {
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  border: 1px solid white;
  border-radius: 100px;
  padding: 0px 20px;
  font-size: 1rem;
  margin-top: 40px;

  svg {
    margin-right: 5px;
  }
}

.app-bg {
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-image: $gr_morning;

  &.morning {
    background-image: $gr_morning;
  }

  &.day {
    background-image: $gr_day;
  }

  &.evening {
    background-image: $gr_evening;
  }

  &.night {
    background-image: $gr_night;
  }
}

.toast {
    position: fixed;
    z-index: 1000;
    background: #000000b0;
    width: 90%;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 15px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-out;
    border-radius: 10px;

    span {
        font-size: 1.6rem;
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
}
</style>
