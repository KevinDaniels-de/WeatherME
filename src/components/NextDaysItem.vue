<template>
    <div class="nextday-item-ctn">
        <div>{{this.w.day}}</div>
          <font-awesome-icon v-if="isSun() && isDay()" icon="sun" />
          <font-awesome-icon v-else-if="isSun() && !isDay()" icon="moon" />
          <font-awesome-icon v-else-if="isCloud()" icon="cloud" />
          <font-awesome-icon v-else-if="isRain()" icon="cloud-rain" />
          <font-awesome-icon v-else-if="isThunder()" icon="bolt" />
          <font-awesome-icon v-else-if="isSnow()" icon="snowflake" />
          <font-awesome-icon v-else icon="smog" />
        <div>{{this.w.temp}}/<span>{{this.w.tempMax}}</span></div>
    </div>
</template>

<script>
export default {
    name: "nextdaysitem",
    props: ["weather"],
    data() {
        return {
            w: {
                day: "",
                icon: "",
                temp: "",
                tempMax: ""
            }
        }
    },
    methods: {
        isSun() {
            if(this.w.icon.includes("01"))
                return true;

            return false;
        },
        isCloud() {
            if(this.w.icon.includes("02") || this.w.icon.includes("03") ||this.w.icon.includes("04"))
                return true;

            return false;
        },
        isRain() {
            if(this.w.icon.includes("09") || this.w.icon.includes("10"))
                return true;

            return false;
        },
        isThunder() {
            if(this.w.icon.includes("11"))
                return true;

            return false;
        },
        isSnow() {
            if(this.w.icon.includes("13"))
                return true;

            return false;
        }
    },
    mounted() {
        this.w.icon = this.weather.weather[0].icon;
        this.w.temp = (this.weather.main.temp | 0) + "°";
        this.w.tempMax = (this.weather.main.temp_max | 0) + "°";

        var d = new Date(this.weather.dt * 1000);
        switch (d.getDay()) {
            case 1:
            this.w.day = "Montag";
            break;

            case 2:
            this.w.day = "Dienstag";
            break;

            case 3:
            this.w.day = "Mittwoch";
            break;

            case 4:
            this.w.day = "Donnerstag";
            break;

            case 5:
            this.w.day = "Freitag";
            break;

            case 6:
            this.w.day = "Samstag";
            break;

            default:
            this.w.day = "Sonntag";
            break;
        }
    }
}
</script>

<style lang="scss" scoped>
.nextday-item-ctn {
    color: black;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #00000026;
    font-family: 'Roboto', sans-serif;

    &:nth-last-child(2) {
        border-bottom: 0;
    }

    div {
        font-size: 3vw;
        width: 33%;

        &:last-of-type {
            text-align: right;
        }

        span {
            font-size: 75%;
        }
    }

    svg {
        opacity: .4;
    }
}
</style>