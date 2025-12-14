<template>
  <div class="festival-23-box-old">
    <div class="festival-23-box-old__top">
      <span />
    </div>
    <div class="festival-23-box-old__inside">
      <slot />
    </div>
    <div class="festival-23-box-old__bot">
      <span />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Festival23BoxOld'
}
</script>

<style scoped>
.festival-23-box-old {
  @apply w-full h-full flex flex-wrap flex-col;
}

.festival-23-box-old__top,
.festival-23-box-old__bot {
  @apply flex w-full h-6;
}

.festival-23-box-old__top > span,
.festival-23-box-old__bot > span {
  @apply block flex-grow leading-none text-xl bg-bsf12green;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);

  border-top: 1px solid transparent;
}

.festival-23-box-old__top::before,
.festival-23-box-old__top::after,
.festival-23-box-old__bot::before,
.festival-23-box-old__bot::after {
  @apply block w-6 h-full bg-bsf12green;

  content: " ";
}

.festival-23-box-old__top::before {
  margin-right: -1px;
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
}

.festival-23-box-old__top::after {
  margin-left: -1px;
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%);
}

.festival-23-box-old__bot::before {
  margin-right: -1px;
  clip-path: polygon(0% 0%, 100% 100%, 100% 0%);
}

.festival-23-box-old__bot::after {
  margin-left: -1px;
  clip-path: polygon(100% 0%, 0% 100%, 0% 0%);
}

.festival-23-box-old__inside {
  @apply bg-bsf12green px-8 pt-4 lg:px-16 lg:py-10 w-full block flex-grow flex flex-wrap flex-col;

  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
