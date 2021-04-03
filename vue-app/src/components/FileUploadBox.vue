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
                <md-input v-model="form.setNumber" />
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
        <h2>
            Upload ANTX documents and contact information here!
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
                {{cradaFile.name}}
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mt-4">
        <div class="col-md-4">
            <md-field>
                <label>52.204.26</label>
                <md-file @click="onPickFile('fifty')"/>
                <input type="file" style="display:none;" ref="fileInput2" @change="onFile2Picked"/>
                {{fiftyFile.name}}
            </md-field>   
        </div>
    </div>
    <!-- <div class="row ml-2 mt-4 mb-2">
        <div class="col-md-4">
            <md-field>
                <label>Exercise Details</label>
                <md-file @click="onPickFile('exercise')" />
                <input type="file" style="display:none;" ref="fileInput3" @change="onFile3Picked"/>
                {{exerciseFile.name}}
            </md-field>   
        </div>
    </div> -->
    <div class="row ml-2 mt-4">
        <h2>
            Attendee Information
        </h2>
    </div>
    <div class="row ml-2 mt-4">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2" style="margin-bottom:50px;">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input @keypress="format($event, 'one')"  />
            </md-field>   
        </div>
    </div>
        <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input  />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2" style="margin-bottom:50px;">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input @keypress="format($event, 'two')"  />
            </md-field>   
        </div>
    </div>
        <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Name</label>
                <md-input  />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2">
        <div class="col-md-4">
            <md-field>
                <label>Email</label>
                <md-input  :type="'email'" />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mb-4">
        <div class="col-md-4">
            <md-field>
                <label>Phone Number</label>
                <md-input @keypress="format($event, 'three')" />
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
        <div class="col-md-1 mb-4 offset-md-2">
            <md-button  @click="closeForm"  class="navy-text">Close</md-button>
        </div>
        <div class="col-md-2 mb-4">
            <md-button :type="'submit'"  class="md-raised text-white navy-item">Update</md-button>
        </div>
    </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            form:{
                setNumber: "",
                shortName: "",
                notes: "",           
                attendees: [
            //         {name: "",
            //     phoneNumber: "",           
            //     email: ""}, { name: "",
            //     phoneNumber: "",
            //     email: ""}, {
            //     name: "",
            //     phoneNumber: "",
            //     email: ""
            // }
             ]              
            },
            cradaFile: File,
            fiftyFile: File,
            exerciseFile: File,
            cradaLink: "",
            fiftyLink: "",
            exerciseLink: ""
            
          
        }
    },
    mounted(){
        this.form = this.$store.state.packet
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
            console.log(this.cradaFile)
            
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
                if(this.user1.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            else if(userNumber === 'two'){
                if(this.user2.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            else if(userNumber === 'three'){
                if(this.user3.phoneNumber.length === 14)
                    $event.preventDefault();
            }
            
            if(this.user1.phoneNumber.length === 3)
                 this.user1.phoneNumber = '(' + this.user1.phoneNumber + ')' + ' ';        
             if(this.user2.phoneNumber.length === 3)
                 this.user2.phoneNumber = '(' + this.user2.phoneNumber + ')' + ' ';        
             if(this.user3.phoneNumber.length === 3)
                this.user3.phoneNumber = '(' + this.user3.phoneNumber + ')' + ' ';     
            if(this.user1.phoneNumber.length === 9)
                this.user1.phoneNumber += '-'
            if(this.user2.phoneNumber.length === 9)
                this.user2.phoneNumber += '-'
            if(this.user3.phoneNumber.length === 9)
                this.user3.phoneNumber += '-'      
        if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
        return true
    } else {
        $event.preventDefault();
    }
    
        },
        submit(){
        
        const formData = new FormData();
        const formData2 = new FormData();
        const formData3 = new FormData();
        formData.append('file', this.cradaFile, this.cradaFile.name + `group-${this.form.setNumber}`);
        formData2.append('file', this.fiftyFile, this.fiftyFile.name + `group-${this.form.setNumber}`);
        formData3.append('file', this.exerciseFile, this.exerciseFile.name + `group-${this.form.setNumber}`);
        axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}`, formData)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
        axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}`, formData2)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
        axios.post(`https://fileuploadapi20210402110244.azurewebsites.net/filetest/${this.form.setNumber}`, formData3)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
        
        }
    }
}
</script>

<style>
    #x-mark:hover{
        cursor:pointer;
    }
</style>