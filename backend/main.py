import time
import math
import string
import random
import json
import base64
import os
import datetime
import requests
import hmac
import base64
import hashlib
from flask import Flask, render_template, request, jsonify, redirect

base_url = 'https://sandboxapi.rapyd.net'
access_key = '448B0C4C7F0125C5F34A'
secret_key = 'be61c0d38d1b573416eb4c99a41089277b040d14acfc4772effe986e38774e8ffee8e102755b0c8e'


def generate_salt(length=12):
    return ''.join(random.sample(string.ascii_letters + string.digits, length))

def get_unix_time(days=0, hours=0, minutes=0, seconds=0):
    return int(time.time())

def update_timestamp_salt_sig(http_method, path, body):
    if path.startswith('http'):
        path = path[path.find(f'/v1'):]
    salt = generate_salt()
    timestamp = get_unix_time()
    to_sign = (http_method, path, salt, str(timestamp), access_key, secret_key, body)

    h = hmac.new(secret_key.encode('utf-8'), ''.join(to_sign).encode('utf-8'), hashlib.sha256)
    signature = base64.urlsafe_b64encode(str.encode(h.hexdigest()))
    return salt, timestamp, signature

def current_sig_headers(salt, timestamp, signature):
    sig_headers = {'access_key': access_key,
                   'salt': salt,
                   'timestamp': str(timestamp),
                   'signature': signature,
                   'idempotency': str(get_unix_time()) + salt}
    return sig_headers

def get_auth_headers():
    #Todo: add auth salting
    headers = {
      'Content-Type': 'application/json',
      'access_key': '448B0C4C7F0125C5F34A',
      'salt': '645384ed396279bd33c1ab45',
      'timestamp': '1625579290',
      'signature': 'YTM0MTZjNmQ5YWUyYzNiZmYxMjI5MGM3NmQ0MjExZjZiNjMzYzNiZmE1NDgwYjVmYTFjMWViOTEwMGZiNzM5Ng=='
    }

    return headers

def create_payment(amt=10,curr="USD",CID="cus_d5f9da3c072ed93cf8cb2248114c751b", card_num="4111111111111111", exp_month="12", exp_yr="23", name="John Doe", cvv="345"):
    url = "https://sandboxapi.rapyd.net/v1/payments"

    payload = json.dumps({
      "amount": amt,
      "currency": curr,
      "customer": CID,
      "payment_method": {
        "type": "in_amex_card",
        "fields": {
          "number": card_num,
          "expiration_month": exp_month,
          "expiration_year": exp_yr,
          "name": name,
          "cvv": cvv
        },
        "metadata": {
          "merchant_defined": True
        }
      },
      "capture": True
    })

    headers = get_auth_headers()

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

# Creates a random string with letters and numbers with default length of 8.
def randomStringDigits(stringLength=8):
    lettersAndDigits = string.ascii_letters + string.digits
    return ''.join(random.choice(lettersAndDigits) for i in range(stringLength))


app = Flask(__name__)
# Test the api using json outputs.
# The frontend will make requests to the API in order to use
@app.route('/api', methods=['POST'])
def info():
    return jsonify({'result': 'success'})

@app.route('/test', methods=['POST'])
def test():
     create_payment()
     return jsonify({'result': 'success'})

# Start Flask backend
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
