import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type Props = {
  onLogin: (user: any) => void;
};

function GoogleLoginButton({ onLogin }: Props) {

  return (

    <GoogleLogin
      onSuccess={(credentialResponse) => {

        if (credentialResponse.credential) {

          const user: any = jwtDecode(
            credentialResponse.credential
          );

          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );

          onLogin(user);

        }

      }}

      onError={() => {
        console.log("Login Failed");
      }}

    />

  );

}

export default GoogleLoginButton;