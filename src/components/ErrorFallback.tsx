import { FallbackProps } from "react-error-boundary";
import { Button } from "react-bootstrap";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <h3>Something went wrong!!</h3>
      <p className="text-danger">{error.message}</p>
      <Button
        variant="outline-danger"
        onClick={resetErrorBoundary}
        className="mt-4"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorFallback;
