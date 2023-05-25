import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import usersReducer from './features/users/usersSlice';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import UserList from './components/users/UserList';
import UserChart from './components/users/UserChart';
import './App.css';

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route exact path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route exact path="/users" element={<UserList />} />
            <Route path="/users/chart" element={<UserChart />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
