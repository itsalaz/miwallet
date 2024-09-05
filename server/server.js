import express from 'express'
import Stripe from 'stripe'


const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const HOST = process.env.HOST
const PORT = process.env.PORT
const URL = process.env.URL


// const stripe = Stripe(STRIPE_SECRET_KEY, {apiVersion:"2024-09-04"})
const stripe = Stripe(STRIPE_SECRET_KEY, {apiVersion:"2024-09-04"})
const app = express() 


// app.get('/', (req, res) => {
//   res.send(BUY_HTML)
// })

// app.post('/session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.session.create({
//       mode: 'payment', 
//       line_items: [{price: STRIPE_PRICE_ID, quantity: 1}], 
//       success_url: `${URL}/success?session_id={CHECKOUT_SESSION_ID}`, 
//       cancel_url: `${URL}/cancel`
//     })
//     console.log('Session created', session)
//     return res.redirect(303, session.url)
//   } catch(err) {
//     console.error('Error generating session', err)
//   }
// })


// middleware - post request to webhook 
// app.post('/my-webhook', express.raw({type: 'application/json'}), (req, res) => {
//   try {
//     const sig = req.headers['stripe-signature']
//     const event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
//     if (event.type === 'checkout.session.completed') {
//       console.log('Checkout session completed!', event)
//       // use data in event to store customer data in database, send receipt, email
//     }
//     return res.sendStatus(200)
//   } catch(err) {
//     console.error('Error handling webhook event.', err)
//     return res.sendStatus(400)
//   }
// })

app.get('/cancel', (req, res) => {
  res.send('<h1>Cancelled</h1>')
})


app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`)
})


// app.post('/create-save-payment', async (req, res) => {
//   try {
//     const savePayment = await.
//   }
// })