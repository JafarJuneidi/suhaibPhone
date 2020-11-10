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
import PaymentScreen from './screens/PaymentScreen';

const App = () => {
    return (
        // Empty element (fragment)
        <BrowserRouter>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    {/* ? makes the id optional so we can access cart from icon */}
                    <Route path='/cart/:id?' component={CartScreen} />
                    {/* exact fixes the need for switch */}
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
