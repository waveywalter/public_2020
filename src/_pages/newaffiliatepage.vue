
<template>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">New Affiliate</h4>
          </div>
          <newaffiliate></newaffiliate>
        </div>
      </div>
    </div>
</template>

<script>
import newaffiliate from '../components/salesComponents/NewAffiliateform'
export default {
    name: 'createadmin',
    components:{
        newaffiliate
    }
}
</script>







        