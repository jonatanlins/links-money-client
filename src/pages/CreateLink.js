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
        console.log(posts);
        setInstagramPosts(posts);
      });
  };

  const handleSelectThumbnail = (thumbnail) => {
    setFormState((state) => ({ ...state, thumbnail }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const linkData = {
      page_id: match.params.id,
      thumbnail: formState.thumbnail,
      link: formState.link,
      type: "instagram",
    };

    api.post("links", linkData).then((response) => {
      alert("Link criado com sucesso!");

      history.push(`/pages/${match.params.id}/edit`);
    });
  };

  React.useEffect(fetchInstagramPosts, []);

  return (
    <Shell>
      <Container>
        <Form onSubmit={handleSave}>
          <Thumbnail src={formState.thumbnail} />

          <TextInput
            label="Link do Botão"
            value={formState.link}
            onChange={handleInputChange("link")}
            required
          />

          <Button>Adicionar Botão</Button>
        </Form>

        <InstagramMosaic>
          <UploadThumbnailButton>
            <FaUpload /> Fazer upload
          </UploadThumbnailButton>

          {instagramPosts.map((item) => (
            <SquareMosaicButton
              key={item.id}
              image={item.thumbnail_src}
              onClick={() => handleSelectThumbnail(item.thumbnail_src)}
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

const UploadThumbnailButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #3a3a3a;
  background-color: "#ddd";
  transition: background-color 0.2s;

  svg {
    font-size: 2.5em;
    margin-bottom: 0.3em;
    color: #666;
  }

  &:hover {
    background-color: #ccc;
  }
`;

export default Page;
