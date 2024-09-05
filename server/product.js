import Stripe from 'stripe'
import dotenv from 'dotenv'


dotenv.config()

STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY
STRIPE_PRICE_ID = price_1PNu2vKpg70t05MvKDwG6QII
STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
 


// const stripe = new Stripe(STRIPE_SECRET_KEY)

// const product = await stripe.products.create({
//    product: product.id, 
//    unit_amount: 1000,
//    currency: 'usd',
// })

// console.log(price) -- console price via node --env-file .env server/product.js