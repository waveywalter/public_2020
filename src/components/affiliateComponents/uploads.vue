<template>
    <div id="uploads">
                 <div grid-list-md v-for="type in upload" class="uploads">
 
                        <button color="" class="black--text btn btn-default" loaders v-on:click="openFileDialog(type)">
                          {{type.capitalize()}}
                        <i class="icon-arrow-up-circle"></i>
                          <input type="file" :id="type" style="display:none" v-on:change="onFileChange">
                        </button>


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
                                                         <iframe v-if="uploaded(type)" :src="'/api/containers/'+afid+'/download/'+type+'.pdf#zoom=100'" /></iframe>
                                                         <div v-if="!uploaded(type)"><h3>Document Not Uploaded</h3></div>
                                           </div>
                                    </div>
      
                                </div>
   
                            
    </div>
</template>
<script>
import Vue from 'vue'
import pdf from 'vue-pdf'
export default {
    name:"uploader",
    props:["afid"],
    data(){
            return {
            upload:["resume","license","insurance","ces"]
            };
     },
    mounted(){

        },
    components:{
        pdf    
        },
    computed: {
        },
    methods: {
        uploaded(type){
            console.log("UPLADED TYPE")
            let u ={};
            console.log(this.$store.state.users.all.items)
            console.log(this.$store.state.account.user.user)
            if(this.$store.state.users.all.items!=undefined){
            if(this.$store.state.users.all.items.length!=undefined){
            let us = this.$store.state.users.all.items.filter(user=>{return user.id==this.afid})
             u = us[0]
            
            }

                }            else{
               u = this.$store.state.account.user.user;  

            }
            console.log(u)
            if (u[type]==1){
                    return true
            }

            console.log(u)
            return false
            
        },
        showTabs(type){
            let list = document.getElementsByClassName("ploads");
            list.forEach((ele)=>{
                    ele.classList.remove("active");
                })
            document.getElementById("up"+type).classList.add("active");
        },
        openFileDialog(type) {
                console.log('FILE DIALOG')
                console.log(type);

                document.getElementById(type).click();
        },
        onFileChange(e) {
                console.log('FILE CHANGE')
                const formData = new FormData();
                var self = this;
                let pre = e.target.id.split(" ").last().toLowerCase();
                var files = e.target.files || e.dataTransfer.files;       
                if(files.length > 0){
                    for(var i = 0; i< files.length; i++){
                  console.log(files[i])
                  let suf = files[i].name.split(".").last();
                  console.log(suf);
                    formData.append("file", files[i], pre+'.'+suf);
                }
                } 
                console.log(formData);  
                this.$store.state[pre] = 1;
                fetch('https://2020i.site/api/containers/'+this.$store.state.account.user.user.id+'/upload', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: formData, // body data type must match "Content-Type" header
                  })
                .then(response =>{console.log( response.json())
                //mark as uploaded

        
       
            
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