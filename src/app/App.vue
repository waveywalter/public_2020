<template>
    <div id="app">
        
<script type="text/x-template" id="modal-template">
        <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
  
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>
  
            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>
  
            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">OK</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </script>
   <modal :show="showModal" @close="showModal = false"></modal>
    <button id="show-modal" @click="showModal = true">New Post</button>
    <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    data() {
        return{
        showModal: false
        }
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
 
            this.clearAlert();
        }
    } 

    
};


</script>