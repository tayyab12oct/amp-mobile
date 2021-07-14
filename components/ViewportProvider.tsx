import React from 'react';

export const ViewportContext = React.createContext({ width: 0, height: 0 });

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};
