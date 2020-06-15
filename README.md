# Newsletter-Signup

These are the source codes for a Sign-Up page for my Newsletter.

It consists of a server running on Node.js with Express and HTML files to render the appropriate pages.

The signup page asks the user to input his first name, last name and email address. The data is then sent to my MailChimp list via the MailChimp API, resulting in a list of subscribers accessible on my MailChimp account. If the user sucessfully subscribes to my newsletter, he/she is redirected to an HTML page containing a Bootstrap jumbotron indicating that his subscription was successful.

If for any reasons, the subscription to my newsletter fails, he/she is redirected to a "failure" page asking to contact me or to try again. This page contains a "Try Again" button, which once clicked redirects to the home route ("/"), rendering once again the orginal form with the three input fields.

This Node.js app is deployed on the Internet thanks to Heroku via Git commands through a Hyper Terminal and can be accessed by clicking on the following link : https://thawing-citadel-75545.herokuapp.com/

PS: The node_modules file is not uploaded as it is too voluminous, but the Node modules used were Express,https and body-parser.
