<!-- 商品轮播图 -->
<template>
  <Card dis-hover>
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, key) in value" :key="key">
          <img width="100%" :src="item.image">
        </div>
      </div>
      <!-- Add Arrows -->
    </div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="(item, key) in value" :key="key">
          <img width="100%" :src="item.image">
        </div>
      </div>
      <div class="swiper-arrows">
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </Card>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import { Card } from 'iview'

  export default {
    name: 'Swipers',
    data () {
      return {
        swip: null
      }
    },
    props: {
      value: {
        type: Array,
        defaule () {
          return [
            {
              id: 13681,
              image: 'http://127.0.0.1:8000/media/images/15356116011254560218/head/2018-08-30%20144641-8316.jpg',
              url: 'http://127.0.0.1:8000/media/images/15356116011254560218/head/2018-08-30%20144641-8316.jpg',
              defaule: true
            }
          ]
        }
      }
    },
    created () {
    },
    methods: {
      SwiperInit: function () {
        this.$nextTick(() => {
          if (this.swip) this.swip.updateSlides()
          this.swip = new Swiper('.gallery-top', {
            spaceBetween: 10,
            loopedSlides: 5,
            notNextTick: true,
            loop: true,
            speed: 500,
            autoplay: {
              delay: 10000,
              stopOnLastSlide: false,
              disableOnInteraction: false
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            thumbs: {
              swiper: new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                autoPlay: true,
                freeMode: true,
                loopedSlides: 5, // looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true
              })
            }
          })
        })
      }
    },
    components: {
      Card
    },
    computed: {
      getValue: function () {
        return this.value
      }
    },
    watch: {
      getValue: function (a, b) {
        this.SwiperInit()
      }
    }
  }
</script>

<style scoped>
  .swiper-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .gallery-top {
    width: 100%;
  }

  .gallery-thumbs {
    box-sizing: border-box;
    padding: 0;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }

  .gallery-thumbs .swiper-slide {
    height: 100%;
    opacity: 0.4;
  }

  .gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-arrows {
  }

  .swiper-arrows .swiper-button-prev {
    background-size: 15px;
    float: left;
    left: 0;
  }

  .swiper-arrows .swiper-button-next {
    background-size: 15px;
    float: right;
    right: 0;
  }
</style>
