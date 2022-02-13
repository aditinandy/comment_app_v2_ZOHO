# comment_app_v2_ZOHO

run npm install - to install all packages
npm start - to start the server

signup(POST) - localhost:8000/user/signup
             - email, password, secret

login(POST) - localhost:8000/user/login
            - email, password

forgetpassword(POST) - localhost:8000/user/Post_forget
                     - secret

show_all_comments(GET) - localhost:8000/user/get_comment/:userId

show_self_comments(GET) - localhost:8000/user/get_find_comment/:userId

post_comments(POST) - localhost:8000/user/post_comment/:userId
                    - msg