<template>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">Create Admin</h4>
          </div>
           <createadmin/>
        </div>
      </div>
    </div>
</template>

<script>

import createadmin from '../components/adminComponents/createAdmin'
export default {
    name: 'createadmin',
    components:{
        createadmin
    }
}

</script>







        