<template>
    <div>
<form >
<div class="white-box form-body form-material">
   {{complete()}}
                                        <h3 class="box-title">Address</h3>
                                        <hr class="m-t-0 m-b-40">
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Address 1</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="a1">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Address 2</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="a2">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">City</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="city">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">State</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="state">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Post Code</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="zip">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                    
                                    </div>
                        <div><span class="badge badge-pill badge-info float-right hide"><i class="ti-plus "></i>Add another location</span></div>
                </form>     

            </div>
        

</template>
<script>

    export default {
        name: "practicefields",
                data(){
            return{
                                complete:function(){
                                    console.log("COMPLETE 2")
                    if(this.a1!=''  && this.city!='' && this.state !='' && this.zip!=''){
                        this.$store.state.apps.currentStep=3;
                      this.$parent.selected = 3
                        return true
                    }
                    return false
                },
                a1:'a',
                a2:'b',
                city:'c',
                state:'d',
                zip:'33609',
            }
        },
        components: {

        }
    }
</script>
<style scoped>
.badge{
    cursor:pointer;
}
</style>