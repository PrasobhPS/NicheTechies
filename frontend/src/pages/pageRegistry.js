import manifest from '../content/manifest.json';

import homeHtml from '../content/home.html?raw';
import aboutHtml from '../content/about.html?raw';
import servicesHtml from '../content/services.html?raw';
import caseStudiesHtml from '../content/caseStudies.html?raw';
import blogHtml from '../content/blog.html?raw';
import blogDetailsHtml from '../content/blogDetails.html?raw';
import careersHtml from '../content/careers.html?raw';
import contactHtml from '../content/contact.html?raw';
import galleryHtml from '../content/gallery.html?raw';
import jobDetailsHtml from '../content/jobDetails.html?raw';
import prakriaHtml from '../content/prakria.html?raw';
import akiGroupHtml from '../content/akiGroup.html?raw';
import aladdin365Html from '../content/aladdin365.html?raw';

const optionalScript = (name) => {
  const modules = import.meta.glob('../content/*.scripts.js', { query: '?raw', import: 'default', eager: true });
  return modules[`../content/${name}.scripts.js`] || '';
};

const pages = {
  home: { html: homeHtml, inlineScript: optionalScript('home'), ...manifest.home },
  about: { html: aboutHtml, inlineScript: optionalScript('about'), ...manifest.about },
  services: { html: servicesHtml, inlineScript: optionalScript('services'), ...manifest.services },
  caseStudies: { html: caseStudiesHtml, inlineScript: optionalScript('caseStudies'), ...manifest.caseStudies },
  blog: { html: blogHtml, inlineScript: optionalScript('blog'), ...manifest.blog },
  blogDetails: { html: blogDetailsHtml, inlineScript: optionalScript('blogDetails'), ...manifest.blogDetails },
  careers: { html: careersHtml, inlineScript: optionalScript('careers'), ...manifest.careers },
  contact: { html: contactHtml, inlineScript: optionalScript('contact'), ...manifest.contact },
  gallery: { html: galleryHtml, inlineScript: optionalScript('gallery'), ...manifest.gallery },
  jobDetails: { html: jobDetailsHtml, inlineScript: optionalScript('jobDetails'), ...manifest.jobDetails },
  prakria: { html: prakriaHtml, inlineScript: optionalScript('prakria'), ...manifest.prakria },
  akiGroup: { html: akiGroupHtml, inlineScript: optionalScript('akiGroup'), ...manifest.akiGroup },
  aladdin365: { html: aladdin365Html, inlineScript: optionalScript('aladdin365'), ...manifest.aladdin365 },
};

export default pages;
