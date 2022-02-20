import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import './App.css';
import Main from '../pages/Main';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import Footer from '../components/footer';
import Best from '../pages/Best';
import Discount from '../pages/Discount';
import Special from '../pages/Special'

function App() {
	return (
		<>
			<Header></Header>
			<ConnectedRouter history={history}>
				<Route path="/" exact component={Main} />
				<Route path="/cart" exact component={Cart} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/Best" exact component={Best} />
				<Route path="/Discount" exact component={Discount} />
				<Route path="/Special" exact component={Special} />
			</ConnectedRouter>
			<Footer />
		</>
	);
}

export default App;