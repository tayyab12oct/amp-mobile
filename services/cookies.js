import cookie from 'react-cookies';
import { useContext } from 'react';
import { WebfoxContext } from './webfox';

export function ParseCookies(props) {
  // const {webstore} = useContext(WebfoxContext)
  props.getMovieName(cookie.load("SSRURL"))
  return <React.Fragment>movieName</React.Fragment>
  // return (JSON.stringify(<WebfoxContext.consumer>{webstore => webstore}</WebfoxContext.consumer>))
}

// ParseCookies.contextType = WebfoxContext;