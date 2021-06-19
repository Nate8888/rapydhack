import time
import math
import string
import random
import json
import base64
import os
import datetime
from flask import Flask, render_template, request, jsonify, redirect


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
