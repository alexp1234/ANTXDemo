<template>
  <div>
   
      <div class="container-fluid">
            <FileUploadBox @get-form-input="getFormInput" @close-form="closeForm" />
            <AttendeeBox/>
      </div>
  </div>
</template>

<script>
import FileUploadBox from '../components/FileUploadBox'
import AttendeeBox from '../components/AttendeeBox'
export default {
    components:{
        FileUploadBox,
        AttendeeBox
    },
    props: {
        isCreating: Boolean,
    },
    methods:{
        getFormInput: function(e){
            this.$emit('get-form-input', e)
        },
        closeForm(e){
            this.$emit('close-form', e);
        }
    }
}
</script>

<style>

</style>