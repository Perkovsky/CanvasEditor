<template>
  <v-dialog v-model="dialog" eager persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-script-text</v-icon>
      </v-btn>
    </template>
    <v-card tile class="fill-height">
      <v-card-title tile primary-title class="font-weight-light black">
        <v-icon large color="white">mdi-script-text</v-icon>
        <span class="white--text ml-2">JavaScript editor</span>
        <div class="flex-grow-1"></div>
        <app-code-base :editor="editor" />
        <v-btn icon dark @click="clear">
          <v-icon>mdi-eraser-variant</v-icon>
        </v-btn>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon dark @click="ok">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-card-title>

      <v-container class="height-90pct" >
        <v-row class="fill-height" align="stretch">
          <div ref="editor" class="editor" />
        </v-row>
      </v-container>
      
    </v-card>
  </v-dialog>
</template>

<script>
import {CANVAS} from '@/common/constants'
import * as monaco from 'monaco-editor'
import CodeBase from './CodeBase'

export default {
  name: 'JavaScriptEditor',
  components: {
    'app-code-base': CodeBase
  },
  data: function () {
    return {
      editor: null,
      dialog: true
    }
  },
  methods: {
    async clear () {
      let result = await this.$confirm('Do you really want to clear code?')
      if (result) {
        this.$store.dispatch('clearCode')
      const value = this.$store.getters.code
      this.editor.setValue(value)
      }
    },
    ok () {
      this.dialog = false
      const value = this.editor.getValue()
      this.$store.dispatch('setCode', value)
    },
    close () {
      this.dialog = false
      const value = this.$store.getters.code
      this.editor.setValue(value)
    }
  },
  mounted () {
    const value = this.$store.getters.code
    const language =  'javascript'
    const model = monaco.editor.createModel(value, language)

    const kind = monaco.languages.CompletionItemKind.Field
    const suggestions = [{
      label: CANVAS,
      kind: kind,
      documentation: 'Field',
      insertText: CANVAS
    }]
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: function(model, position) {
        return { 
          suggestions: suggestions,
          kind: monaco.languages.CompletionItemKind.Variable // must be deep clone for getting suggestions more than once on the same line
          }
        }
      }
    )
    
    const options = {
      model,
      theme: 'vs',
      wordWrap: 'on',
      language
    }
    this.editor = monaco.editor.create(this.$refs.editor, options)
  },
  beforeDestroy () {
    this.editor && this.editor.dispose()
  }
}
</script>

<style>
  .editor {
    margin: auto;
    width: 100%;
    height: 100%;
  }
</style>
