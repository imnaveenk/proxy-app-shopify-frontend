import axios from "axios";
import React from "react";

const triggerURL = "https://api.thecodemesh.online/api/v1/trigger/proxy/61c420365045140012e62765/admin/products.json?shop=pulkit-jai.myshopify.com&scopes=write_orders";

function Home() {
  React.useEffect(() => {
    console.log('i am here.')
    axios.get(`${triggerURL}`).then((response) => {
      console.log(response.data);
    }).catch(error => {
      if(error.response.data.code === 400 || error.response.data.code === 401) {
        // TODO: Check for the login url.
        window.open(error.response.data.message.authStatus.value, '_blank');
        // console.log('the error is:', error, error.response.data.code, error.response.data.message.authStatus.value);
      }
    });
  }, []); 
  return <React.Fragment />;
}
export default Home;
