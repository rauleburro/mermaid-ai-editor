"use client";

import React from 'react';

interface CodeContextType {
  code: string;
  setCode: (code: string) => void;
}

export const CodeContext = React.createContext<CodeContextType>({
  code: '',
  setCode: () => {},
});

export const CodeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [code, setCode] = React.useState('');

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};
