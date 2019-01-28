<template>
    <div>
        <div id="page-wrapper">
            <div class="container-fluid">
            <div class="col-lg">
                <div class="row bg-title">
             <h4 class="page-title">Affiliate Dashboard</h4>
             </div>
            </div>
             <div class="">
             <div class="white-box">
                 <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Affiliate Application</h4>
                                <!-- Nav tabs -->
                                <div class="vtabs">
                                    <ul class="nav nav-tabs tabs-vertical" role="tablist">
                                        <li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#home4" role="tab" aria-selected="true"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Profile Details</span> </a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#practice4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Practice Details</span> </a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#profile4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Forms</span></a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#messages4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-email"></i></span> <span class="hidden-xs-down">Uploads</span></a> </li>
                                    </ul>
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="home4" role="tabpanel">
                                                <affiliateformfields></affiliateformfields>
                                        </div>
                                        <div class="tab-pane" id="practice4" role="tabpanel">
                                        <practicefields></practicefields>
                                        </div>
                                        <div class="tab-pane p-20 " id="profile4" role="tabpanel">
                                                <forms></forms>
                                        </div>
                                        <div class="tab-pane p-20  " id="messages4" role="tabpanel">Hi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            </div>
        </div>
        </div>
        </div>
</template>
<script>
import TopHeader from '../layoutComponents/TopHeader';
import SideBar from '../layoutComponents/SideBar';
import affiliateformfields from './affiliateformfields';
import practicefields from './practicefields';
import forms from './forms.vue';

    export default {
        name: "AffiliateDashboard",
                data(){
            return{
            }
        },
        components: {
affiliateformfields,practicefields,TopHeader,SideBar,forms
        }
    }
</script>
<style scoped>
.card{
    background-color:transparent;
    border:none;
}
.tab-content{width:90%}
</style>