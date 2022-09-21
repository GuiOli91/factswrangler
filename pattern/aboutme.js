import React from "react";
import Image from "../src/infra/myimage";
import styled from "styled-components";

const profile_size = 350;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.fifth};
  padding-left: 10em;
  padding-right: 10em;
  padding-top: 5em;
  padding-bottom: 5em;
`;

const SubTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.second};
  text-align: left;
  margin: initial;
  font-style: italic;
  font-weight: bolder;
  @media (min-width: 50em) {
    grid-row: 1;
    grid-column: 1 / 3;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 1em;
  align-items: center;

  @media (min-width: 50em) {
    grid-template-rows: 1fr auto;
    grid-auto-columns: 1fr 2.5fr;
  }
`;

const Wrapper = styled.div`
  padding-left: calc(50% - ${profile_size / 2}px);
  padding-right: calc(50% - ${profile_size / 2}px);

  @media (min-width: 50em) {
    grid-row: 2;
    grid-column: 1;
  }
`;

const Paragraph = styled.p`
  padding-left: 2em;
  padding-right: 2em;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.primary};
  font-weight: bold;
`;

const Maintext = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 50em) {
    grid-row: 2;
    grid-column: 2;
  }
`;

function Aboutme(props) {
  return (
    <Section>
      <Grid>
        <SubTitle>About me</SubTitle>
        <Wrapper>
          <Image
            alt="Guilherme Oliveira Profile Picture"
            src="/images/Profile.jpg"
            layout="intrinsic"
            width={profile_size}
            height={profile_size}
          />
        </Wrapper>
        <Maintext>
          <Paragraph>
            Hello, I am Guilherme and I work as a data analyst/scientist.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            varius quam quisque id diam vel quam elementum. Vestibulum morbi
            blandit cursus risus at ultrices. Iaculis eu non diam phasellus
            vestibulum lorem. Amet dictum sit amet justo donec. Ultricies mi
            quis hendrerit dolor magna. Augue lacus viverra vitae congue. Urna
            id volutpat lacus laoreet non. Neque gravida in fermentum et
            sollicitudin. Malesuada proin libero nunc consequat. Sed felis eget
            velit aliquet sagittis.
          </Paragraph>
        </Maintext>
      </Grid>
    </Section>
  );
}

export default Aboutme;
