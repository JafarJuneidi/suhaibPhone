import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import { useTranslation } from 'react-i18next';

const ShippingScreen = ({ history }) => {
    const { t } = useTranslation();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    if (!userLogin.userInfo) {
        history.push('/');
    }

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState('90100');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
    const [id, setId] = useState(shippingAddress.id);
    // const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ address, city, postalCode, phoneNumber, id })
        );
        history.push('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>{t('Shipping')}</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>{t('Address')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('Enter address')}
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>{t('Phone Number')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('Enter phone number')}
                        value={phoneNumber}
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='id'>
                    <Form.Label>{t('ID')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('Enter id number')}
                        value={id}
                        required
                        onChange={(e) => setId(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>{t('City')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('Enter city')}
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>{t('Postal Code')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('Enter postal code')}
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group> */}

                <Button type='submit' variant='primary'>
                    {t('Continue')}
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
