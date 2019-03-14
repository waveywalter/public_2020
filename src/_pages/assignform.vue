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
<style scoped>
select{

}
li{
    cursor: pointer;
}
li:hover {
  background-color: #3e5688;
}
button, input, select, textarea {
    background-color: #414b61;
    border-style: groove;
    color: inherit;
}
select {
    -moz-appearance: none;
    -webkit-appearance: menulist;
}
select {
   
      -webkit-appearance: menulist-button;
    background-color: #353c48;
}
</style>

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