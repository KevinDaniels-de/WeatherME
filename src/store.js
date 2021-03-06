import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: JSON.parse(localStorage.getItem('current')),
    forecastWeather: JSON.parse(localStorage.getItem('forecast'))
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

        var ico = res.data.weather[0].icon;
        var d = new Date();
        
        if(ico.includes("01"))
          if(d.getHours() > 6 && d.getHours() < 22)
            weather.icon = "sun";
          else
            weather.icon = "moon";
        else if(ico.includes("02") || ico.includes("03") || ico.includes("04"))
          weather.icon = "cloud";
        else if(ico.includes("09") || ico.includes("10"))
          weather.icon = "cloud-rain";
        else if(ico.includes("11"))
          weather.icon = "bolt";
        else if(ico.includes("13"))
          weather.icon = "snowflake";
        else
          weather.icon = "smog";

        weather.time = res.data.dt;

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

        let el = document.querySelector('.toast');

        if(!el.classList.contains('active'))
          el.classList.add('active');

        setTimeout(() => {
          el.classList.remove('active');
        }, 1000);

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

          var date = new Date(e.dt * 1000);
          var curr = new Date();

          if(date.getHours() == 13 && curr.getDay() != date.getDay()) {

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

            var ico = e.weather[0].icon;
            var d = new Date();

            if(ico.includes("01"))
              if(d.getHours() > 6 && d.getHours() < 22)
                singleWeather.icon = "sun";
              else
                singleWeather.icon = "moon";
            else if(ico.includes("02") || ico.includes("03") || ico.includes("04"))
              singleWeather.icon = "cloud";
            else if(ico.includes("09") || ico.includes("10"))
              singleWeather.icon = "cloud-rain";
            else if(ico.includes("11"))
              singleWeather.icon = "bolt";
            else if(ico.includes("13"))
              singleWeather.icon = "snowflake";
            else
              singleWeather.icon = "smog";

            singleWeather.temp = (e.main.temp | 0) + "°";
            singleWeather.tempMax = (e.main.temp_max | 0) + "°";

            arr.push(singleWeather);
          }
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
