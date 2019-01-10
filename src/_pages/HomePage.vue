<template>
 <div>
    <AdminTopHeader></AdminTopHeader>
    <AdminSideBar></AdminSideBar>
    
        <div id="page-wrapper">
            <div class="container-fluid">
<div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Dashboard</h4> </div>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
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