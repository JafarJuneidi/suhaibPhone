import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import {
    listProductDetails,
    createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { useTranslation } from 'react-i18next';

const ProductScreen = ({ match, history }) => {
    const { t } = useTranslation();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
        }

        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id));
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(listProductDetails(match.params.id));
        // eslint-disable-next-line
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };

    return (
        <>
            {/* can use button with LinkContainer as well */}
            <Link className='btn btn-light my-3' to='/'>
                {t('Go Back')}
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        {/* medium screens and up take size 6 */}
                        <Col md={6}>
                            {/* fluid keeps Image inside it's container (Col) */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            {/* variant flush takes away the border */}
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} ${t(
                                            'reviews'
                                        )}`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {t('Price')}: &#8362;{product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {t('Description')}: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Price')}:</Col>
                                            <Col>
                                                <strong>
                                                    &#8362;{product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{t('Status')}:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? t('In Stock')
                                                    : t('Out Of Stock')}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>{t('Qty')}:</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            {t('Add To Cart')}
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>{t('Reviews')}</h2>
                            {product.reviews.length === 0 && (
                                <Message>{t('No Reviews')}</Message>
                            )}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>{t('Write a Review')}</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            {t('Review submitted successfully')}
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>
                                                    {t('Rating')}
                                                </Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        {t('Select')}
                                                    </option>
                                                    <option value='1'>
                                                        1 - {t('Poor')}
                                                    </option>
                                                    <option value='2'>
                                                        2 - {t('Fair')}
                                                    </option>
                                                    <option value='3'>
                                                        3 - {t('Good')}
                                                    </option>
                                                    <option value='4'>
                                                        4 - {t('Very Good')}
                                                    </option>
                                                    <option value='5'>
                                                        5 - {t('Excellent')}
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>
                                                    {t('Comment')}
                                                </Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                {t('Submit')}
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            <Link
                                                to={`/login?redirect=/product/${product._id}`}
                                            >
                                                {t('sign in')}
                                            </Link>{' '}
                                            {t('to write a review')}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
