import React from "react";
import styled from "styled-components";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { getUser, logout } from "../services/auth";
import { Link, useHistory } from "react-router-dom";

function Shell({ children }) {
  const { user } = React.useMemo(getUser, []);
  const history = useHistory();

  function handleSignOut() {
    logout();
    history.push("/");
  }

  return (
    <Container>
      <Header>
        <Title to="/p">LinksMoney</Title>

        <HeaderButton>
          <FiBell size={18} />
        </HeaderButton>

        <HeaderButton onClick={handleSignOut}>
          {user.name}
          <FiChevronDown size={18} />
        </HeaderButton>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  background-color: #3498db;
  width: 100%;
  height: 64px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled(Link)`
  color: white;
  flex: 1;
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 1em;
  line-height: 64px;
  text-decoration: none;
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  text-transform: uppercase;
  line-height: 64px;
  height: 64px;
  min-width: 64px;
  padding: 0 1.5em;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s;
  color: white;
  font-size: 1em;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Content = styled.div`
  padding: 2em;
`;

export default Shell;
