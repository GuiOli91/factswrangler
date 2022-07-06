import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  p {
    line-height: 1.5em;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
    
  }

  .back_test {
    background-color: rgba(66, 156, 63, 0.671);
}

  .red_box {
    border: solid red ;
}

  .list-inline {
    padding-left: 0;
    list-style: none;
    text-align: center;
  }
  
  .list-inline-item {
    display: inline-block;
    font-size: 3rem;
    margin-top: 5px;
   
  }

  .linkedin:hover {
    fill: #0A66C2;
  }

  .github:hover {
    fill: #343690;
  }

  .list-inline-item:not(:last-child) {
    margin-right: 2rem;
  }

`;

const theme = {
  colors: {
    primary: "#193441",
    second: "#3E606F",
    third: "#91AA9D",
    fourth: "#D1DBBD",
    fifth: "#FCFFF5",
  },
  font_colors:{
    primary: "#FCFFF5",
    second: "#FFFFFF",
    third: "#000000",
    fourth: "#000000",
    fifth: "#193441",
  }
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
