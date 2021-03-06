const products = [
    {
        name: 'Samsung Galaxy Tab A 8.0',
        image: '/images/SAMSUNG_TABA_8.jpg',
        description: '32GB 2GB RAM. 8 inch. Tablet',
        brand: 'Samsung',
        category: 'Electronics',
        price: 620,
        countInStock: 4,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Samsung Galaxy Tab A 10.1',
        image: '/images/SAMSUNG_TABA_10.jpg',
        description: '32GB 3GB RAM. 10 inch. Tablet',
        brand: 'Samsung',
        category: 'Electronics',
        price: 910,
        countInStock: 3,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Xiaomi Redmi 9C',
        image: '/images/REDMI_MI_9C.jpg',
        description: '32GB 3GM RAM.',
        brand: 'Xiaomi',
        category: 'Electronics',
        price: 520,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Samsung Galaxy A31',
        image: '/images/SAMSUNG_A31.jpg',
        description: '64GB 4GB RAM',
        brand: 'Samsung',
        category: 'Electronics',
        price: 800,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Huawei Y7 Prime',
        image: '/images/HUAWEI_PRIME_Y7.jpg',
        description: '64GB 3GB RAM',
        brand: 'Huawei',
        category: 'Electronics',
        price: 600,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Realme C3',
        image: '/images/REALME_C3.jpg',
        description: '64GB 3GB RAM',
        brand: 'Realme',
        category: 'Electronics',
        price: 520,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Realme C11',
        image: '/images/REALME_C11.jpg',
        description: '32GB 2GB RAM',
        brand: 'Realme',
        category: 'Electronics',
        price: 450,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'Realme 6',
        image: '/images/REALME_6.jpg',
        description: '128GB 8GB RAM',
        brand: 'Realme',
        category: 'Electronics',
        price: 950,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 12 128GB',
        image: '/images/iphone12_128gb.jpg',
        description: '128GB 4GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 3650,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 12 pro 256GB',
        image: '/images/iphone12pro_256gb.jpg',
        description: '256GB 6GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 5650,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 12 pro 128GB',
        image: '/images/iphone12pro_128gb.jpg',
        description: '128GB 6GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 4850,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 11 128GB',
        image: '/images/iphone11_128gb.jpg',
        description: '128GB 4GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2850,
        countInStock: 9,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone X 256GB',
        image: '/images/iphoneX_256gb.jpg',
        description: '256GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2400,
        countInStock: 3,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone X 64GB',
        image: '/images/iphoneX_64gb.jpg',
        description: '64GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2100,
        countInStock: 4,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 8 Plus 64GB',
        image: '/images/iphone8plus_64gb.jpg',
        description: '64GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 1950,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 12 pro max 256GB',
        image: '/images/iphone12promax_256gb.jpg',
        description: '256GB 6GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 6200,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 12 pro max 128GB',
        image: '/images/iphone12promax_128gb.jpg',
        description: '128GB 6GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 5350,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'ipad 8 32GB',
        image: '/images/ipad8_32gb.jpg',
        description: '32GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 1600,
        countInStock: 4,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'apple watch Series 6 44mm',
        image: '/images/applewatchSeries6_44mm.jpg',
        description: '32GB 1GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2000,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 11 pro 256GB',
        image: '/images/iphone11pro_256gb.jpg',
        description: '256GB 4GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 4050,
        countInStock: 8,
        rating: 0,
        numReviews: 0,
    },

    {
        name: 'iphone 8 Plus 128GB',
        image: '/images/iphone8plus_128gb.jpg',
        description: '128GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2050,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 8 Plus 256GB',
        image: '/images/iphone8plus_256gb.jpg',
        description: '256GB 3GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2250,
        countInStock: 7,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone 8 64GB',
        image: '/images/iphone8_64gb.jpg',
        description: '64GB 2GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 1300,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone XS Max 64gb',
        image: '/images/iphoneXsmax_64gb.jpg',
        description: '64GB 4GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 2950,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: 'iphone XS Max 256gb',
        image: '/images/iphoneXsmax_256gb.jpg',
        description: '256GB 4GB RAM',
        brand: 'Apple',
        category: 'Electronics',
        price: 3350,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
    },
];

export default products;
