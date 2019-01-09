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
        name: "adminDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            NewAffiliateform,
            AffiliateRegistration
        },
        methods:{
         filterApp(){
            console.log('filterApp');
            },
        },
    }
</script>
<style scoped>
</style>