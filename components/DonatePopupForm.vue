<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <h2 class="text-3xl font-seen_serif_light_italic font-normal mb-4">
        Donate
      </h2>
      <div>
        <h3>Donation amount</h3>
        <div class="checkboxes">
          <div>
            <input
              id="amount-25"
              v-model="form.field72658789"
              v-cursor-interact
              type="radio"
              value="25"
              name="amount"
              checked
            > <label v-cursor-interact for="amount-25">$25</label>
          </div>
          <div>
            <input
              id="amount-100"
              v-model="form.field72658789"
              v-cursor-interact
              type="radio"
              value="100"
              name="amount"
            > <label v-cursor-interact for="amount-100">$100</label>
          </div>
          <div>
            <input
              id="amount-500"
              v-model="form.field72658789"
              v-cursor-interact
              type="radio"
              value="500"
              name="amount"
            > <label v-cursor-interact for="amount-500">$500</label>
          </div>
          <div class="flex items-center">
            <input
              id="amount-custom"
              v-model="form.field72658789"
              v-cursor-interact
              type="radio"
              value="0"
              name="amount"
            > <label for="amount-custom" /><input
              v-model="customAmount"
              v-cursor-interact
              type="number"
              value=""
              placeholder="$ Custom amount"
              @focus="form.field72658789='0'"
            >
          </div>
        </div>
        <div class="checkboxes checkboxes--white">
          <div>
            <input
              id="duration-once"
              v-model="form.field72658790"
              v-cursor-interact
              type="radio"
              value="Payment"
              name="duration"
              checked
            > <label v-cursor-interact for="duration-once">One-time only</label>
          </div>
          <div>
            <input
              id="duration-monthly"
              v-model="form.field72658790"
              v-cursor-interact
              type="radio"
              value="Subscription"
              name="duration"
            > <label v-cursor-interact for="duration-monthly">Recurring monthly donation</label>
          </div>
        </div>
      </div>
      <div class="hidden lg:flex lg:space-x-5">
        <div class="block-input">
          <label for="first_name">First name</label>
          <input
            id="first_name"
            v-model="form['field94998395-first']"
            v-cursor-interact
            type="text"
            value=""
            name="first_name"
            required
          >
        </div>
        <div class="block-input">
          <label for="last_name">Last name</label>
          <input
            id="last_name"
            v-model="form['field94998395-last']"
            v-cursor-interact
            type="text"
            value=""
            name="last_name"
            required
          >
        </div>
      </div>
      <div class="hidden lg:block block-input">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.field72658797"
          v-cursor-interact
          type="email"
          value=""
          name="email"
          required
        >
      </div>
      <div class="flex items-center justify-center text-center mt-8">
        <PillButton to="/donate" :click-handler="handleSubmit">
          <span>Next</span>
        </PillButton>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'DonatePopupForm',
  data () {
    return {
      form: {
        field72658789: '25',
        field72658790: 'Payment',
        'field94998395-first': '',
        'field94998395-last': '',
        field72658797: ''
      },
      customAmount: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$store.commit('popup/close')
      if (parseInt(this.form.field72658789) === 0) {
        this.form.field72658789 = this.customAmount
      }
      this.$router.push({ path: '/donate', query: this.form })
    }
  }
}
</script>

<style scoped>
label,
h3 {
  @apply font-medium text-lg;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
select {
  @apply px-4 py-1 rounded-3xl border-4 border-dotted border-black text-base bg-transparent outline-none appearance-none w-full focus:outline-none placeholder-black;
}

.block-input {
  @apply my-2 w-full;
}

.block-input label {
  @apply block mb-2;
}

.checkboxes {
  @apply flex flex-wrap items-center;
}

.checkboxes > div {
  @apply mr-5 mb-2;
}

.checkboxes input[type="radio"],
.checkboxes input[type="checkbox"] {
  @apply sr-only;
}

.checkboxes label {
  @apply flex;
}

.checkboxes label::before {
  @apply rounded-full w-6 h-6 border-dotted border-2 border-black block mr-2 bg-transparent transition-colors duration-200 cursor-pointer;

  content: " ";
}

.checkboxes input:checked + label::before {
  @apply bg-black;
}

.checkboxes--white {
  @apply text-white;
}

.checkboxes--white label::before{
  @apply border-white;
}

.checkboxes--white label {
  @apply opacity-50 transition-opacity duration-200;
}

.checkboxes--white input:checked + label {
  @apply opacity-100;
}

.checkboxes--white input:checked + label::before {
  @apply bg-white;
}
</style>
