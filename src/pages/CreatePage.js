import React from "react";
import api from "../services/api";

function Page({ history, location }) {
  function requestPageCreation() {
    const code = new URLSearchParams(location.search).get("code");

    const baseURL = window.location.origin.replace("http:", "https:");
    const redirect_uri = `${baseURL}/p/newPage`;

    api
      .post("pages", { code, redirect_uri })
      .then((response) => {
        history.push(`/p/pages/${response.data.username}`);
      })
      .catch(() => {
        alert("Um erro inesperado aconteceu, tente novamente mais tarde");
        history.push(`/p`);
      });
  }

  React.useEffect(requestPageCreation, []);

  return <div>Carregando informações do Instagram...</div>;
}

export default Page;
