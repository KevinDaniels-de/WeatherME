<template>
    <div class="swiper-slide forecast-ctn">
        <NextDaysList @reloadData="reloadData" />
    </div>
</template>

<script>
// @ is an alias to /src
import NextDaysList from '@/components/NextDaysList'

export default {
  name: 'nextdays',
  components: {
    NextDaysList
  },
  mounted() {
    window.addEventListener("resize", this.adjustHeight);
    this.adjustHeight();
  },
  methods: {
    adjustHeight() {
      document.getElementsByClassName('forecast-ctn')[0].style.height = (window.innerHeight / 2) + 'px';
    },
    reloadData() {
      this.$emit('reloadData');
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast-ctn {
  height: 50vh;
  background: white;
}
</style>