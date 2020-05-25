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
    api.get(`/pages/${match.params.id}`).then((response) => {
      const post = response.data.posts.find(
        (post) => post.id.toString() === match.params.postId
      );

      if (post) {
        console.log(post);
      } else {
        history.push(`/p/pages/${match.params.id}`);
        console.log(response.data.posts);
      }
    });
  }

  const handleSaveLink = (event) => {
    event.preventDefault();

    const linkData = {
      id: match.params.postId,
      link: formState.values.link,
    };

    api
      .put("posts", linkData)
      .then(() => {
        alert("Link definido com sucesso!");

        history.goBack();
      })
      .catch(() => {
        alert("Ocorreu um erro, por favor tente novamente");
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
