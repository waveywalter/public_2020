<template>
  <div id="app">
    <TopHeader></TopHeader>
    <AdminsideBar></AdminsideBar>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div data-v-7ad1cecc class>
          <div data-v-7ad1cecc class="row bg-title">
            <h4 data-v-7ad1cecc class="page-title">Assign Form</h4>
          </div>
          <assigncomponent/>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
import assigncomponent from '../components/adminComponents/assigncomponent'
import TopHeader from '../components/layoutComponents/adminTopHeader'
import AdminsideBar from '../components/adminComponents/adminSideBar'

export default {
    name: 'assignform',
    components:{
      assigncomponent,
      TopHeader,
      AdminsideBar
    }
}

</script>