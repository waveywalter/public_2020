<script>
import Vue from 'vue'

var staticRenderFns = [];
export default {
  name:"dynamic",
props: ['template'],
data() {
    return {
      templateRender: null,
      unsent:true,
      authcode:"",
      error:"Not A Match",
      error_on:false
    };
  },
methods:{	
clickele(){
    console.log("Render HTML Form and get auth code")
  },
  sendAuth(){

      console.log("Verfiy auth code and then clear authId if match")
      let code= this.authcode;
      let formid = this.$route.params.id;
      let userid = this.$store.state.account.user.user.id;
      let authDetails ={
          formid:formid,
          userid:userid,
          code:code
      }
      let _this = this
      fetch('/api/verifyauthcode',{
          method:"POST",
           headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(authDetails)         
      }).then(res=>res.text()).then(data=>{
          console.log(_this)
          if(data=="No Bueno"){
              this.authcode=''
                          this.error = "Not Authenticated"
            this.error_on = true
            setTimeout(() => {
                this.error_on = false
            }, 3000);
            //Indicate no good
          }
          else{
              this.authcode='';
              //Indicate successful with popup
            this.authcode=''
            this.error = "Authenticated"
            this.error_on = true;
            setTimeout(() => {
                this.error_on = false
            }, 3000);
        var res = Vue.compile("<div class='former'>Congratulations <div>Print</div><div>Download</div></div>");
			console.log(res)
        this.templateRender = res.render;
        
        // staticRenderFns belong into $options, 
        // appearantly
        this.$options.staticRenderFns = []
       // 
        // clean the cache of static elements
        // this is a cache with the results from the staticRenderFns
        this._staticTrees = []
        
        // Fill it with the new staticRenderFns
        for (var i in res.staticRenderFns) {
          staticRenderFns.push(res.staticRenderFns[i]);
          this.$options.staticRenderFns.push(res.staticRenderFns[i])
        }
            //this.$parent.html = '<div>You have signed this form. Click here to print. Click here to download.</div>';
           }
          console.log(data)})
  },
  getAuth(){
      console.log(this)
      let authDetails = {
          userid:this.$store.state.account.user.user.id,
          formId:this.$route.params.id,
          phone:this.$store.state.account.user.user.phone,
          email:this.$store.state.account.user.user.email,
          url:this.$route.path
      };
      
      console.log("HIT API GET AUTHCODE SENT - SWITCH BUTTON TO SUBMIT")
      console.log(authDetails)
      fetch('/api/createauthandsend',{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(authDetails)
      }).then(res=>res.json()).then(json=>{console.log(json);this.$store.state.account.authCodeId=json.id;console.log(this.$store.state)})
    this.unsent = false
      //save auth id to user model
      //this.$store.state.account.user.authCodeId = 
  }

  },
render(h) {
    if (!this.templateRender) {
      return h('div', 'loading...');
    } else { // If there is a template, I'll show it
      return this.templateRender();
    }
  },
watch: {
// Every time the template prop changes, I recompile it to update the DOM
	template:{
      immediate: true, // makes the watcher fire on first render, too.
      handler() {
        console.log(Vue)
        console.log(this.template)
        var res = Vue.compile("<div class='former'>"+this.template[0].FormContent+"<div class='error' v-if='error_on'>{{error}}</div></div>");
			console.log(res)
        this.templateRender = res.render;
        
        // staticRenderFns belong into $options, 
        // appearantly
        this.$options.staticRenderFns = []
       // 
        // clean the cache of static elements
        // this is a cache with the results from the staticRenderFns
        this._staticTrees = []
        
        // Fill it with the new staticRenderFns
        for (var i in res.staticRenderFns) {
          staticRenderFns.push(res.staticRenderFns[i]);
          this.$options.staticRenderFns.push(res.staticRenderFns[i])
        }
      }
    }
  },
}
    String.prototype.capitalize = function() {
 return this.charAt(0).toUpperCase() + this.slice(1);
    }
</script>