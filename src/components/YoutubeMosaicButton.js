import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

function YoutubeMosaicButton({ data, onClick }) {
  return (
    <Button onClick={onClick}>
      <Content>
        <Thumbnail src={data.thumbnails.medium.url} />

        <Title>{data.title}</Title>
        <Text>
          {data.channelTitle} <br /> {dayjs(data.publishedAt).fromNow()}
        </Text>
      </Content>
    </Button>
  );
}

const Button = styled.button`
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 4px 8px;
  cursor: pointer;
  font-family: Roboto;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 168px auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'thumbnail title' 'thumbnail text';
  grid-gap: 3px 8px;
`;

const Thumbnail = styled.img`
  grid-area: thumbnail;
  width: 100%;
`;

const Title = styled.h3`
  grid-area: title;
  font-size: 14px;
  margin: 0;
  text-align: left;
  font-weight: 500;
  margin-bottom: -2px;
  line-height: 18px;

  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  display: block;
  /* autoprefixer: off */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 36px;
`;

const Text = styled.p`
  grid-area: text;
  font-size: 13px;
  margin: 0;
  color: #606060;
  text-align: left;
  font-weight: 500;
  line-height: 1.4;
`;

export default YoutubeMosaicButton;
