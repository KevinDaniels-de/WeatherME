<template>
  <div id="app">
    <div class="app-bg"></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <CurrentDay v-bind:currentWeather="currentWeather" v-on:swipeUp="swipeUp" />
        <NextDays v-on:reloadData="startApp" v-bind:forecastWeather="forecastWeather"/>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentDay from '@/views/CurrentDay.vue'
import NextDays from '@/views/NextDays.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
 
let swiper, lat, long;

export default {
  name: 'app',
  data() {
    return {
      currentWeather: [],
      forecastWeather: []
    }
  },
  components: {
    CurrentDay,
    NextDays
  },
  updated() {
    lat = null;
    long = null;
  },
  mounted() {
    this.startApp(this);

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
  methods: {
    changeBackground() {
      var d = new Date(this.currentWeather.time);
      var n = d.getHours();

      if(n < 6) document.querySelector('.app-bg').classList.add('night');
      if(n < 12) document.querySelector('.app-bg').classList.add('morning');
      else if(n < 18) document.querySelector('.app-bg').classList.add('day');
      else document.querySelector('.app-bg').classList.add('evening');
    },
    adjustHeight() {
      document.getElementsByClassName('swiper-container')[0].style.height = window.innerHeight + 'px';
      swiper.update();
    },
    swipeUp() {
      if(swiper.isEnd) swiper.slidePrev();
      else swiper.slideNext();
    },
    outputDate(dateObject) {
      switch (dateObject.getDay()) {
        case 1:
          return "Montag";
          break;

        case 2:
          return "Dienstag";
          break;

        case 3:
          return "Mittwoch";
          break;

        case 4:
          return "Donnerstag";
          break;

        case 5:
          return "Freitag";
          break;

        case 6:
          return "Samstag";
          break;

        default:
          return "Sonntag";
          break;
      }
    },
    startApp() {
      var t = this;

      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
          if(lat == null) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
          }

          // console.log(lat + " / " + long);
          t.getData(lat, long);
        });
      } else {
        /* geolocation IS NOT available */
      }
    },
    getData(lat, long) {
      axios.get("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&units=metric&lang=de&appid=86e998952dbf353098a6c9df63c8fb6d")
      .then(res => {
        console.log("##### NEW DATA #####");

        var arr = [];
        res.data.list.forEach(e => {
          var date = new Date(e.dt*1000);
          var curr = new Date();

          if(date.getHours() == 14 && curr.getDay() != date.getDay())
            arr.push(e);
        });

        localStorage.setItem('savedate', new Date());
        localStorage.setItem('forecast', JSON.stringify(arr));

        this.forecastWeather = arr;
      })
      .catch(err => {
        console.log(err);
        var local = localStorage.getItem('forecast');
        this.forecastWeather = JSON.parse(local);
      });

      axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&lang=de&appid=86e998952dbf353098a6c9df63c8fb6d")
      .then(res => {
        const weather = {
          active: false,
          temp: "",
          tempMax: "",
          place: "",
          day: "",
          desc: "",
          icon: "",
          time: ""
        };

        weather.active = true;
        weather.temp = (res.data.main.temp | 0) + "°";
        weather.tempMax = (res.data.main.temp_max | 0) + "°";
        weather.place = res.data.name;
        weather.desc = res.data.weather[0].description;
        weather.icon = res.data.weather[0].icon;
        weather.time = res.data.coord.dt;
        weather.day = this.outputDate(new Date(weather.time * 1000));

        localStorage.setItem('current', JSON.stringify(weather));

        this.currentWeather = weather;
      })
      .catch(err => {
        console.log(err);
        var local = localStorage.getItem('current');
        this.currentWeather = JSON.parse(local);
        var date = localStorage.getItem('savedate');
        
        if(err["request"].status == 429) {
          console.error("API Key überlastet!");
        } else {
          console.error("Verbindungsfehler! Die letzten gespeicherten Daten werden angezeigt");
        }
      });
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

@media (orientation: landscape) and (max-width : 815px) {
  .swiper-container {
    display: none;
  }
}
</style>
