
<template>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">New Lead</h4>
          </div>
          <createlead></createlead>
        </div>
      </div>
    </div>
</template>

<script>
import createlead from '../components/salesComponents/createlead'
export default {
    name: 'createleadpage',
    components:{
        createlead
    }
}
</script>







        