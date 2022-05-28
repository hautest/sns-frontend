import { useMutation } from "react-query";
import { axiosInstance } from "src/utils";
import { useNavigate } from "react-router-dom";

interface SignUpApiBody {
  email: string;
  nickname: string;
  password: string;
}

function signUpApi(body: SignUpApiBody) {
  return axiosInstance.post("/users", {
    ...body,
  });
}

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation(["signup"], signUpApi, {
    onSuccess: () => {
      navigate("/login");
    },
  });
};
