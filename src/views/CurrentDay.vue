<template>
    <div class="swiper-slide current-day-ctn">
      <CurrentDayItem />
      <div class="current-day-bg"></div>
      <div class="swiper-btn" @click="rotate(); $emit('swipeUp')"></div>
    </div>
</template>

<script>
// @ is an alias to /src
import CurrentDayItem from '@/components/CurrentDayItem'

export default {
  name: 'currentday',
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
  height: 100%;
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
  right: 19px;
  background-image: url(../assets/touch.svg);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 10vw;
  height: 10vw;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
  animation: 1s wiggle 1s infinite;
  transition: opacity .3s;

  &.active {
    opacity: .1;
  }
}

@keyframes cloudMoving {
  0% {transform: translateX(0%)}
  100% {transform: translateX(-50%)}
}

@keyframes wiggle {
  0% {transform: rotate(0deg)}
  20% {transform: rotate(5deg)}
  40% {transform: rotate(-5deg)}
  60% {transform: rotate(5deg)}
  100% {transform: rotate(0deg)}
}

@media (orientation: landscape) {
  .current-day-ctn {
    padding: 10px;
  }

  .swiper-btn {
    bottom: 55px;
    right: 30px;
    width: 8vw;
    height: 8vw;

    &.active {
      opacity: .1;
    }
  }
}
</style>