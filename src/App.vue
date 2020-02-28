<template>
  <v-app hide-overlay>
    <v-app-bar app dark color="black">
      <v-toolbar-title class="font-weight-light">Canvas Editor</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="execute">
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn icon @click="erase">
        <v-icon>mdi-eraser-variant</v-icon>
      </v-btn>
      <app-java-script-editor />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="start" justify="center">
          <div class="font-weight-thin grey--text">
            <span>Canvas: {{ width }}x{{ height }}</span>
          </div>
        </v-row>
        <v-row align="center" justify="center">
          <canvas ref="canvas" :width="width" :height="height" />
        </v-row>
      </v-container>
    </v-content>

    <app-notification />
    <app-error />
  </v-app>
</template>

<script>
import {CANVAS} from '@/common/constants'
import Notification from './components/Notification'
import Error from './components/Error'
import JavaScriptEditor from './components/JavaScriptEditor'

export default {
  name: 'App',
  components: {
    'app-notification': Notification,
    'app-error': Error,
    'app-java-script-editor': JavaScriptEditor
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    width () {
      return 800;
    },
    height () {
      return 600
    }
  },
  methods: {
    execute () {
      this.erase()
      const code = this.$store.getters.code
      const executedCode = code.replace(CANVAS, 'this.$refs.canvas')
      eval(executedCode)
    },
    erase () {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
</script>

<style>
  .height-90pct {
    height: 90%;
  }
</style>
