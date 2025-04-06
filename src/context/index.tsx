import { CodeProvider } from "./CodeContext";
import { LoaderProvider } from "./LoaderContext";

const MultipleContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LoaderProvider>
      <CodeProvider>{children}</CodeProvider>
    </LoaderProvider>
  );
};

export default MultipleContextProvider;
