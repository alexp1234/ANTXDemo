<template>
  <div>
       <md-toolbar class="md-theme-dark mb-4 navy-item" style="padding-bottom:80px; position:relative;">
          <h1 style="color:white; opacity:0.8;font-size:30px;display:flex;justify-content:center;align-items:center;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" class="md-title">ANTX Document Database</h1>
      </md-toolbar>
      <div class="row">
        <div class="col-md-3" style="border-right:1px lightgrey solid !important;">
                 <md-list>
      <md-list-item>
        <md-icon class="md-size-2x">assignment</md-icon>
        <span class="md-list-item-text" style="font-size:1.6rem;">Vendor Packet</span>
      </md-list-item>

      <md-divider class="md-inset"></md-divider>

      <md-list-item id="test" @click="startNewPacket(packet)" v-for="packet in vendorPackets" :key="packet.id">
         <md-avatar class="md-avatar-icon md-large" style="background-color:rgba(0,0,0,0.54);">
        <md-ripple style=" font-weight:100;">{{packet.setNumber}}</md-ripple>
      </md-avatar>
        <!-- 646464 -->
        <span class="md-list-item-text" style="font-size:1.3rem;">{{packet.shortName}}</span>

       
      </md-list-item>

    </md-list>

        </div>
        <div class="col-md-9" v-if="showDocumentPage">
            <DocumentPage :isCreating="isCreating" @get-form-input="getFormInput" @close-form="closeForm" :packet="currentPacket"/>
        </div>
      </div>
       <div class="row mt-4" v-if="!showDocumentPage">
        <div class="col-md-2 mb-4 offset-md-5">
            <md-button style="float:right;" @click="startNewPacket" class="md-raised text-white navy-item">Start New Packet</md-button>
        </div>
        </div>


  </div>
</template>

<script>
import DocumentPage from '../../src/views/DocumentPage'
import axios from 'axios'
export default {
  data(){
    return{
      vendorPackets: [],
      showDocumentPage: false,
      isCreating: false,
      currentPacket: {}
    }
},
components:{
    DocumentPage
},
mounted(){
  axios.get("https://localhost:44368/packets")
  .then((response) => {
    this.vendorPackets = response.data;
    console.log(this.vendorPackets)
  })
},
methods:{
  goToPacket(){
    this.isCreating = false;
    this.showDocumentPage = true;
  },
  startNewPacket(item){
    if(item){     
      this.currentPacket = item; 
      this.$store.commit('setPacket', item)
      console.log(item)
    }
    this.isCreating = true;
    this.showDocumentPage = true;
  },
  getFormInput(e){
   var newVendor = {}
   newVendor.shortName = e.shortName;
   newVendor.setNumber = e.setNumber;
   newVendor.users = e.users;
   this.vendorPackets.push(newVendor);
  },
  closeForm(e){
    if(e){
      this.showDocumentPage = false;
    }
  }
}
}
</script>

<style>
#test:hover{
  opacity: 0.3;
  cursor: pointer;
}
</style>