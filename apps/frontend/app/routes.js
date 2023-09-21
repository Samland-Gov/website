//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs = require('fs')

const marked = require('marked');
const metaMarked = require('meta-marked');
const gfmHeadingId = require("marked-gfm-heading-id");
const renderer = require("./renderer").renderer;

router.get("/:path(*)", function(req, res, next){
   var path = __dirname +"/../../../content" + req.params.path + "/index.md";

   if (!fs.existsSync(path)) {
      path = __dirname +"/../../../content" + req.params.path + ".md";
      if (!fs.existsSync(path)) {
         return next();
      }
   }

   var include = fs.readFileSync(path, 'utf8');
   marked.use(gfmHeadingId);
   var html = metaMarked(include, {
      "gfm": true,
      "renderer": renderer
   });

   var meta = html["meta"] || {
      "title": "Unknown page",
   };

   res.render('layouts/post', {"html": html["html"], "meta": meta});
});
