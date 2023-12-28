//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import Product from './components/Product';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
//import all files like css,nav,footer,signup , route
function App() {
  return (
    <div className="App">
      <BrowserRouter>           
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<Product />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>Logout components</h1>} />
            <Route path='/profile' element={<h1>Profile components</h1>} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer />

    </div>

  );
}
export default App;
