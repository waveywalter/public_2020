<template>
<div id="uploads">
   <div> {{complete}}</div>
<div grid-list-md v-for="type in upload" class="uploads">

<button color="" class="black--text btn btn-default" loaders v-on:click="openFileDialog(type)">
<i class="icon-arrow-up-circle"></i>
<input type="file" :id="type" style="display:none" v-on:change="onFileChange">
{{type}}
</button>


</div>
        <div class="row float-right">
<toggle-button v-if="role === 'sales'" :value="false" color="green" :sync="true" :width="120" :labels="{checked: 'Approved!', unchecked: 'Click to Approve'}" />

</div>
            <div>
<ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" v-for="type in upload"> <a class="nav-link" v-on:click="showTabs(type)" data-toggle="tab" :href="'#up'+type" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">{{type}}</span></a> </li>
</ul>
    
</div>

<div class="tab-content tabcontent-border">
        <div  role="tabpanel" class="tab-pane uppers ploads" v-for="(type,index) in upload" :id="'up'+type">
            <div class="p-20 sammy" >
                {{uploaded(type)}}
                                <iframe v-if="uploaded(type.toLowerCase())" :src="'/api/containers/'+afid+'/download/'+type.toLowerCase()+'.pdf#zoom=100'" /></iframe>
                                <div v-if="!uploaded(type.toLowerCase(0))"><h3>Document Not Uploaded</h3></div>
                </div>
        </div>

    </div>




</div>
</template>
<script>
import Vue from 'vue'
import pdf from 'vue-pdf'
import { mapState, mapActions } from "vuex";
export default {
    name:"uploader",
    props:["afid"],
    data(){
            return {
            upload:["Resume","License","Insurance","1099"],
                            role:this.$store.state.account.user.user.role

            };
            
     },
     
    mounted(){
        },
    components:{
        pdf    
        },
    computed: {
        complete:{
            get:function(){
                        
                if(this.$store.state.apps.currentAffiliate.resume && this.$store.state.apps.currentAffiliate.license && this.$store.state.apps.currentAffiliate.insurance &&  this.$store.state.apps.currentAffiliate['1099']){
                    this.$store.state.apps.currentStep=5;
                    
                    this.$parent.superComplete = true;
                    this.$parent.selected = 5;
                    return true
                }
                return false
            },
            set:function(){}
        }
        },
    methods: {
         ...mapActions("account", ["update"]),
        uploaded(type){
 
            let u ={};

            if(this.$store.state.account.user.user.role=="sales"){
           

            //let us = this.$store.state.users.all.items.filter(user=>{return user.id==this.afid})
             u = this.$store.state.apps.currentAffiliate;
                }
            else{
               u = this.$store.state.account.user.user;  
            }
            if(u)
            if (u[type]==1){
                    return true
            }
            return false

        },
        showTabs(type){
            let list = document.getElementsByClassName("ploads");
    
            document.getElementById("up"+type).classList.add("active");
        },
        openFileDialog(type) {
                document.getElementById(type).click();
        },
        onFileChange(e) {
                
                const formData = new FormData();
                var self = this;
                let pre = e.target.id.split(" ").last().toLowerCase();
                var files = e.target.files || e.dataTransfer.files;       
                if(files.length > 0){
                    for(var i = 0; i< files.length; i++){
                  
                  let suf = files[i].name.split(".").last();
                 
                    formData.append("file", files[i], pre+'.'+suf);
                }
                } 
                  
                this.$store.state[pre] = 1;
                fetch('https://2020i.site/api/containers/'+this.$store.state.apps.currentAffiliate.id+'/upload', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: formData, // body data type must match "Content-Type" header
                  })
                .then(response =>{
                //mark as uploaded

                //get user add new form and save
                let u = this.$store.state.apps.currentAffiliate
                
                u[pre] = 1;
                this.update(u)
                u.userId = u.id
       
            
                } ); // parses response to JSON */
       
                      },
 
        }
}
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
</script>

<style scoped>
button{
    margin-bottom:20px;
}

.uploads {
    display: inline-block;
    margin-right: 36px;
}
.tab-content > .tab-pane {
    display: none;
}
.tab-content > .active {
    display: block;
}
iframe{
    width:100%
}
.sammy{width:50vw}
iframe{height:500px}
</style>