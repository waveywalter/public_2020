<template>

    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">All Forms</h4>
          </div>
           <adminForms/>
        </div>
      </div>
    </div>
</template>

<script>

import adminForms from '../components/adminComponents/adminForms'
export default {
    name: 'formspage',
    components:{
        adminForms
    }
}

</script>







        