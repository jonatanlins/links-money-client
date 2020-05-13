import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

function Page() {
  const references = {
    firstSection: React.useRef(),
    resoursesSection: React.useRef(),
    pricesSection: React.useRef(),
  };

  const scrollToRef = (ref) => {
    window.scrollTo(0, references?.[ref]?.current?.offsetTop);
  };

  return (
    <Container>
      <Header>
        <TitleButton to="/" onClick={() => scrollToRef("firstSection")}>
          LinksMoney
        </TitleButton>

        <nav>
          <HeaderButton
            to="#resources"
            onClick={() => scrollToRef("resoursesSection")}
          >
            Recursos
          </HeaderButton>
          <HeaderButton
            to="#prices"
            onClick={() => scrollToRef("pricesSection")}
          >
            Preços
          </HeaderButton>
          <HeaderButton to="/p/signin">Entre</HeaderButton>
          <MainHeaderButton to="/p/signup">Cadastre-se</MainHeaderButton>
        </nav>
      </Header>

      <FirstSection ref={references.firstSection}>
        <div className="illustration">
          <Image src="https://via.placeholder.com/500x500" />
        </div>
        <div className="content">
          <H1>Título</H1>
          <H2>Subtítulo</H2>
          <Button to="/p/signup">Comece a Usar Agora</Button>
        </div>
      </FirstSection>

      <Section ref={references.resoursesSection}>
        <H3 id="kk">Título da seção</H3>
        <H4>Subtítulo da seção</H4>

        <Grid columns={3}>
          <div>
            <Image src="https://via.placeholder.com/400x200" />
            <H5>Título</H5>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              mattis justo vitae ex venenatis, in luctus felis laoreet.
              Vestibulum sit amet ornare leo, et facilisis risus. Mauris sed
              ullamcorper massa. Cras bibendum eros a vulputate mollis.
            </P>
          </div>
          <div>
            <Image src="https://via.placeholder.com/400x200" />
            <H5>Título</H5>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              mattis justo vitae ex venenatis, in luctus felis laoreet.
              Vestibulum sit amet ornare leo, et facilisis risus. Mauris sed
              ullamcorper massa. Cras bibendum eros a vulputate mollis.
            </P>
          </div>
          <div>
            <Image src="https://via.placeholder.com/400x200" />
            <H5>Título</H5>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              mattis justo vitae ex venenatis, in luctus felis laoreet.
              Vestibulum sit amet ornare leo, et facilisis risus. Mauris sed
              ullamcorper massa. Cras bibendum eros a vulputate mollis.
            </P>
          </div>
        </Grid>
      </Section>

      <Section ref={references.pricesSection}>
        <H3>Título da seção</H3>
        <H4>Subtítulo da seção</H4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <Card>
            <H5>Plano Grátis</H5>
            <P>
              <FaCheck /> Vantagem 1
            </P>
            <P>
              <FaCheck /> Vantagem 2
            </P>
            <P>
              <FaCheck /> Vantagem 3
            </P>
            <P>
              <FaCheck /> Vantagem 4
            </P>

            <span style={{ flex: 1 }} />

            <H6>
              R$ 0,00<small>/mês</small>
            </H6>

            <Button>Comece já</Button>
          </Card>
          <Card>
            <H5>Plano Profissional</H5>
            <P>
              <FaCheck /> Vantagem 1
            </P>
            <P>
              <FaCheck /> Vantagem 2
            </P>
            <P>
              <FaCheck /> Vantagem 3
            </P>
            <P>
              <FaCheck /> Vantagem 4
            </P>
            <P>
              <FaCheck /> Vantagem 5
            </P>
            <P>
              <FaCheck /> Vantagem 6
            </P>
            <P>
              <FaCheck /> Vantagem 7
            </P>
            <P>
              <FaCheck /> Vantagem 8
            </P>

            <H6>
              R$ 9,99<small>/mês</small>
            </H6>

            <Button>Comece já</Button>
          </Card>
        </div>
      </Section>

      <FeaturedSection>
        <H3>Chamada para ação</H3>
        <Button to="/p/signup">Comece Agora</Button>
      </FeaturedSection>

      <Footer>
        <P>
          &copy; 2020 by <Anchor href="#">LinksMoney</Anchor>
        </P>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  padding: 5em 0 0;
`;

const P = styled.p`
  justify-content: center;
  margin: 0.5em 0;
  color: #444;
`;

const Card = styled.div`
  border-radius: 0.5em;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 2em;
  width: 20em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;

  h5 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    color: #3a3a3a;
    margin-bottom: 1.5em;
  }

  h6 {
    margin: 0.7em 0;
    text-align: center;
  }

  p svg {
    color: green;
    width: 1em;
    margin-right: 0.5em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.columns}, auto);
  grid-gap: 2.5em 1em;

  @media (min-width: 600px) {
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: stretch;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1em;

  nav {
    display: none;
  }

  @media (min-width: 600px) {
    justify-content: space-between;

    nav {
      display: flex;
    }
  }
`;

const TitleButton = styled(Link)`
  text-decoration: none;
  line-height: 3.5em;
  font-size: 1.4em;
  color: #3a3a3a;
  cursor: pointer;
`;

const HeaderButton = styled(Link)`
  color: #3a3a3a;
  cursor: pointer;
  line-height: 5em;
  text-decoration: none;
  padding: 0 1.5em;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    color: #111;
  }
`;

const MainHeaderButton = styled(Link)`
  color: white;
  cursor: pointer;
  line-height: 2.5em;
  text-decoration: none;
  padding: 0 1em;
  margin-left: 1.5em;
  transition: all 0.2s;
  border-radius: 0.5em;
  background-color: #3498db;
  align-self: center;

  &:hover {
    background-color: #2980b9;
  }
`;

const Section = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: 3em 1em;

  @media (min-width: 600px) {
    padding: 6em 1em;
  }
`;

const FirstSection = styled(Section)`
  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    & .illustration {
      order: 2;
    }

    & .content {
      order: 1;
    }
  }
`;

const FeaturedSection = styled(Section)`
  text-align: center;
  background: #2c3e50;
  max-width: initial;

  h3 {
    color: white;
    margin-bottom: 1em;
  }
`;

const H1 = styled.h1`
  color: #3a3a3a;
  font-size: 2em;
  margin: 0.1em 0;

  @media (min-width: 600px) {
    font-size: 4em;
  }
`;

const H2 = styled.h2`
  color: #444;
  font-size: 1.25em;
  font-weight: 400;
  margin: 0.1em 0 1.5em;

  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

const H3 = styled.h3`
  color: #3a3a3a;
  font-size: 2.5em;
  text-align: center;
  margin: 0.1em 0;
`;

const H4 = styled.h4`
  color: #555;
  font-size: 1.25em;
  font-weight: 400;
  text-align: center;
  margin: 0.2em 0 3em;
`;

const H5 = styled.h5`
  color: #3a3a3a;
  font-size: 1.25em;
  margin: 0.5em 0;
`;

const H6 = styled.h6`
  font-size: 2em;
  margin: 0.1em 0;
  font-weight: 500;

  small {
    color: #555;
    font-size: 0.7em;
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #3498db;
  padding: 0.8em 1.5em;
  display: inline-block;
  border-radius: 0.5em;
  font-size: 1.3em;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background-color: #2980b9;
  }
`;

const Anchor = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Footer = styled.footer`
  padding: 4em 1em;
  text-align: center;
`;

export default Page;
