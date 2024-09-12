#!/usr/bin/env python3
from flask import Flask, request, session, jsonify, render_template
from config import app, db, mail
from models import db, User, Account, Payment
import stripe
import os 
import smtplib
from flask_mail import Mail, Message
from email.mime.text import MIMEText

stripe.publishable_api_key = os.getenv('STRIPE_PUBLISHABLE_KEY')
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')



@app.post('/passcode')
def create_user():
    data = request.json
    try:
        new_user = User(username=data['username'])
        new_user.password = data['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id 
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get('/check_session')
def check_session():
    user_id = session.get('user_id')

    if user_id:
        user = User.query.where(User.id == user_id).first()
        return user.to_dict(), 200
    else:
        return {}, 204

@app.post('/login')
def login():
    data = request.json 
    user = User.query.where(User.username == data['username']).first()
    if user and user.authenticate(data['password']):
        session['user_id'] = user.id 
        return user.to_dict(), 201
    else:
        return { 'error': 'Invalid username or password' }, 401


@app.delete('/logout') 
def logout():
    session.pop('user_id')
    return {}, 204

@app.route('/')
def index():
    session = stripe.checkout.Session.create(
        payment_method_types = ['card'], 
        line_items=[{
            'price': 'price_1Pw3o7RqqjKBjICahy1LexHK', 
            'quantity': 1, 
        }], 
        mode='payment',
        success_url = '${URL}/success?session_id={CHECKOUT_SESSION_ID}', 
        cancel_url = '${URL}/cancel'
    ) 
    return render_template('Confirmation', 
        checkout_session_id = session['id'], checkout_public_key=stripe.publishable_api_key)


@app.post('/pay')
def create_payment():
    data = request.json
    email = data.get('email')
    amount = data.get('amount')


    try:
        intent = stripe.PaymentIntent.create(
            amount=amount, 
            currency='usd', 
            payment_method_types = ['card'],
            receipt_email=email,
        )

        payment = Payment(email=email, amount=amount, status="Pending")
        db.session.add(payment)
        db.session.commit()

        return jsonify({'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.post('/paymentsheet')
def create_payment_sheet():
    try:

        customer = stripe.Customer.create()

        ephemeralKey = stripe.EphemeralKey.create(
            customer=customer['id'], 
            stripe_version='2020-08-27'
        )

        paymentIntent = stripe.PaymentIntent.create(
            amount=5000, 
            currency='usd', 
            customer=customer['id'],
            automatic_payment_methods={
                'enabled': True,
            },
        )

        return jsonify({
            'paymentIntent': paymentIntent['client_secret'], 
            'ephemeralKey': ephemeralKey['secret'], 
            'customer': customer['id']
        })
    
    except Exception as e:
        return jsonify(error=str(e)), 500
    

# def send_receipt(email, amount):
#     subject = "Your Payment Receipt"
#     body = f"Thank you for your payment of ${amount / 100:.2f}. Your transaction was successful!"

#     msg = Message(
#         subject=subject,
#         sender=os.getenv('MAIL_USERNAME'),
#         recipients=[email],
#         body=body
#     )

#     try:
#         mail.send(msg)
#         print(f"Receipt sent to {email}")
#     except Exception as e:
#         print(f"Failed to send email: {str(e)}")
                       

@app.post('/confirmation')
def confirm_payment():
    data = request.json 
    payment_id = data.get('paymentId')
    email = data.get('email')
    amount = data.get('amount')

    try: 
        send_receipt(email, amount)
        return jsonify({'message': 'Payment confirmed and receipt sent.'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# @app.post('/webhook')
# def stripe_webhook():
#     payload = request.get_data(as_text=True)
#     sig_header = request.headers.get('Stripe-Signature')
#     endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
#     event = None 

#     try:
#         event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    
#     except ValueError as e:
#         return jsonify ({ 'error': 'Invalid payload'}), 400
#     except stripe.error.SignatureVerificationError as e:
#         return jsonify ({'error': 'Invalid signature'}), 400
    

#     if event['type'] == 'payment_intent.succeeded':
#         payment_intent = event['data']['object']

#         print("Payment intent was successful!")

#     return jsonify(success=True), 200




if __name__ == '__main__':
    app.run(port=5555, debug=True)
