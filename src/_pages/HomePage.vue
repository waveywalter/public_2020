<template>
 <div>
    <AdminTopHeader></AdminTopHeader>
    <AdminSideBar></AdminSideBar>
    
        <div id="page-wrapper">            
            <h1> New Homepage </h1>
            </div>     
        </div>
</template>

<script>
import AdminTopHeader from '../components/layoutComponents/adminTopHeader';
import AdminSideBar from '../components/layoutComponents/adminSideBar';

export default {
    name: 'HomePage',
    components:{
        AdminTopHeader,
        AdminSideBar,
    }
}

</script>