import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { useTranslation } from 'react-i18next';

const PlaceOrderScreen = ({ history }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!cart.shippingAddress.address) {
        history.push('/shipping');
    } else if (!cart.paymentMethod) {
        history.push('/payment');
    }

    // Calculate prices
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }

        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: ORDER_CREATE_RESET });
        }
        // eslint-disable-next-line
    }, [history, success, userLogin]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{t('Shipping')}</h2>
                            <p>
                                <strong>{t('Address')}: </strong>
                                <span style={{ direction: 'ltr' }}>
                                    {cart.shippingAddress.address},{' '}
                                    {cart.shippingAddress.city},{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                </span>
                            </p>
                            <p>
                                <strong>{t('Phone Number')}: </strong>
                                <span style={{ direction: 'ltr' }}>
                                    {cart.shippingAddress.phoneNumber}
                                </span>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{t('Payment Method')}</h2>
                            <strong>{t('Mathod')}: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{t('Order Items')}</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>{t('Your cart is empty')}</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col
                                                    md={4}
                                                    style={{ direction: 'ltr' }}
                                                >
                                                    {item.qty} x &#8362;
                                                    {item.price} = &#8362;
                                                    {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{t('Order Summary')}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Items')}</Col>
                                    <Col>&#8362;{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Shipping')}</Col>
                                    <Col>&#8362;{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Tax')}</Col>
                                    <Col>&#8362;{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Total')}</Col>
                                    <Col>&#8362;{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error && (
                                <ListGroup.Item>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    {t('Place Order')}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
