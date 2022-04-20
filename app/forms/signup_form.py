from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    # Checking if email is valid
    email = field.data
    if "@" not in email:
        raise ValidationError("Please enter a valid email")


class SignUpForm(FlaskForm):
    fullname = StringField('fullname', validators=[DataRequired(), Length(max=50, message="Name must be less than 50 characters")])
    username = StringField('username', validators=[DataRequired(), username_exists, Length(max=40, message="Username must be less than 40 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email, Length(max=255, message="Email must be less than 255 characters")])
    password = StringField('password', validators=[DataRequired(), Length(min=6, message="Password must be at least 6 characters"), Length(max=255, message="Password must be less than 255 characters")])
