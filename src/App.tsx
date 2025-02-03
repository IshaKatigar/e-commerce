import { ErrorBoundary } from "react-error-boundary";

import Routes from "routes";
import ErrorFallback from "components/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Routes />
    </ErrorBoundary>
  );
}

export default App;
