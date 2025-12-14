<template>
  <Festival24Box :background="(layout.background ? layout.background : null)" :gradient-style="(layout.gradient_style ? layout.gradient_style : null)">
    <div class="aspect-w-16 aspect-h-10 w-full relative rounded-xl overflow-hidden" :class="{'border-inherit border': $store.state.theme==='bsf13'}">
      <ClientOnly>
        <GMap
          ref="gMap"
          language="en"
          :center="{lat: layout.map.lat, lng: layout.map.lng}"
          :options="{fullscreenControl: false, disableDefaultUI: true}"
          :zoom="16"
          @init="mapLoaded"
        >
          <GMapMarker
            v-for="(marker, key) in markers"
            :key="`mapMarker${key}`"
            :position="{lat: marker.marker_location.lat, lng: marker.marker_location.lng}"
            :options="($refs.gMap&&$refs.gMap.google ? {icon: { url: (marker.marker_icon ? marker.marker_icon : '/images/festival-23-marker.svg'), scaledSize: new $refs.gMap.google.maps.Size(50, 50)}} : {})"
          >
            <GMapInfoWindow v-if="marker.heading||marker.description" :options="{maxWidth: 200}">
              <h3 class="text-2xl font-normal mb-4" v-html="marker.heading" />
              <p v-if="marker.description" v-html="marker.description" />
            </GMapInfoWindow>
          </GMapMarker>
        </GMap>
      </ClientOnly>
    </div>
  </Festival24Box>
</template>

<script>
import layout from '~/mixins/layout'
import googleMaps from '~/mixins/googleMaps'

export default {
  name: 'Festival24Map',
  mixins: [layout, googleMaps],
  methods: {
    mapLoaded () {
      if (!(this.markers.length > 1)) {
        return
      }

      if (this.$refs.gMap && this.$refs.gMap.map && this.$refs.gMap.google) {
        const bounds = new this.$refs.gMap.google.maps.LatLngBounds()
        this.markers.forEach((marker) => {
          const markerLatLng = new this.$refs.gMap.google.maps.LatLng(marker.marker_location.lat, marker.marker_location.lng)
          bounds.extend(markerLatLng)
        })

        this.$refs.gMap.map.fitBounds(bounds)
      }
    }
  }
}
</script>

<style>
.GMap,
.GMap__Wrapper {
  width: 100% !important;
  height: 100% !important;
}
</style>
