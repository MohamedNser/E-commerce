import Stripe from 'stripe';

export async function payment({
    stripe = new Stripe(process.env.STRIPE_KEY),
    payment_method_types = ["card"],
    mode = 'payment',
    customer_email,
    metadata = {},
    cancel_url,
    success_url = process.env.SUCCESS_URL, // صحح الخطأ الإملائي هنا
    discounts = [],
    line_items = []
} = {}) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types,
        mode,
        customer_email,
        metadata,
        cancel_url,
        success_url,
        discounts,
        line_items
    });
    return session;
}