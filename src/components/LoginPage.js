import styled from "styled-components";
import logo from "../assets/img/logo-trackit.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({});

  function handleForm({ value, name }) {
    console.log({ value, name });
    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendForm() {
    console.log("entrei");
  }

  return (
    <Wrapper>
      <img src={logo} alt="Trackit Logo" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <input
          placeholder="email"
          name="email"
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
        ></input>
        <input
          placeholder="senha"
          name="senha"
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
        ></input>
        <button>Entrar</button>
        <Link to="/cadastro">
          <span>Não tem uma conta? Cadastre-se!</span>
        </Link>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
    width: 310px;
    text-align: center;
  }

  input {
    height: 46px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: #dbdbdb;
    font-weight: 200;
    font-size: 20px;
    padding-left: 12px;
    margin-bottom: 6px;
    font-family: "Lexend Deca", sans-serif;
  }

  button {
    height: 46px;
    background-color: #52b6ff;
    border-radius: 5px;
    font-size: 20px;
    color: #ffffff;
    border: 0px;
    margin-bottom: 25px;
  }

  span {
    font-size: 14px;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;
