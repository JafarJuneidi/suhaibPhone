import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
} from '../actions/orderActions';
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { useTranslation } from 'react-i18next';

const OrderScreen = ({ history, match }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const orderId = match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [
        dispatch,
        order,
        orderId,
        successPay,
        history,
        userInfo,
        successDeliver,
    ]);

    const payHandler = () => {
        dispatch(payOrder(orderId));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <Link to='/admin/orderlist' className='btn btn-light y-3'>
                {t('Go Back')}
            </Link>
            <h1 style={{ direction: 'rtl' }}>
                {t('Order')} : {order._id}
            </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{t('Shipping')}</h2>
                            <p>
                                <strong>{t('Name')}: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>{t('Email')}: </strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>{t('Address')}: </strong>
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            <p>
                                <strong>{t('Phone Number')}: </strong>
                                <span style={{ direction: 'ltr' }}>
                                    {order.shippingAddress.phoneNumber}
                                </span>
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>
                                    {t('Delivered on')} : {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    {t('Not Delivered')}
                                </Message>
                            )}

                            {order.isPaid ? (
                                <Message variant='success'>
                                    {t('Paid on')} : {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    {t('Not Paid')}
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>{t('Order Items')}</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>{t('Order is empty')}</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>&#8362;{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Shipping')}</Col>
                                    <Col>&#8362;{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>{t('Total')}</Col>
                                    <Col>&#8362;{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {loadingPay && <Loader />}
                            {userInfo && userInfo.isAdmin && !order.isPaid && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={payHandler}
                                    >
                                        Mark As Paid
                                    </Button>
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
