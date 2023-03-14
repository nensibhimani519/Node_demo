import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSocketRequest } from "./redux/socket/actions";
import RootRoutes from "./routes/RootRoutes";

const App = () => {
  return (
    <div className="dark">
      <RootRoutes />
    </div>
  );
};

export default App;
