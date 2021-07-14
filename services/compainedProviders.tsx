import LocalizationProvider from './Localize';
import { WebfoxProvider } from './webfox';
const Compainedprovider = (children) => {
  return <WebfoxProvider>
    <LocalizationProvider>[{children}]</LocalizationProvider>
  </WebfoxProvider>;
};
export default Compainedprovider;
