#Backbone Reporting App

Basic Backbone Reporting Demo app using pushstate. It is fully functioning app with following functionality:
- Backbone routing with pushstate.
- Add Report
- Edit Report
- Delete Report
- Added unit test support (Jasmine & Sinon)
- Underscore templates

This app is using `json-server` for back end implementation.  

##How to run 

1. Make sure you have node installed.  
2. do `nmp install`
3. do `nmp start`. It should open up browser with app running.
4. do `nmp test`. It is using karma, jasmine and chrome to run unit tests. Check out `karma.conf.js` for more details.

##Dependencies
- Jquery
- Underscore
- Bootstrap 

Note: App will only work properly from root because backend(json-server) doesn't support redirection.