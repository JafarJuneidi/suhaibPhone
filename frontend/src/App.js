import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
    return (
        // Empty element (fragment)
        <BrowserRouter>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    {/* ? makes the id optional so we can access cart from icon */}
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route
                        path='/admin/user/:id/edit'
                        component={UserEditScreen}
                    />
                    <Route
                        path='/admin/productlist'
                        component={ProductListScreen}
                        exact
                    />
                    <Route
                        path='/admin/productlist/:pageNumber'
                        component={ProductListScreen}
                        exact
                    />
                    <Route
                        path='/admin/product/:id/edit'
                        component={ProductEditScreen}
                    />
                    <Route
                        path='/admin/orderlist'
                        component={OrderListScreen}
                    />
                    <Route
                        path='/search/:keyword'
                        component={HomeScreen}
                        exact
                    />
                    <Route
                        path='/search/:keyword/page/:pageNumber'
                        component={HomeScreen}
                    />
                    <Route path='/page/:pageNumber' component={HomeScreen} />
                    {/* exact fixes the need for switch */}
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
