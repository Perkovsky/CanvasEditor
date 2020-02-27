<template>
  <div v-if="error">
    <v-snackbar
      color="error"
      :multi-line="true"
      :timeout="5000"
      :value="true"
      @input="closeError"
    >{{ error }}
      <v-btn
        dark
        text
        @click.native="closeError"
      >Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Error',
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
