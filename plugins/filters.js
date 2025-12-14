import Vue from 'vue'
import moment from 'moment-timezone'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('MMMM Do  h:mm A')
  }
})

Vue.filter('formatDateAlt', function (value) {
  if (value) {
    return moment(value).format('MMMM D, YYYY')
  }
})

Vue.filter('formatMicroDate', function (value) {
  if (value) {
    return moment(value).format('YYYY-MM-DDTHH:mm')
  }
})

Vue.filter('formatDateAltShort', function (value) {
  if (value) {
    return moment(value).format('MMM D, YYYY')
  }
})
