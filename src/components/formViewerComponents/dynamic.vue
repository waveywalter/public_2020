<script>
import Vue from 'vue'
import printer from "vue-printer";
var staticRenderFns = [];
export default {
  name:"dynamic",
props: ['template','fid'],
mounted(){
},
components:{printer},
data() {
    return {
      templateRender: null,
      unsent:true,
      signed:false,
      authcode:"",
      error:"Not A Match",
      error_on:false,
      formID:'',
      formAuthed:false,
      printer_off:true
    };
  },
methods:{
  print(){
    this.$htmlToPaper('printarea');
  },
  sendAuth(){

      console.log("Verfiy auth code and alert status")
      let code= this.authcode;
      let formid = this.$store.state.account.formid;
      let sformid = this.$store.state.form.current_signed_form
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
            let y = "<div class='former'> Thanks For Signing <div>Print</div><div>Download</div><div><h3 >"+this.template.FormTitle+"</h3>"+
          this.template.FormContent+
          "<div class='error' v-if='error_on'>{{error}}</div>"+
          "<div> Auth Details</div>"+
          "</div></div>";
        var res = Vue.compile(y);
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
            this.formAuthed = true
            console.log(data)
            data = JSON.parse(data)
          let d = {
              status:data.status,
              meta:data.meta,
              signed_date:data.signed_date
              }
              console.log(d)
          //STORE AUTH META DATA WITH FORM
        fetch('/api/wsers/'+this.$store.state.account.user.user.id+'/signedforms/'+sformid+'?access_token='+this.$store.state.account.user.id,{
                    method:"PUT",
           headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(d)   
        }).then(res=>console.log(res))  


           }
        //store results with form


          console.log(data)
         // this.unsent = false
          }) 
  },
  getAuth(){
      console.log(this)
      let authDetails = {
          userid:this.$store.state.account.user.user.id,
          formId:this.$store.state.account.formid,
          //change formid to clicked value
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
      this.unsent= false;
      //save auth id to user model
      //this.$store.state.account.user.authCodeId = 
  },
  },
 render(h) {
    if (!this.templateRender) {
      return h();
    } else { // If there is a template, I'll show it
      return this.templateRender();
    }
  },
watch: {
// Every time the template prop changes, I recompile it to update the DOM
	template:{
      immediate: true, // makes the watcher fire on first render, too.
      handler() {

        if(this.template){
        let html = "<div class='former'> <h3>"+this.template.FormTitle+"</h3>"+this.template.FormContent+"<div class='error' v-if='error_on'>{{error}}</div></div>"
        let status = this.$store.state.form.userForms.filter((form)=>{
          console.log(form.formId,this.template.id);this.formID=this.template.id; if (form.formId==this.template.id)
          return form
          })
        this.unsent = true 
        console.log(status)
        if(status[0].status==true){

          let new_html = this.template.FormContent.replace(/\<input/g ,"<input disabled ")
          html ="<div class='former'><h3>Already Signed</h3> <button class='btn btn-default' v-on:click='print'>Print</button>"+
          "<div id='printarea'><h3 >"+this.template.FormTitle+"</h3>"+
          new_html+"<div class='error' v-if='error_on'>{{error}}</div>"+
          "<div>Signed By:"+this.$store.state.account.user.user.firstname+' '+this.$store.state.account.user.user.lastname+"</div>"+
          "<div>Authentication Phone: "+this.$store.state.account.user.user.phone+"</div>"+
          "<div>Date Signed: "+status[0].signed_date+"</div>"+
          "<div>IP Address: "+status[0].meta['x-forwarded-for']+"</div>"+
          "<div>URL:"+status[0].meta['referer']+"</div>"+
          "</div></div>"
         // this.unsent = false
          this.formAuthed = true
        }
        var res = Vue.compile(html);
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
    }
  },
}
String.prototype.capitalize = function() {
 return this.charAt(0).toUpperCase() + this.slice(1);
    }
</script>
<style>
div#printarea {
    background-color: white;
    padding: 20px;
    color: black;
}

div#printarea  input {
    background-color: white;
    border none:;
    border: none;
}
#printarea h3{color:black}
</style>