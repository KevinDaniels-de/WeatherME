<template>
    <div class="swiper-slide current-day-ctn">
      <CurrentDayItem v-bind:weather="currentWeather" />
      <div class="current-day-bg"></div>
      <div class="swiper-btn" @click="rotate(); $emit('swipeUp')">&lt;&lt;░░</div>
    </div>
</template>

<script>
// @ is an alias to /src
import CurrentDayItem from '@/components/CurrentDayItem'

export default {
  name: 'currentday',
  props: ["currentWeather"],
  components: {
    CurrentDayItem
  },
  mounted() {
    window.addEventListener("resize", this.adjustHeight);
    this.adjustHeight();
  },
  methods: {
    adjustHeight() {
      document.getElementsByClassName('current-day-ctn')[0].style.height = window.innerHeight + 'px';
    },
    rotate() {

    }
  }
}
</script>

<style lang="scss" scoped>
.current-day-ctn {
  height: 100vh;
  padding: 10px;
}
.current-day-bg {
  height: 40px;
  background-image: url(../assets/clouds.svg);
  background-repeat: repeat-x;
  width: 200vw;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: cloudMoving 20s linear infinite;
}

.swiper-btn {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 50px;
  right: 0;
  transform: rotate(90deg);

  &.active {
    transform: rotate(-90deg);
  }
}

@keyframes cloudMoving {
  0% {transform: translateX(0%)}
  100% {transform: translateX(-50%)}
}
</style>