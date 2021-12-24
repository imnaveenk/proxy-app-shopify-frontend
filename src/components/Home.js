import axios from "axios";
import React from "react";
import { useState } from "react";

const triggerURL = "https://api.thecodemesh.online/api/v1/trigger/proxy/617ffaafe1761600127f9be4/admin/products.json?shop=testtheme34.myshopify.com";

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
  const [products, setProducts] = useState([])
  const codeMeshTokens = JSON.parse(localStorage.getItem('codeMeshTokens', {}));
  React.useEffect(() => {
    axios.get(`${triggerURL}`, {
      headers: codeMeshTokens
    }).then((response) => {
      setProducts(response.data.products);
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
    {products.map((product) => <div>{product.title}</div>)}
  </React.Fragment>;
}
export default Home;
