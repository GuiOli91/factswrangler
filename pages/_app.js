import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .back_test {
    background-color: rgba(66, 156, 63, 0.671);
}

  .red_box {
    border: solid red ;
}
  
`;

const theme = {
  colors: {
    primary: "#3E606F",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
