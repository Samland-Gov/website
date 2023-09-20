const marked = require('marked');

let slugger = null;
import("github-slugger").then(({ default: GithubSlugger, extra }) => {
   slugger = new GithubSlugger();
});

function cleanUrl(href) {
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    }
    catch (e) {
        return null;
    }
    return href;
 }

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

renderer.link = function(href, title, text) {
   const cleanHref = cleanUrl(href);
   if (cleanHref === null) {
      return text;
   }
   href = cleanHref;
   let out = '<a class="govuk-link" href="' + href + '"';
   if (title) {
       out += ' title="' + title + '"';
   }
   out += '>' + text + '</a>';
   return out;
}

exports.renderer = renderer;