<template>
  <div>
       <md-toolbar class="md-theme-dark mb-4 navy-item" style="padding-bottom:80px; position:relative;">
          <h1 style="color:white; opacity:0.8;font-size:30px;display:flex;justify-content:center;align-items:center;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" class="md-title">ANTX Document Database</h1>
      </md-toolbar>
      <div class="container-fluid">
           <div class="row" style="margin-top:75px;">
          <div class='col-md-5'></div>
          <div class="col-md-2">
              <p style="text-align:center;">
                   <img src='../../src/assets/img/logo.png' class="img-fluid ml-2" id="logo-image"/>
              </p>
          </div>
      </div>
      <form @submit.prevent="login">
      <!-- <div class="row mt-4">
          <div class="col-md-2 offset-md-5">
            <md-field>
             <label>Email Address</label>
            <md-input v-model="email" :type="'email'"></md-input>
             </md-field>
          </div>
      </div> -->
      <div class="row">
          <div class="col-md-2 offset-md-5">
             <md-field>
                <label>Access Code</label>
                <md-input v-model="code"></md-input>
             </md-field>
          </div>
      </div>
        <div class="row mt-2">
        <div class="col-md-2 mb-4 offset-md-5">
            <md-button :type="'submit'" style="float:right;" class="md-raised text-white navy-item">Log In</md-button>
        </div>
    </div>
    </form>
      </div>
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            // email: "",
            code: ""
        }
    },
    methods:{
        login(){
            var codeParam = this.code;
            axios.get(`https://fileuploadapi20210402110244.azurewebsites.net/access/${codeParam}`)
            .then(() => {
                 this.$emit("show-document-page", true);
            }, (error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
@media screen and (max-width: 992px) {
    #logo-image{
        height:250px;
        
    }
  }

  @media screen and (max-width: 600px) {
      #logo-image{
          height:200px;
      }
  }
</style>