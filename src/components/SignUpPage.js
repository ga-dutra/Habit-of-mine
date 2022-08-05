import biglogo from "../assets/img/big-logo-trackit.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormWrapper } from "./LoginPage";
import LoadingAnimation from "./LoadingAnimation";
import { postSignUp } from "../services/trackit";

export default function SignUpPage() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const loadingAnimation = LoadingAnimation();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendForm() {
    const body = { ...form };
    setIsLoading(true);
    const promise = postSignUp(body);
    promise.then((res) => {
      console.log("deu certo o cadastro");
      navigate("/");
    });
    promise.catch((err) => {
      alert(
        "Não foi possível concluir o cadastro! Por favor, cheque seus dados e tente novamente."
      );
      setIsLoading(false);
    });
  }

  return (
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
        <input
          disabled={isLoading}
          placeholder="nome"
          name="name"
          type="text"
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
          required
        ></input>
        <input
          disabled={isLoading}
          placeholder="foto"
          name="image"
          type="url"
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
          required
        ></input>
        <button disabled={isLoading}>
          {isLoading ? loadingAnimation : "Cadastrar"}
        </button>
        <Link to="/">
          <span>Já tem uma conta? Faça login!</span>
        </Link>
      </form>
    </FormWrapper>
  );
}
