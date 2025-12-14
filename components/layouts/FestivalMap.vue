<template>
  <section :class="{'text-navy': $store.state.theme==='festival'}" class="relative">
    <Container>
      <FestivalHeading v-if="layout.title" :butted="true" background-class="bg-yellow">
        <span :class="{'font-festival_sans_italic text-xl': $store.state.theme==='festival'}" v-html="layout.title" />
      </FestivalHeading>
      <div class="relative aspect-w-16 aspect-h-9" :class="{'border-5 border-navy': $store.state.theme==='festival', 'border-4 lg:border-md 2xl:border-lg border-black rounded-3xl xl:rounded-4xl overflow-hidden': $store.state.theme==='bsf11'}">
        <span v-if="layout.subtitle" class="block lg:absolute top-0 left z-10 w-full">
          <FestivalSubHeading class="-mt-border -ml-border -mr-border" background="bg-beige">
            <span :class="{'font-festival_sans_italic': $store.state.theme==='festival'}" v-html="layout.subtitle" />
          </FestivalSubHeading>
        </span>
        <RawLink v-if="layout.link" v-cursor-hint="layout.cursor_hint" class="takeover-link z-20" :to="layout.link.url|replaceSiteUrl">
          <span class="sr-only">{{ layout.link.title }}</span>
        </RawLink>
        <ClientOnly>
          <GMap
            ref="gMap"
            language="en"
            :center="{lat: layout.map.lat, lng: layout.map.lng}"
            :options="{fullscreenControl: false, disableDefaultUI: true}"
            :zoom="layout.map.zoom"
          >
            <GMapMarker
              v-for="(marker, key) in markers"
              :key="`mapMarker${key}`"
              :position="{lat: marker.marker.lat, lng: marker.marker.lng}"
              :options="($refs.gMap&&$refs.gMap.google ? {icon: { url: marker.marker_icon, scaledSize: new $refs.gMap.google.maps.Size(50, 50)}} : {})"
            />
          </GMap>
        </ClientOnly>
      </div>
    </Container>
  </section>
</template>

<script>
import layout from '~/mixins/layout'
import googleMaps from '~/mixins/googleMaps'

export default {
  name: 'FestivalMap',
  mixins: [layout, googleMaps]
}
</script>

<style>
.GMap,
.GMap__Wrapper {
  width: 100% !important;
  height: 100% !important;
}
</style>
