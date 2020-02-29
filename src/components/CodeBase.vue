<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="white" icon v-on="on">
        <v-icon>mdi-cloud</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title tile primary-title class="font-weight-light black">
        <v-icon large dark>mdi-cloud</v-icon>
        <span class="white--text ml-2">Code base</span>
        <div class="flex-grow-1"></div>
        <v-btn v-if="isFullAccessCloudPermission" icon dark @click="add">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="height-400">
        
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          hide-default-header
          :hide-default-footer="items.length == 0"
          no-data-text="No data"
          loading-text="Loading... Please wait"
          class="elevation-1 mt-2">
          
          <template v-slot:item="{ item }">
            <tr :key="item.id">
              <td v-if="isFullAccessCloudPermission">
                <v-edit-dialog
                  :return-value.sync="item.name"
                  @save="editCode(item.id, item.name)"
                >{{item.name}}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.name"
                      label="Edit"
                      single-line
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td v-else>{{ item.name }}</td>
              <td class="td-action-width ml-0 pl-0 mr-0 pr-0">
                <v-icon small @click="restoreCode(item.id)" class="mr-2">mdi-cloud-upload</v-icon>
                <v-icon v-if="isFullAccessCloudPermission" small @click="deleteCode(item.id)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {FULL_ACCESS_CLOUD_PERMISSION_COOKIE} from '@/common/constants'

export default {
  name: 'CodeBase',
  props: {
    editor: Object
  },
  data () {
    return {
      dialog: false,
      headers: [
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    isFullAccessCloudPermission () {
      const cookie = this.$cookies.get(FULL_ACCESS_CLOUD_PERMISSION_COOKIE)
      return cookie === process.env.VUE_APP_FULL_ACCESS_CLOUD_PERMISSION_COOKIE
    },
    items () {
      return this.$store.getters.codeBase
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    add () {
      const code = this.editor.getValue()
      this.$store.dispatch('setCode', code)
      this.$store.dispatch('saveCode', code)
    },
    editCode (id, name) {
      this.$store.dispatch('editCode', { id, name })
    },
    async restoreCode (id) {
      let result = await this.$confirm('Do you really want to restore code?')
      if (result) {
        this.$store.dispatch('restoreCode', { id })
        const value = this.$store.getters.code
        this.editor.setValue(value)
      }
    },
    async deleteCode (id) {
      let result = await this.$confirm('Do you really want to delete code?')
      if (result) {
        this.$store.dispatch('deleteCode', { id })
      }
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
  .height-400 {
     height: 400px;
  }
  .td-action-width {
    width: 50px;
    min-width: 50px;
    max-width: 50px;
  }
</style>
