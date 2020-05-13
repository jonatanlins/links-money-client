import React from "react";
import styled from "styled-components";
import * as FontAwesomeIcon from "react-icons/fa";

function Component({ buttons = [], onClick }) {
  return (
    <Carousel>
      {buttons.map((item) => {
        const Icon = FontAwesomeIcon[item.icon];

        return (
          <Button key={item.id} onClick={() => onClick(item)}>
            <ButtonIconWrapper background={item.gradient || item.color}>
              <Icon />
            </ButtonIconWrapper>
            <ButtonLabel>{item.label}</ButtonLabel>
          </Button>
        );
      })}
    </Carousel>
  );
}

const Carousel = styled.div`
  overflow-x: auto;
  display: flex;
  padding: 0 0.5em;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 1em;
  flex: 0 0 5em;
  width: 5em;
`;

const ButtonIconWrapper = styled.div`
  position: relative;
  border-radius: 9em;
  width: 3.5em;
  height: 3.5em;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.background};

  svg {
    font-size: 1.618em;
    color: white;
  }

  &:after {
    content: "";
    position: absolute;
    height: 50px;
    width: 50px;
    border: 2px solid white;
    border-radius: 9em;
    left: 1px;
    top: 1px;
  }
`;

const ButtonLabel = styled.span`
  max-width: 100%;
  display: inline-block;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.5em;
`;

export default Component;
