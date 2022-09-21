import React from "react";
import styled from "styled-components";
import Intro from "../pattern/intro";
import Aboutme from "../pattern/aboutme";
import Portfolio from "../pattern/portfolio";

export default function Home() {
  return (
    <>
      <Intro />
      <Aboutme />
      <Portfolio />
    </>
  );
}
