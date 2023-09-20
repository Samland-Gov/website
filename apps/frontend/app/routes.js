//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs = require('fs')

// Add your routes here
router.get("/:path(*)", function(req, res, next){
   // Allow the docs.html template to 'include' markdown files
   var marked = require('marked');
   var gfmHeadingId = require("marked-gfm-heading-id");


   var path = __dirname +"/../../../content/" + req.params.path + ".md";
   var include = fs.readFileSync(path, 'utf8');
   marked.marked.use(gfmHeadingId);
   var html = marked.marked(include, {
      "gfm": true
   });


   res.render('layouts/post', {"md": html});
});
