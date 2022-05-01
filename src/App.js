import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { theme, GlobalStyle } from "./styles";
import { Typography } from "./components/Typography";
import { Input } from "./components/Input";
import { Icon } from "./components/Icon/Icon";

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
        <hr />
        <Input placeholder="이것은 input입니다" />
        <Input placeholder="이것은 input입니다" />
        <Input placeholder="valid" size="lg" state="success" />
        <Input placeholder="invalid" size="sm" state="error" />
        <Input placeholder="이것도 input입니다" disabled />
        <hr />
        <Icon size="100px" name="loading" />
        <Icon name="close" />
        <hr />
      </ThemeProvider>
    </>
  );
}

export default App;
