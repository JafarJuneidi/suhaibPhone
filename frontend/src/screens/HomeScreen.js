import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const Homescreen = () => {
    const [products, setProducts] = useState([]);

    // runs after component loads
    // useEffect(() => {
    //     axios
    //         .get('/api/products')
    //         .then(({ data }) => {
    //             setProducts(data);
    //         })

    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    // this is noticably faster for some reason or is it just the network?
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Homescreen;
