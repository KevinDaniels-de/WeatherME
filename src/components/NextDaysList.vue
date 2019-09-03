<template>
  <div class="nextday-list-ctn">
    <NextDaysItem v-for="weather in this.forecastWeather" v-bind:key="weather.dt" v-bind:weather="weather"/>
    <div class="btn" @click="reloadData"><font-awesome-icon icon="redo-alt" /> Neuladen</div>
  </div>
</template>

<script>
import NextDaysItem from '@/components/NextDaysItem'
import axios from 'axios'

let lat, long;

export default {
  name: 'nextdayslist',
  props: ["forecastWeather"],
  components: {
    NextDaysItem
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
</style>