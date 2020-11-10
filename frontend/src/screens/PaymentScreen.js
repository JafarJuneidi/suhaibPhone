import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    if (!userLogin.userInfo) {
        history.push('/');
    }

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethodForm, setPaymentMethodFrom] = useState(paymentMethod);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodForm));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethodForm'
                            value='PayPal'
                            checked={paymentMethodForm === 'PayPal'}
                            onChange={(e) =>
                                setPaymentMethodFrom(e.target.value)
                            }
                        ></Form.Check>

                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethodForm'
                            value='Stripe'
                            checked={paymentMethodForm === 'Stripe'}
                            onChange={(e) =>
                                setPaymentMethodFrom(e.target.value)
                            }
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
