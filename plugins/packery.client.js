import Packery from 'packery'
export default (context, inject) => {
  inject('packery', Packery)
  context.$packery = Packery
}
