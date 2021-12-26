import axios from "axios";
import React from "react";
import { useState } from "react";
const triggerURL = "https://api.thecodemesh.online/api/v1/trigger/proxy/617ffaafe1761600127f9be4/admin/orders.json?shop=testtheme34.myshopify.com";

const updateQueryStringParameter = (uri, key, value) => {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function Home() {
  const [data, setData] = useState([])
  const theCodeMeshTokens = JSON.parse(localStorage.getItem('theCodeMeshTokens', {}));
  React.useEffect(() => {
    axios.get(`${triggerURL}`, {
      headers: theCodeMeshTokens
    }).then((response) => {
      setData(response.data);
    }).catch(error => {
      //handle generic errors
      console.log(error)
      if (error.response.data.code === 400 || error.response.data.code === 401) {
        const scopeKey = error.response.data.message.scopeKey
        let loginUrl;
        if (scopeKey) {
          loginUrl = updateQueryStringParameter(error.response.data.message.loginUrl, scopeKey, "write_orders,write_products,write_customers")
        }
        // console.log("loginUrl ", loginUrl)
        window.open(loginUrl, '_blank');
      }
    });
  }, []);
  return <React.Fragment >
     <div>{JSON.stringify(data)}</div>
  </React.Fragment>;
}
export default Home;
