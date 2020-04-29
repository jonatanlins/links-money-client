import React from "react";
import styled, { css } from "styled-components";
import api from "../services/api";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { getUser } from "../services/auth";

import Shell from "../components/Shell";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

function Page({ history, match }) {
  const [formState, setFormState] = React.useState({});
  const [instagramPosts, setInstagramPosts] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((state) => ({ ...state, [field]: value }));
  };

  const fetchInstagramPosts = () => {
    axios
      .get(`https://www.instagram.com/${match.params.id}/?__a=1`)
      .then((response) => {
        const timeline =
          response.data.graphql.user.edge_owner_to_timeline_media;
        const posts = timeline.edges.map((item) => item.node);

        setInstagramPosts(posts);
      });
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!selectedPost) {
      alert("Selecione um link para continuar");
      return;
    }

    const linkData = {
      page_id: match.params.id,
      social_id: selectedPost.id,
      link: formState.link,
      type: "instagram",
    };

    api.post("links", linkData).then((response) => {
      if (response.status < 400) {
        alert("Link criado com sucesso!");

        history.push(`/pages/${match.params.id}/edit`);
      } else {
        alert("Ocorreu um erro, por favor tente novamente");
      }
    });
  };

  React.useEffect(fetchInstagramPosts, []);

  return (
    <Shell>
      <Container>
        <Form onSubmit={handleSave}>
          <Thumbnail src={selectedPost?.thumbnail_src} />

          <TextInput
            label="Link do Botão"
            value={formState.link}
            onChange={handleInputChange("link")}
            required
          />

          <Button>Adicionar Botão</Button>
        </Form>

        <InstagramMosaic>
          {instagramPosts.map((post) => (
            <SquareMosaicButton
              key={post.id}
              image={post.thumbnail_src}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </InstagramMosaic>
      </Container>
    </Shell>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;
`;

const InstagramMosaic = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  margin-top: 0.5em;
`;

const SquareMosaicButton = styled.button`
  background: center url(${(props) => props.image}) no-repeat;
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border: none;
  display: block;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  max-width: 24em;
  align-self: center;
`;

export default Page;
