import time
import math
import string
import random
import json
import base64
import os
import datetime
import requests
from flask import Flask, render_template, request, jsonify, redirect

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

# Test the api using json outputs.
# The frontend will make requests to the API in order to use
@app.route('/api', methods=['POST'])
def info():
  return jsonify({'result': 'success'})

# Start Flask backend
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
