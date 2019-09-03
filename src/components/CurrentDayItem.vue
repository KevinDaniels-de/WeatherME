<template>
  <div class="current-day-ctn">
      <section v-cloak v-if="isGeoOn()" class="current-day-section">
        <div class="current-day-forecast">
          <h5>{{this.weather.day}}</h5>
          <span>{{this.weather.desc}}</span>
        </div>
        <div class="current-day-weather">
          <font-awesome-icon v-if="isSun() && isDay()" icon="sun" />
          <font-awesome-icon v-else-if="isSun() && !isDay()" icon="moon" />
          <font-awesome-icon v-else-if="isCloud()" icon="cloud" />
          <font-awesome-icon v-else-if="isRain()" icon="cloud-rain" />
          <font-awesome-icon v-else-if="isThunder()" icon="bolt" />
          <font-awesome-icon v-else-if="isSnow()" icon="snowflake" />
          <font-awesome-icon v-else icon="smog" />
          <h2>{{this.weather.temp}}°<span>{{this.weather.tempMax}}°</span></h2>
        </div>
        <div class="current-weater-location">
          <font-awesome-icon icon="map-marker-alt" />
          <span> {{this.weather.place}}</span>
        </div>
      </section>
  </div>
</template>

<script>
import axios from 'axios'
let lat, long;

export default {
  name: 'currentdayitem',
  props: ["weather"],
  methods: {
    isDay() {
      var d = new Date();

      if(d.getHours() > 6 && d.getHours() < 22)
        return true;

      return false;
    },
    isSun() {
      if(this.weather.icon.includes("01"))
        return true;

      return false;
    },
    isCloud() {
      if(this.weather.icon.includes("02") || this.weather.icon.includes("03") ||this.weather.icon.includes("04"))
        return true;

      return false;
    },
    isRain() {
      if(this.weather.icon.includes("09") || this.weather.icon.includes("10"))
        return true;

      return false;
    },
    isThunder() {
      if(this.weather.icon.includes("11"))
        return true;

      return false;
    },
    isSnow() {
      if(this.weather.icon.includes("13"))
        return true;

      return false;
    },
    isGeoOn() {
      if (this.weather.active)
        return true;

      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.current-day-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));

    &.active {
      .current-day-forecast, 
      .current-weater-location {
        opacity: 0;
        visibility: hidden;
      }

      .current-day-weather {
        transform: translateY(25vh) scale(.8);
      }
    }

    .current-day-forecast {
        width: 100%;
        transition: all .3s;

        h5 {
            line-height: 100%;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-size: 3.3vw;
            margin-bottom: 5px;
        }

        span {
            font-size: 9vw;
        }
    }

    .current-day-weather {
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all .3s;

        > svg {
            font-size: 35vw;
            display: block;
            margin: 0 auto 15px auto;
        }

        h2 {
            font-size: 20vw;
            letter-spacing: 0;
            display: inline-block;
            position: relative;
            line-height: 85%;

            span {
                position: absolute;
                bottom: 0;
                left: 91%;
                font-size: 45%;
                line-height: 100%;
            }
        }
    }

    .current-weater-location {
        transition: all .3s;
        font-size: 8vw;
        align-self: flex-end;
        margin-bottom: 25px;

        span {
            font-size: 5vw;
            display: inline-block;
            vertical-align: bottom;
            margin-left: 10px;
        }
    }
}
</style>