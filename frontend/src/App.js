import GlobalProvider from "./providers/GlobalProvider";
import Router from "./routes/Router";

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
