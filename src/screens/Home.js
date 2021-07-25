import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1> Welcome!!! </h1>
      <button onClick={() => logUserOut(history)}> Logout </button>
    </div>
  );
}

export default Home;
