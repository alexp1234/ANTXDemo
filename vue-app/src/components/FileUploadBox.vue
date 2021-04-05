<template>
  <div>
      <form @submit.prevent="submit()">
    <div class="row mt-4 ml-2">
        <h2 class="col-md-4">
            Vendor Details
        </h2>
    </div>
    <div class="row mt-4 ml-2">
        <div class="col-md-3">
            <md-field>
                <label>Set #</label>
                <md-input v-model="form.setNumber" :required="true"  />
            </md-field>   
        </div>
    </div>
    <div class="row mt-4 ml-2">
        <div class="col-md-3">
            <md-field>
                <label>Short Name</label>
                <md-input v-model="form.shortName"/>
            </md-field>   
        </div>
    </div>
    <div class="row mt-4 ml-2">
        <h2 class="col-md-4">
            Upload ANTX documents and contact information
        </h2>     
    </div>
    <div class="row mt-4 ml-2">
        <h2>
            Files
        </h2>
    </div>
    <div class="row ml-2 mt-4">
        <div class="col-md-4">
            <md-field>
                <label>CRADA</label>
                <md-file @click="onPickFile('crada')" />
                <input type="file" style="display:none;" ref="fileInput1" @change="onFilePicked"/>
                <a :href="form.cradaLink" target="_blank">{{cradaFile.name}}</a>
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mt-4">
        <div class="col-md-4">
            <md-field>
                <label>52.204.26</label>
                <md-file @click="onPickFile('fifty')"/>
                <input type="file" style="display:none;" ref="fileInput2" @change="onFile2Picked"/>
                <a :href="form.fiftyLink" target="_blank">{{fiftyFile.name}}</a>
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mt-4 mb-2"> 
        <div class="col-md-4">
            <md-field>
                <label>Exercise Details</label>
                <md-file @click="onPickFile('exercise')" />
                <input type="file" style="display:none;" ref="fileInput3" @change="onFile3Picked"/>
                <a :href="form.excerciseLink" target="_blank">{{exerciseFile.name}}</a> 
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mt-4">
        <h2>
            Attendee Information
        </h2>
    </div>
    <div class="row ml-2 mt-4">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input v-model="attendee1.name" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input v-model="attendee1.email" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2" style="margin-bottom:50px;">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input @keypress="format($event, 'one')" v-model="attendee1.phoneNumber"  />
            </md-field>   
        </div>
    </div>
        <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input v-model="attendee2.name" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input v-model ="attendee2.email"  />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2" style="margin-bottom:50px;">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input v-model="attendee2.phoneNumber" @keypress="format($event, 'two')"  />
            </md-field>   
        </div>
    </div>
        <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input v-model="attendee3.name" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input  :type="'email'" v-model="attendee3.email" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mb-4">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input @keypress="format($event, 'three')" v-model="attendee3.phoneNumber" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mb-4">
        <div class="col-md-4">
    <md-field>
      <label>Notes</label>
      <md-textarea v-model="form.notes"></md-textarea>
    </md-field>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-md-1 mb-4 offset-md-1">
            <md-button  @click="closeForm"  class="navy-text">Close</md-button>
        </div>
        <div class="col-md-2 mb-4">
            <md-button :type="'submit'"  class="md-raised text-white navy-item">Update</md-button>
        </div>
    </div>

    </form>
     <div class="vld-parent">
                <loading :active.sync="isLoading" 
                :can-cancel="false" 
                
               ></loading>
               </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    components:{
        Loading
    },
    data(){
        return{
            isLoading: false,
            form:{
                id: "",
                setNumber: "",
                shortName: "",
                notes: "",           
                cradaLink: "",
                fiftyLink: "",
                exerciseLink: "",
                attendees: []          
            },
                attendee1: {id: "", packetId: "", name: "", email: "", phoneNumber: ""},
                attendee2: {id: "", name: "", packetId: "", email: "", phoneNumber: ""},
                attendee3: {id: "", name: "", email: "", packetId: "", phoneNumber:""},
            cradaFile: File,
            fiftyFile: File,
            exerciseFile: File,
            
        }
    },
    mounted(){
        this.form = this.$store.state.packet
        if(this.form.attendees.length > 0){
            this.attendee1 = this.form.attendees[0];
        }
        if(this.form.attendees.length > 1){
            this.attendee2 = this.form.attendees[1];
        }
        if(this.form.attendees.length > 2){
            this.attendee3 = this.form.attendees[2];
        }
    },
    methods:{
        closeForm(){
            this.$emit('close-form', true);
        },
        onPickFile(name){
            if(name == "crada")
                this.$refs.fileInput1.click();
            else if(name == "fifty")
                this.$refs.fileInput2.click();
            else if(name == "exercise")
                this.$refs.fileInput3.click();
        },
        onFilePicked(event){
            const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
            })
            fileReader.readAsDataURL(files[0])
            this.cradaFile = files[0]
            
        },
        onFile2Picked(event){
             const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
            })
            fileReader.readAsDataURL(files[0])
            this.fiftyFile = files[0]
           
        },
        onFile3Picked(event){
             const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
            })
            fileReader.readAsDataURL(files[0])
            this.exerciseFile = files[0]
           
        },
        format: function($event, userNumber){
            if(userNumber === 'one'){
                if(this.attendee1.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            else if(userNumber === 'two'){
                if(this.attendee2.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            else if(userNumber === 'three'){
                if(this.attendee3.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            
            if(this.attendee1.phoneNumber.length === 3)
                 this.attendee1.phoneNumber = '(' + this.attendee1.phoneNumber + ')' + ' ';        
             if(this.attendee2.phoneNumber.length === 3)
                 this.attendee2.phoneNumber = '(' + this.attendee2.phoneNumber + ')' + ' ';        
             if(this.attendee3.phoneNumber.length === 3)
                this.attendee3.phoneNumber = '(' + this.attendee3.phoneNumber + ')' + ' ';     
            if(this.attendee1.phoneNumber.length === 9)
                this.attendee1.phoneNumber += '-'
            if(this.attendee2.phoneNumber.length === 9)
                this.attendee2.phoneNumber += '-'
            if(this.attendee3.phoneNumber.length === 9)
                this.attendee3.phoneNumber += '-'      
        if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
        return true
    } else {
        $event.preventDefault();
    }
    
        },
        getGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            },
        submit(){
        this.isLoading = true;
         this.form.setNumber = Number(this.form.setNumber);
         // post form first, get response object back and 
        axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/packets`, this.form)
        .then((response) => {
          //  console.log(response);
          // response.data.id
          this.isLoading = false;
          this.attendee1.packetId = response.data.id;
          this.attendee2.packetId = response.data.id;
          this.attendee3.packetId = response.data.id;

          if(!this.attendee1.id && this.attendee1.name){
             this.attendee1.id = this.getGuid();
              axios.post('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee1)
          }
          else if(this.attendee1.name){
              // attendee exists
              axios.put('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee1)
          }
          if(!this.attendee2.id && this.attendee2.name){
            this.attendee2.id = this.getGuid();
             axios.post('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee2)
          }
          else if(this.attendee2.name){
              axios.put('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee2)
          }
          if(!this.attendee3.id && this.attendee3.name){
                this.attendee3.id = this.getGuid();
                axios.post('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee3)
          }
          else if(this.attendee3.name){
              axios.put('https://fileuploadapi20210402110244.azurewebsites.net/attendees', this.attendee3)
          }
                    
           
                
          
            const formData = new FormData();
            const formData2 = new FormData();
            const formData3 = new FormData();
        
        
        if(this.exerciseFile.name != "File"){
              formData3.append('file', this.exerciseFile, this.exerciseFile.name + `group-${this.form.setNumber}`);
            axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}/3`, formData3)
            .then((response) => {
                console.log(response)
                this.form.exerciseLink = response.data;
        // submit files, submit form data, 
        
            }, (error) => {
                console.log(error);
            })      
        }
         if(this.fiftyFile.name != "File"){
            formData2.append('file', this.fiftyFile, this.fiftyFile.name + `group-${this.form.setNumber}`);
            axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}/2`, formData2)
            .then((response) => {
                this.form.fiftyLink = response.data;
            }, (error) => {
                console.log(error);
            })
        }
              if(this.cradaFile.name != "File"){
            console.log(this.cradaFile.name)
        formData.append('file', this.cradaFile, this.cradaFile.name + `group-${this.form.setNumber}`);  
        axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}/1`, formData)
        .then((response) => {
            this.form.cradaLink = response.data;
            
        }, (error) => {
            console.log(error);
        })
        }
        })

       // assign formId to users

        
        }
    }
}
</script>

<style>
    #x-mark:hover{
        cursor:pointer;
    }
</style>