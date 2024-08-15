import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Spinners = ({ loading }) => {
  return (
    <PulseLoader
      color='blue'
      loading={loading}
      cssOverride={override}
      size={40}
    />
  );
};
export default Spinners;
