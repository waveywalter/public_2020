<style scoped>
.col-md-6.col-lg-4.col-sm-12 {
    flex: 1  1 100%;
}
#flexor{display:flex;}
</style>
<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">

            <div id="flexor">
            <NewAffiliateform></NewAffiliateform>
            <AffiliateRegistration></AffiliateRegistration>
            </div>
        </div>
    </div>
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import NewAffiliateform from '../salesComponents/NewAffiliateform';
import AffiliateRegistration from '../salesComponents/AffiliateRegistration';



    export default {
        name: "SalesDashBoard",
        created(){
            this.init()
        },
        data(){
            return{
                components:"NewAffiliateform"
            }
        },
        components: {
            AdminTopHeader,
            AdminSideBar,
            NewAffiliateform,
            AffiliateRegistration
        },
        methods:{
         init(){
             console.log("INITTTTTTTTTTTTT")
             window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
  //  document.getElementById('startLat').innerHTML = startPos.coords.latitude;
  //  document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
         },
         filterApp(){
            console.log('filterApp');
            },
        },
    }
</script>
<style scoped>
</style>