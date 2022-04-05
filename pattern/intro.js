import React from "react";
import Image from "../src/infra/myimage";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  padding-top: 40vh;
`;

const Wrap = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
`;

function Intro(props) {
  return (
    <>
      <Wrap>
        <Image
          alt="Dots and lines"
          src="/images/background.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Wrap>
      <Title>Factswrangler</Title>
    </>
  );
}

export default Intro;
