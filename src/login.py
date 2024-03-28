from flask import Flask, render_template, request
from supabase import create_client
import json
app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template('system.jsx')

@app.route("/loginform")
def about():
    return render_template('login.html')

@app.route("/login", methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    #curl "http://127.0.0.1:5000/login?email=qmstudent@qmul.ac.uk&password=studentpassword"

    supabase_url = 'https://dswpmnhkvgpxqapgddfe.supabase.co'
    supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA'
    supabase = create_client(supabase_url, supabase_key)

    userData = supabase.table("users").select("type",count="exact").eq('email', email).eq('password', password).execute()
    data = userData.data

    if data and 'type' in data[0] and data[0]['type'] in ['STUDENT', 'MODULE_STAFF', 'IT_ADMIN']:
        data[0]['loggedIn'] = True
    else:
        data = {}
        data['loggedIn'] = False

    return data





if __name__ == '__main__':
    app.run(debug=True)