import { ThreeDots } from "react-loader-spinner";

export default function LoadingAnimation() {
  return (
    <>
      <ThreeDots
        height="14"
        width="52"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
      />
    </>
  );
}
