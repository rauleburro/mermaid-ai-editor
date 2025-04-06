"use client";

import React from "react";

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoaderContext = React.createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoaderContext = () => React.useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-popover text-popover-foreground p-6 rounded-lg border shadow-lg flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
            <p className="text-sm font-medium">Generating diagram...</p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};
