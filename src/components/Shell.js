import React from "react";
import styled, { css } from "styled-components";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { getUser, logout } from "../services/auth";
import { Link, useHistory } from "react-router-dom";

function Shell({ children }) {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const { user } = React.useMemo(getUser, []);
  const history = useHistory();

  function handleSignOut() {
    logout();
    history.push("/");
  }

  return (
    <Container>
      <HeaderWrapper>
        <Header>
          <Title to="/p">LinksMoney</Title>

          {/* <HeaderButton>
            <FiBell size={18} />
          </HeaderButton> */}

          <HeaderButton onClick={() => setDropdownOpen((state) => !state)}>
            {user.name}
            {/* <FiChevronDown size={18} /> */}
          </HeaderButton>

          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownButton>Conta</DropdownButton>
            <DropdownButton>Preferências</DropdownButton>
            <DropdownButton onClick={handleSignOut}>Sair</DropdownButton>
          </DropdownMenu>
        </Header>
      </HeaderWrapper>

      <Content>{children}</Content>
    </Container>
  );
}

const DropdownMenu = styled.div`
  position: absolute;
  top: 64px;
  right: 10px;
  width: 180px;
  background-color: white;
  padding: 10px 0;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  ${(props) =>
    props.isOpen ||
    css`
      transform: translateY(-20px);
      opacity: 0;
      visibility: hidden;
    `}
`;

const DropdownButton = styled.button`
  border: none;
  color: #262626;
  cursor: pointer;
  line-height: 38px;
  width: 100%;
  text-align: left;
  padding: 0 1em;
  background-color: transparent;
  transition: all 0.1s ease;
  font-size: 0.9em;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  max-width: 975px;
  padding: 0 20px;
  height: 54px;
  margin: 0 auto;
  justify-content: space-between;
  position: relative;
`;

const Title = styled(Link)`
  color: white;
  font-size: 1.3em;
  font-weight: bold;
  margin: 0;
  line-height: 54px;
  text-decoration: none;
  color: #262626;
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  line-height: 54px;
  height: 54px;
  min-width: 54px;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s;
  color: white;
  font-size: 1em;
  color: #262626;
  outline: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const Content = styled.main`
  padding: 30px 20px;
  flex: 1;
  width: 100%;
  max-width: 975px;
  margin: 0 auto;
`;

export default Shell;
