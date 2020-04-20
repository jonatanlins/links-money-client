import React from "react";
import styled, { css } from "styled-components";

function TextInput({ label, value = "", multiline, ...props }) {
  const [isFocused, setFocused] = React.useState(false);

  const handleFocus = (event) => {
    if (typeof props.onFocus === "function") {
      props.onFocus(event);
    }
    setFocused(true);
  };

  const handleBlur = (event) => {
    if (typeof props.onBlur === "function") {
      props.onBlur(event);
    }
    setFocused(false);
  };

  return (
    <Container>
      {label && <Label isHidden={value || isFocused}>{label}</Label>}

      {multiline ? (
        <TextArea
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <Input
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </Container>
  );
}

const Container = styled.label`
  font-size: 1em;
  display: block;
  position: relative;
  padding: 16px 0 8px;
`;

const Label = styled.span`
  font-size: 1em;
  left: 11px;
  top: 33px;
  color: #333;
  padding: 0 4px;
  background-color: white;
  position: absolute;
  transition: transform 0.2s ease;

  ${(props) =>
    props.isHidden &&
    css`
      transform: scale(0.9) translate(-6px, -33px);
    `}
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  line-height: 1.618;
  font-size: 1em;
  width: 100%;
  color: #333;
  padding: 14px;
  outline: none;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 8px;
  line-height: 1.618;
  font-size: 1em;
  width: 100%;
  color: #333;
  padding: 14px;
  outline: none;
  box-sizing: border-box;
`;

export default TextInput;
