<template>
    <div id="app">
        <!-- <logoutWarning></logoutWarning> -->
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import logoutWarning from '../components/logoutWarning';

export default {
    name: 'app',
    components: {
        logoutWarning
    },
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