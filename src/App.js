import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { GlobalStyle, theme } from "./styles";
import { Typography } from "./components/Typography";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Button size="lg">
          <div>Butto</div>
        </Button>
        <Button size="md">test</Button>
        <Button size="sm">게시</Button>
        <Button size="xs">test</Button>
        <hr />
        <Button size="lg" disabled>
          test
        </Button>
        <Button size="md" disabled>
          test
        </Button>
        <Button size="sm" disabled>
          test
        </Button>
        <Button size="xs" disabled>
          test
        </Button>
        <hr />
        <Typography variant="title" color="black">
          이것은 title 입니다
        </Typography>
        <Typography variant="subtitle" color="gray1">
          이것은 subtitle 입니다
        </Typography>
        <Typography variant="body1" color="gray3">
          이것은 body1 입니다
        </Typography>
        <Typography variant="body2" color="primary">
          이것은 body2 입니다
        </Typography>
        <Typography variant="body3" color="warn">
          이것은 body3 입니다
        </Typography>
        <Typography variant="body4" color="success">
          이것은 body4 입니다
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default App;
