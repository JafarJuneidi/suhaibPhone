import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Same as Link but allows for bootstrap integration as well
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    const changeLanguage = () => {
        const lng = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        var elements = document.querySelectorAll('*');
        if (i18n.language === 'ar') {
            elements.forEach((element) => {
                element.classList.add('arabic');
            });
        } else {
            elements.forEach((element) => {
                element.classList.remove('arabic');
            });
        }
    });

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Suhaib Phone</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Route
                            render={(props) => (
                                <SearchBox history={props.history} />
                            )}
                        />
                        <Button
                            className='ml-auto mr-auto'
                            style={{ backgroundColor: 'transparent' }}
                            onClick={changeLanguage}
                        >
                            {i18n.language === 'en' ? 'العربية' : 'English'}
                        </Button>
                        <Nav>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i>
                                    {t('Cart')}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            {t('Profile')}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        {t('Logout')}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i>
                                        {t('Sign In')}
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
