<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/vue-material.min.css">
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">     
      <LandingPage v-if="showLandingPage" @show-document-page="showDocumentPage" />    
      <VendorPacketPage v-else/>
      <DocumentPage  v-if="1 == 2"/>
  </div>
</template>

<script>
import DocumentPage from '../src/views/DocumentPage'
import LandingPage from '../src/views/LandingPage'
import VendorPacketPage from '../src/views/VendorPacketsPage'
export default {
  name: 'App',
  components: {
    DocumentPage,
    LandingPage,
    VendorPacketPage
  },
  data(){
    return{
      showLandingPage: true
    }
  },
  methods:{
    showDocumentPage(e){
      if(e)
        this.showLandingPage = false;
    }
  }
}
</script>
<style>
body{
    overflow-x:hidden;
}
 .navy-item{
   background-color: #064263 !important;
   /* Original Navy - #064263*/
 }
</style>