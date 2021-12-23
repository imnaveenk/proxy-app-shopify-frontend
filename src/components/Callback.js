import React from "react";
import { useLocation } from "react-router";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Callback() {
  // fetches query params.
  let query = useQuery();
  let loginKey = query.get('loginKey');
  let loginToken = query.get('loginToken');

  // Checks if we have loginToken and Window object
  if (loginToken && loginKey && window && localStorage) {
    localStorage.setItem(loginKey, loginToken);
  }
  
  return <React.Fragment />;
}
export default Callback;
