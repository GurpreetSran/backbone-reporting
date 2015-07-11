#Backbone Reporting App

Basic Backbone Reporting Demo app using pushstate. Demo is fully functioning with following functionality:
- Backbone routing with pushstate
- Add Report
- Edit Report
- Delete Report
- Update Report 
- Added unit test support (Jasmine & Sinon using karma)
- Underscore templates

This app is using `json-server` for back end implementation.  

##How to run 

1. Make sure you have node installed  
2. do `nmp install`. This should install all nmp and bower dependencies. 
3. do `nmp start`. Opens up browser with app running.
4. do `nmp test`. Using karma, jasmine and chrome to run unit tests. Check out `karma.conf.js` for more details.

##Dependencies
- Jquery
- Underscore
- Bootstrap 

Note: App will only work properly from root because backend(json-server) doesn't support redirection. Also backbone apps should be structured using requirejs for better scaling and maintenance.  
