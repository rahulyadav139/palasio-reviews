import { BrowserRouter as Router } from 'react-router-dom';

const Providers = props => {
  return <Router>{props.children}</Router>;
};
export { Providers };
