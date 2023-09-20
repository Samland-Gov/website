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
const GithubSlugger = require('github-slugger');
let slugger = new GithubSlugger();


const renderer = new marked.Renderer();

renderer.heading = function(text, level, raw) {
   raw = raw.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '');
   return `<h${level} id="${slugger.slug(raw)}" class='testing'>${text}</h${level}>`;
}

router.get("/:path(*)", function(req, res, next){
   var path = __dirname +"/../../../content/" + req.params.path + ".md";

   if (!fs.existsSync(path)) {
      next();
      return;
   }

   var include = fs.readFileSync(path, 'utf8');
   marked.use(gfmHeadingId);
   var html = metaMarked(include, {
      "gfm": true,
      "renderer": renderer
   });

   res.render('layouts/post', {"md": html, "links": html["meta"]["links"]});
});
