import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./pages/UnauthenticatedApp.jsx";
import { useAuth } from "./contexts/Authorization";
import theme from "./components/theme.js";

function App() {
  const auth = useAuth();

  return (
    <ChakraProvider theme={theme}>
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ChakraProvider>
  );
}

export default App;
