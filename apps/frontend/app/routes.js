//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs = require('fs')

var marked = require('marked');
var metaMarked = require('meta-marked');
var gfmHeadingId = require("marked-gfm-heading-id");


router.get("/:path(*)", function(req, res, next){
   var path = __dirname +"/../../../content/" + req.params.path + ".md";

   if (!fs.existsSync(path)) {
      next();
      return;
   }

   var include = fs.readFileSync(path, 'utf8');
   marked.use(gfmHeadingId);
   var html = metaMarked(include, {
      "gfm": true
   });


   res.render('layouts/post', {"md": html});
});
