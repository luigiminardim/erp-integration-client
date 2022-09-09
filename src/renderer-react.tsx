import * as ReactDOM from "react-dom/client";
import { App } from "./view-layer/App";

function render() {
  const root = ReactDOM.createRoot(document.body);
  root.render(<App />);
}

render();
