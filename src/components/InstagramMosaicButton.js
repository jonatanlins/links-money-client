import React from 'react';
import styled from 'styled-components';

function SquareMosaicButton({ image, onClick }) {
  return <StyledButton img={image} onClick={onClick} />;
}

const StyledButton = styled.button`
  background: center url(${(props) => props.img}) no-repeat;
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border: none;
  display: block;
  outline: none;
  margin: 0;
  box-sizing: border-box;
`;

export default SquareMosaicButton;
