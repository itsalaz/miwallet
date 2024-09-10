from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt 
from datetime import datetime
from sqlalchemy import Column, Integer, Date, String
import re



class User(db.Model, SerializerMixin):
  __tablename__ = 'users_table'

  id = db.Column(db.Integer, primary_key=True)
  password_hash = db.Column(db.String, nullable=False)
  # phone_number = db.Column(db.String, nullable=False)

  accounts = db.relationship('Account', back_populates='user')

  serialize_rules = ('-accounts',)

  def __repr__(self):
    return f'User {self.username}, ID {self.id}'

  @validates('username')
  def validate_username(self, key, value):
      if not value:
          return ValueError('Username must have a value')
      return value
  
  # at least 8 characters, one uppercase, one lowercase, one digit, one special character
  # dont forget to add password error to front end - include 
        # - At least 8 characters
        # - At least one uppercase letter
        # - At least one lowercase letter
        # - At least one digit
        # - At least one special character
        
  # @validates('password')
  # def validate_password(self, key, value):
  #   pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&][A-Za-z\d@$!%8?&]{8,})$'
    
  #   if not re.match(pattern, value):
  #      raise ValueError('Password must be a valid password')

  # regex validation 
  @validates('email')
  def validate_email(self, key, value):
    pattern = r'^[a-zA-Z0-9_.+-] +@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$'

    if not re.match(pattern, value):
        raise ValueError('Must be a valid email')

    return value 
  
  @validates('phone_number')
  def validate_phone_number(self, key, value):
     pattern = r'^\d{3}-\d{3}-\d{4}4'

     digits_only = re.sub(r'\D','', value)

     if re.match(pattern, value):
        return value 
     
     if len(digits_only) == 10:
        formatted_number = f'{digits_only[:3]}-{digits_only[3:6]}-{digits_only[6:]}'
        return formatted_number
     else:
        raise ValueError('Phone number must be a valid phone number')

  @hybrid_property
  def password_hash(self):
      raise AttributeError('Password hashes may not be viewed')
    
  @password_hash.setter
  def password_hash(self, password):
      password_hash = bcrypt.generate_password_hash(
          password.encode('utf-8'))
      self._password_hash = password_hash


  def authenticate(self, password):
    return bcrypt.check_password_hash(
        self._password_hash, password.encode('utf-8'))
    

class Account(db.Model, SerializerMixin):
  
  __tablename__ = 'accounts_table'

  id = db.Column(db.Integer, primary_key=True)
  balance = db.Column(db.Float, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))  # Corrected ForeignKey usage

  payments = db.relationship('Payment', back_populates='account')
  user = db.relationship('User', back_populates='accounts')

  serialize_rules = ('-user.accounts', '-payments',)

class Payment(db.Model, SerializerMixin):
   __tablename__ = 'payments_table'

   id = db.Column(db.Integer, primary_key=True)
   amount = db.Column(db.Float)
   email = db.Column(db.String, nullable=False)
   status = db.Column(db.String, nullable=False, default="Pending")
   account_id = db.Column(db.Integer, db.ForeignKey('accounts_table.id'))
   timestamp = db.Column(db.DateTime)

   account = db.relationship('Account', back_populates='payments')
   
   serialize_rules = ('-account.payments',)