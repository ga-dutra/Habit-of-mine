import styled from "styled-components";

export default function AddHabbitButton() {
  return (
    <Button>
      <span>+</span>
    </Button>
  );
}

const Button = styled.div`
  width: 40px;
  height: 40px;
  background-color: #52b6ff;
  border-radius: 5px;
  color: #ffffff;
  font-size: 28px;
  display: flex;
  cursor: pointer;

  span {
    margin: 4px 0 0 10px;
  }
`;
