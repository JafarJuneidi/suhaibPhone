import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

const CheckoutSteps = ({ step1, step2, step3 }) => {
    const { t } = useTranslation();

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>{t('Sign in')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('Sign in')}</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>{t('Shipping')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('Shipping')}</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>{t('Place Order')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('Place Order')}</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
