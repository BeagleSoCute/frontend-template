import { useContext } from "react";
import styled from "styled-components";
import RegisterForm from "components/register/RegisterForm";
import { register } from "services/register.service";
import { AppContext } from "contexts/app.context";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";

const Register = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const { email, name, password } = values;
    const {success, errorMessage} = await register({ email, name, password });
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Register Success" });
      navigate("/login");
    }else{
      notification({ type: "error", message: errorMessage });
    }
  };
  return (
    <StyledDiv className="register">
        <RegisterForm onFinish={handleOnFinish} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.login {
    height: 100vh;
    .form-warpper {
      margin-top: 150px !important;
      display: block;
      padding: 20px;
      margin: auto;
      h1 {
        text-align: center;
      }
      .button-submit-layout {
        display: flex;
        justify-content: center;
      }
      button.button-submit {
        width: 250px;
      }
    }
    .content {
      height: 100%;
    }
  }
`;

export default Register;
