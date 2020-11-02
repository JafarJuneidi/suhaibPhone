import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(`/api/products/${match.params.id}`)
            .then(({ data }) => {
                setProduct(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [match]);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(
    //             `/api/products/${match.params.id}`
    //         );
    //         setProduct(data);
    //     };
    //     fetchProduct();
    // }, []);

    return (
        <>
            {/* can use button with LinkContainer as well */}
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                {/* medium screens and up take size 6 */}
                <Col md={6}>
                    {/* fluid keeps Image inside it's container (Col) */}
                    <Image src={product.image} alt={product.name} fluid />
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
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? 'In Stock'
                                            : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
