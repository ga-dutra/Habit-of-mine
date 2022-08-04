import styled from "styled-components";
import smallLogo from "../assets/img/small-logo-trackit.svg";
import profilepic from "../assets/img/batman.png";

export default function Header() {
  return (
    <>
      <Wrapper>
        <img src={smallLogo} alt="" />
        <Profile>
          <img src={profilepic} alt="" />
        </Profile>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
`;

const Profile = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
