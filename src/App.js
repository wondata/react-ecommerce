import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./Components/Header";
import PageContent from "./Components/PageContent";
import AppFooter from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
