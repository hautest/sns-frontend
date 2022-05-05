import { Link } from "react-router-dom";
import { Button } from "../components/Button/index";

export function MainPageUnLogIn() {
  return (
    <Link to={"/sign-up"}>
      <Button size="lg">
        임시로 회원가입 하는 페이지로 넘어가는 버튼입니다
      </Button>
    </Link>
  );
}
