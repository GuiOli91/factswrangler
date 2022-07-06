import React from "react";
import Image from "../src/infra/myimage";
import Linkedin from "../public/images/icon/linkedin.svg";
import GitHub from "../public/images/icon/github.svg";
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.second};
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
`;

const TextIntro = styled.div`
  position: absolute;
  top: 45%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const Header = styled.header`
  position: relative;
  overflow: hidden;
`;

function Intro(props) {
  return (
    <Header>
      <Background>
        <Image
          alt="Dots and lines"
          src="/images/background.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Background>
      <TextIntro>
        <Title>Factswrangler</Title>
        <SubTitle>Data analyst | Data scientist</SubTitle>
        <br />
        <hr />
        <br />
        <ul className="list-inline">
          <li className="list-inline-item linkedin">
            <a href="https://www.linkedin.com/in/goliveira91/" target="_blank">
              <Linkedin />
            </a>
          </li>
          <li className="list-inline-item github">
            <a href="https://github.com/GuiOli91" target="_blank">
              <GitHub />
            </a>
          </li>
        </ul>
      </TextIntro>
    </Header>
  );
}

export default Intro;
