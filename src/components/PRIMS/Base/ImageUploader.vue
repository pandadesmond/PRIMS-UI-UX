<template>
  <div class="image-uploader" style="text-align:center; height: 100%;">
    <div><b>Image Details</b></div>
    <div style="padding-top: 10px;">
      <q-img
        :src="imageSrc"
        spinner-color="white"
        style="height: 120px; max-width: 120px;"
      />
    </div>
    <div style="padding-top: 10px;">
      <q-btn 
        no-caps 
        dense 
        color="white" 
        text-color="black" 
        label="upload photo" 
        style="font-size: 12px; color: black; font-weight: bold;" 
        @click="triggerFileUpload" 
      />
      <input type="file" ref="fileInput" style="display: none;" @change="handleFileUpload" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: 'product_1.png', // Default image path or placeholder
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result; // Display the uploaded image locally
        };
        reader.readAsDataURL(file); // Convert the file to a base64-encoded URL
      }
    }
  }
}
</script>

<style scoped>
.image-uploader {
  text-align: center;
  height: 100%;
}
</style>
