<template>
  <div class="current-day-ctn">
      <section v-cloak class="current-day-section">
        <div class="current-day-forecast">
          <h5>{{currentWeather.day}}</h5>
          <span>{{currentWeather.desc}}</span>
        </div>
        <div class="current-day-weather">
          <font-awesome-icon :icon="currentWeather.icon"></font-awesome-icon>
          <h2>{{currentWeather.temp}}<span>{{currentWeather.tempMax}}</span></h2>
        </div>
        <div class="current-weater-location">
          <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          <span> {{currentWeather.place}}</span>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'currentdayitem',
  computed: {
    currentWeather() {
      return this.$store.state.currentWeather
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
            margin-bottom: 4%;
        }

        span {
            font-size: 8.8vw;
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

@media (orientation: landscape) {
.current-day-section {

    &.active {
      .current-day-forecast, 
      .current-weater-location {
        opacity: 0;
        visibility: hidden;
      }

      .current-day-weather {
        transform: translateY(25vh) scale(.6);
      }
    }

    .current-day-forecast {
        h5 {
            font-size: 2vw;
            margin-bottom: 2%;
        }

        span {
            font-size: 5vw;
        }
    }

    .current-day-weather {

        > svg {
            font-size: 15vw;
            margin: 0 auto 10px auto;
        }

        h2 {
            font-size: 10vw;
        }
    }

    .current-weater-location {
        font-size: 3vw;
        margin-bottom: 55px;

        span {
            font-size: 4vw;
            margin-left: 12px;
        }
    }
}
}
</style>