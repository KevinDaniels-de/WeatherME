import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: {},
    forecastWeather: []
  },
  mutations: {
    SET_CURRENT(state, currentWeather) {
      state.currentWeather = currentWeather;

    },
    SET_FORECAST(state, forecastWeather) {
      state.forecastWeather = forecastWeather;
    }
  },
  actions: {
    updateCurrent({commit},coords) {
      axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+coords.x+"&lon="+coords.y+"&units=metric&lang=de&appid=86e998952dbf353098a6c9df63c8fb6d")
      .then(res => {
        console.log("##### NEW CURRENT #####");

        const weather = {
          temp: "",
          tempMax: "",
          place: "",
          day: "",
          desc: "",
          icon: "",
          time: ""
        };

        weather.temp = (res.data.main.temp | 0) + "°";
        weather.tempMax = (res.data.main.temp_max | 0) + "°";
        weather.place = res.data.name;
        weather.desc = res.data.weather[0].description;
        weather.icon = res.data.weather[0].icon;
        weather.time = res.data.coord.dt;

        switch (new Date(weather.time * 1000)) {
          case 1:
            weather.day = "Montag";
            break;
  
          case 2:
            weather.day = "Dienstag";
            break;
  
          case 3:
            weather.day = "Mittwoch";
            break;
  
          case 4:
            weather.day = "Donnerstag";
            break;
  
          case 5:
            weather.day = "Freitag";
            break;
  
          case 6:
            weather.day = "Samstag";
            break;
  
          default:
            weather.day = "Sonntag";
            break;
        }

        localStorage.setItem('current', JSON.stringify(weather));

        commit('SET_CURRENT', weather);
      })
      .catch(err => {
        console.log(err);
        var local = localStorage.getItem('current');
        var parse = JSON.parse(local);
        commit('SET_CURRENT', parse);
        
        if(err["request"].status == 429) {
          console.error("API Key überlastet!");
        } else {
          console.error("Verbindungsfehler! Die letzten gespeicherten Daten werden angezeigt");
        }
      });
    },

    updateForecast({commit}, coords) {
      axios.get("https://api.openweathermap.org/data/2.5/forecast?lat="+coords.x+"&lon="+coords.y+"&units=metric&lang=de&appid=86e998952dbf353098a6c9df63c8fb6d")
      .then(res => {
        console.log("##### NEW FORECAST #####");

        var arr = [];
        res.data.list.forEach(e => {

          const singleWeather = {
            id: "",
            day: "",
            icon: "",
            temp: "",
            tempMax: ""
          };

          singleWeather.id = e.dt;

          switch (new Date(singleWeather.id * 1000).getDay()) {
            case 1:
              singleWeather.day = "Montag";
              break;
    
            case 2:
              singleWeather.day = "Dienstag";
              break;
    
            case 3:
              singleWeather.day = "Mittwoch";
              break;
    
            case 4:
              singleWeather.day = "Donnerstag";
              break;
    
            case 5:
              singleWeather.day = "Freitag";
              break;
    
            case 6:
              singleWeather.day = "Samstag";
              break;
    
            default:
              singleWeather.day = "Sonntag";
              break;
          }

          singleWeather.icon = e.weather[0].icon;
          singleWeather.temp = (e.main.temp | 0) + "°";
          singleWeather.tempMax = (e.main.temp_max | 0) + "°";

          var date = new Date(singleWeather.id * 1000);
          var curr = new Date();

          if(date.getHours() == 14 && curr.getDay() != date.getDay())
            arr.push(singleWeather);
        });

        localStorage.setItem('savedate', new Date());
        localStorage.setItem('forecast', JSON.stringify(arr));

        commit('SET_FORECAST', arr);
      })
      .catch(err => {
        console.log(err);
        var local = localStorage.getItem('forecast');
        var parse = JSON.parse(local);

        commit('SET_FORECAST', parse);

        if(err["request"].status == 429) {
          console.error("API Key überlastet!");
        } else {
          console.error("Verbindungsfehler! Die letzten gespeicherten Daten werden angezeigt");
        }
      });
    }
  },
  getters: {
    currentWeather: state => state.currentWeather,
    forecastWeather: state => state.forecastWeather
  }
})
