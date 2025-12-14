<template>
  <router-link
    v-cursor-interact
    to="/festival/#passes"
    class="bg-bsf12yellow py-3 px-6 text-center flex items-center justify-center w-full text-base md:text-lg lg:text-xl 2xl:text-2xl pointer-events-auto z-20 space-x-4 md:space-x-6 2xl:space-x-8"
  >
    <span v-html="callToAction" /> <span><svg
      class="block w-4 h-4  md:h-6 md:w-6 2xl:w-7 2xl:h-7"
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.70265 34.7313L1.70265 6.93031L6.09725 2.05471L34.3797 2.05471L39.2973 6.96684L39.2973 34.7313L34.3793 39.6494L6.62069 39.6494L1.70265 34.7313Z"
        stroke="black"
        stroke-width="2.40531"
      />
      <path
        d="M15.6109 8.8296L20.5769 13.7829L20.6047 13.8106L25.6838 18.8767L25.6816 22.2859L25.6283 22.3391L20.6303 27.3265L18.8669 29.0854L15.6109 32.333"
        stroke="black"
        stroke-width="2.40531"
        stroke-miterlimit="10"
      />
    </svg></span>
  </router-link>
</template>

<script>
export default {
  name: 'FestivalTwentyThreeCallToAction',
  props: {
    callToAction: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
