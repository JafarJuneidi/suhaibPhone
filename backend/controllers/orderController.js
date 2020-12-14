import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import nodeoutlook from 'nodejs-nodemailer-outlook';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        // 400 Bad request
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        nodeoutlook.sendEmail({
            auth: {
                user: process.env.HOTMAIL,
                pass: process.env.HOTMAIL_PASS,
            },
            from: process.env.HOTMAIL,
            to: process.env.GMAIL,
            subject: 'Suhaib phone',
            html: `<h4>${createdOrder.user}</h4>
            <h3>Shipping:</h3>
            <ul>
                <li>city: ${createdOrder.shippingAddress.city}</li>
                <li>address: ${createdOrder.shippingAddress.address}</li>
                <li>phone number: ${createdOrder.shippingAddress.phoneNumber}</li>
            </ul>

            <h2>items price: ${createdOrder.itemsPrice}</h2>
            <h2>shipping price: ${createdOrder.shippingPrice}</h2>
            <h2>total price: ${createdOrder.totalPrice}</h2>`,
        });

        // 201 something created
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    // populate get user name and email that is associated with this order
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
};
