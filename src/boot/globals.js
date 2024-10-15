import { boot } from 'quasar/wrappers'
// import axios from 'axios'

export default boot(async ({app}/* { app, router, ... } */) => {
  // something to do
  // app.use(foo);

  var data;

  
  var now = new Date();

  // Extract date components
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  var day = String(now.getDate()).padStart(2, '0');

  // Extract time components
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');

  // Construct the formatted date-time string
  var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  try {
    const response = await fetch('config.json?timestamp='+dateTimeString); // Assuming 'config.json' contains the URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json(); // Assuming the URL is stored as a JSON property

    if (data && data.url) {
      // axios.defaults.baseURL = data.url;
      // console.log('axios.defaults.baseURL set to:', data.url);
    } else {
      console.error('URL not found in JSON data');
    }
  } catch (error) {
    console.error('Error reading config file:', error);
  }

  //for erp checking if outlet ip set
  if(sessionStorage.getItem('session_ip'))
  {
    data.url = sessionStorage.getItem('session_ip');
  }

  app.config.globalProperties.$global_config = data


})
