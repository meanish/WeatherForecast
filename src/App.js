import "./App.css";
import bg from "./img/pattern15.png";
import Updated from "./Updated";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <>
      <div
        className="App"
        style={{ backgroundImage: `url(${bg})`, backgroundRepeat: "repeat" }}
      >
        <Updated />
      </div>
    </>
  );
}

export default App;
