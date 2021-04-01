<template>
  <div>
      <form @submit.prevent="submit()">
    <div class="row mt-4 ml-2">
        <h2 class="col-md-4">
            Vendor Details
        </h2>
        <h2 class="text-danger col-md-1 offset-md-4" id="x-mark" @click="closeForm">
            X
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
                <md-input v-model="form.shortName" />
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
                <md-file />
            </md-field>   
        </div>
    </div>
    <div class="row ml-2 mt-4 mb-2">
        <div class="col-md-4">
            <md-field>
                <label>52.204.26</label>
                <md-file />
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
        <div class="col-md-2 mb-4 offset-md-4">
            <md-button :type="'submit'"  style="float:right;" class="md-raised text-white navy-item">Update</md-button>
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
            
          
        }
    },
    mounted(){
        this.form = this.$store.state.packet
    },
    methods:{
        closeForm(){
            this.$emit('close-form', true);
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
            var item = this.form;
            item.setNumber = Number(this.form.setNumber)
            console.log(item)
            axios.post("https://localhost:44368/packets", item)
            .then((response) => {
                console.log(response)
                this.$emit('get-form-input', response.data)
            },
            (error) => {
                console.log(error)
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