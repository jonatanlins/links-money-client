import React from "react";
import { useFormState } from "react-use-form-state";
import api from "../services/api";
import axios from "axios";

import Overlay from "../components/Overlay";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

function Page({ history, match }) {
  const [formState, { text }] = useFormState();
  const [post, setPost] = React.useState({});

  function fetchPost() {
    axios
      .get(`https://www.instagram.com/${match.params.id}/?__a=1`)
      .then((response) => {
        const user = response.data.graphql.user;
        const timeline = user.edge_owner_to_timeline_media.edges;
        const post = timeline.find(
          (post) => post.node.id === match.params.postId
        ).node;

        setPost(post);

        api.get("links").then((response) => {
          const link =
            response.data.find((post) => post.social_id === match.params.postId)
              ?.link || "";

          formState.setField("link", link);
        });
      });
  }

  const handleSaveLink = (event) => {
    event.preventDefault();

    const linkData = {
      page_id: match.params.id,
      social_id: match.params.postId,
      link: formState.values.link,
      type: "instagram",
    };

    api.post("links", linkData).then((response) => {
      if (response.status < 400) {
        alert("Link definido com sucesso!");

        history.goBack();
      } else {
        alert("Ocorreu um erro, por favor tente novamente");
      }
    });
  };

  React.useEffect(fetchPost, []);

  return (
    <Overlay>
      <img src={post?.thumbnail_src} width="200" />

      <form onSubmit={handleSaveLink}>
        <TextInput label="Link" required {...text("link")} />

        <Button>Salvar</Button>
      </form>
    </Overlay>
  );
}

export default Page;
