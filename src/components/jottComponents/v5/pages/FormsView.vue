<template>
  <v-layout>
    <v-flex text-xs-center>
      
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;Walter Johnson</em>
          </small>
        </footer>
      </blockquote>
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
          { icon: 'time_to_leave', title: 'Mileage Reimbursement Form', to: '/forms/mileage' },
          { icon: 'directions_bus', title: 'Taking Client Out in Van Form', to: '/forms/tripvan' },
          { icon: 'security', title: 'HIPAA Privacy Form', to: '/forms/hipaa' }
        ],
        title: 'Policies Bro'
      }
    }
  }
</script>