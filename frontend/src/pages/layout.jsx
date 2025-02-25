import { useNavigate } from "react-router-dom";

const GetStart = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/login")} className="p-2 bg-blue-500 text-white rounded">
      GetStart
    </button>
  );
};

export default GetStart;
