<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">The Wave International Policy List</h3>
            <div>All Policies and procedures</div>
      <v-list>
        <v-list-tile 
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {

        items: [
          { icon: 'time_to_leave', title: 'Mileage Reimbursement Policy', to: '/policies/mileages' },
          { icon: 'directions_bus', title: 'Taking Client Out in Van Policy', to: '/policies/vantrip' },
          { icon: 'security', title: 'HIPAA Privacy Policy', to: '/policies/hipaa' }
        ],
        title: 'Policies Bro'
      }
    }
  }
</script>