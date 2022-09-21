import React from "react";
import Image from "../src/infra/myimage";
import styled from "styled-components";

const profile_size = 350;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.fourth};
  padding-left: 10em;
  padding-right: 10em;
  padding-top: 5em;
  padding-bottom: 5em;
`;


function Portfolio(props) {
  return (
    <Section>
      
    </Section>
  );
}

export default Portfolio;