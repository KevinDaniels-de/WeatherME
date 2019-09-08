<template>
    <div class="nextday-item-ctn">
        <div>{{weather.day}}</div>
          <font-awesome-icon :icon="weather.icon"></font-awesome-icon>
        <div>{{weather.temp}}/<span>{{weather.tempMax}}</span></div>
    </div>
</template>

<script>
export default {
    name: "nextdaysitem",
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

@media (orientation: landscape) {
    .nextday-item-ctn {
        width: 48%;

        &:nth-last-child(2) {
            border-bottom: 1px solid #00000026;
        }
    }
}
</style>