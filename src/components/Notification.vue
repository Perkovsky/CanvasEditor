<template>
  <div v-if="notification">
    <v-snackbar
      color="success"
      :multi-line="true"
      :timeout="5000"
      :value="true"
      @input="closeNotification"
    >{{ notification }}
      <v-btn
        dark
        text
        @click.native="closeNotification"
      >Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  computed: {
    notification () {
      return this.$store.getters.notification
    }
  },
  methods: {
    closeNotification () {
      this.$store.dispatch('clearNotification')
    }
  }
}
</script>
