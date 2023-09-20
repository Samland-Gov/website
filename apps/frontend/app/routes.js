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

let slugger = null;
import("github-slugger").then(({ default: GithubSlugger, extra }) => {
   slugger = new GithubSlugger();
});



const renderer = new marked.Renderer();

renderer.heading = function(text, level, raw) {
   var cssClass = "";
   if (level == "1") {
      cssClass = "class='govuk-heading-l'";
   } else if (level == "2") {
      cssClass = "class='govuk-heading-m'";
   } else if (level == "3") {
      cssClass = "class='govuk-heading-s'";
   }

   raw = raw.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '');
   return `<h${level} id="${slugger.slug(raw)}"${cssClass}>${text}</h${level}>`;
}

renderer.paragraph = function(text) {
   return `<p class='govuk-body'>${text}</p>\n`;
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

   var meta = html["meta"] || {
      "title": "Unknown page",
   };

   res.render('layouts/post', {"html": html["html"], "meta": meta});
});
