<template>
  <div class="nextday-list-ctn">
    <NextDaysItem v-for="weather in forecastWeather" v-bind:key="weather.id" v-bind:weather="weather"/>
    <div class="btn" @click="reloadData"><font-awesome-icon icon="redo-alt" /> Neuladen</div>
  </div>
</template>

<script>
import NextDaysItem from '@/components/NextDaysItem'

let lat, long;

export default {
  name: 'nextdayslist',
  components: {
    NextDaysItem
  },
  computed: {
    forecastWeather() {
      return this.$store.state.forecastWeather
    },
  },
  methods: {
    reloadData() {
      this.$emit('reloadData');
    }
  }
}
</script>

<style lang="scss" scoped>
.nextday-list-ctn {
    padding: 5px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
}

.btn {
    color: black;
    border-color: black;
    margin: 20px auto 0 auto;
}

@media (orientation: landscape) {
  .nextday-list-ctn {
    justify-content: space-between;
  }
}
</style>