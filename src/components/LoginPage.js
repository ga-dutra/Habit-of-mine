import styled from "styled-components";
import biglogo from "../assets/img/big-logo-trackit.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postLogin } from "../services/trackit";
import LoadingAnimation from "./LoadingAnimation";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loadingAnimation = LoadingAnimation();
  const navigate = useNavigate();
  const global = useContext(UserContext);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendForm() {
    setIsLoading(true);
    const body = { ...form };
    const promise = postLogin(body);
    promise.then((res) => {
      global.setUserdata(res.data);
      console.log("deu certo o login");
      navigate("/hoje");
    });
    promise.catch((err) => {
      alert(
        "Não foi possível efetuar o login! Por favor, cheque seus dados e tente novamente."
      );
      setIsLoading(false);
    });
  }

  return (
    <>
      <FormWrapper enabled={isLoading}>
        <img src={biglogo} alt="Trackit Logo" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <input
            disabled={isLoading}
            placeholder="email"
            name="email"
            type="email"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            disabled={isLoading}
            placeholder="senha"
            name="password"
            type="password"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <button disabled={isLoading}>
            {isLoading ? loadingAnimation : "Entrar"}
          </button>
          <Link to="/cadastro">
            <span>Não tem uma conta? Cadastre-se!</span>
          </Link>
        </form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  font-family: "Lexend Deca", sans-serif;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  form {
    display: flex;
    flex-direction: column;
    width: calc(100% - 100px);
    text-align: center;
  }

  input {
    height: 46px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: #666666;
    font-weight: 400;
    font-size: 20px;
    padding-left: 12px;
    margin-bottom: 6px;
    font-family: "Lexend Deca", sans-serif;
    word-wrap: break-word;
  }
  input::placeholder {
    font-weight: 500;
    color: #dbdbdb;
  }

  input:focus {
    outline: none;
  }

  button {
    height: 46px;
    background-color: #52b6ff;
    border-radius: 5px;
    font-size: 22px;
    color: #ffffff;
    font-weight: 600;
    border: 0px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.enabled ? "inherit" : "pointer")};
    opacity: ${(props) => (props.enabled ? "0.7" : "1.0")};
  }

  span {
    font-size: 14px;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;
export { FormWrapper };
