<template>
    <div>
        <form>
        <div class="form-body form-material">
   
                                        <h3 class="box-title">Person Info</h3>
                                       
                                        <hr class="m-t-0 m-b-40">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">First Name</label>
                                                    <div class="col-md-9">
                                                    
                                                        <input type="text" class="form-control" placeholder="John Smoe" v-model="firstname">
                                                        <small class="form-control-feedback"> </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group has-danger row">
                                                    <label class="control-label text-right col-md-3">Last Name</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control form-control-danger" v-model="lastname" placeholder="12n">
                                                        <small class="form-control-feedback">  </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Gender</label>
                                                    <div class="col-md-9">
                                                        <select class="form-control custom-select">
                                                            <option value="">Male</option>
                                                            <option value="">Female</option>
                                                        </select>
                                                        <small class="form-control-feedback"> Select your gender. </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Date of Birth</label>
                                                    <div class="col-md-9">
                                                        <input type="date" class="form-control" placeholder="dd/mm/yyyy">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Category</label>
                                                    <div class="col-md-9">
                                                        <select class="form-control custom-select" data-placeholder="Choose a Category" tabindex="1">
                                                            <option value="Category 1">Category 1</option>
                                                            <option value="Category 2">Category 2</option>
                                                            <option value="Category 3">Category 5</option>
                                                            <option value="Category 4">Category 4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Approved for Payment</label>
                                                    <div class="col-md-9">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio3" name="member" class="custom-control-input" disabled>
                                                            <label class="custom-control-label" for="customRadio3">Yes</label>
                                                        </div>
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio4" name="member" class="custom-control-input"  disabled>
                                                            <label class="custom-control-label" for="customRadio4">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
 
                                    </div>

                </form>     
            </div>
        

</template>
<script>

    export default {
        name: "affiliateformfields",
        props :["afid"],
                data(){
            return{
                
                
            }
        },
        computed:{
            user: function(){
                if(this.$store.state.account.user.user.role=="sales") return this.$store.state.users.all.items.filter(aff=>{return aff.id===this.afid})
                return [this.$store.state.account.user.user]
            },
            firstname:{
                    get: function () {
                        console.log("FIRDT")
                        console.log(this.user)
                        return this.user[0].firstname
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].firstname= newValue
                }           
            },
             lastname:{
                    get: function () {
                        console.log("LAST")
                        console.log(this)
                        return this.user[0].lastname
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].lastname= newValue
                }           
            }
        },
        components: {

        }
    }
</script>
<style scoped>

</style>