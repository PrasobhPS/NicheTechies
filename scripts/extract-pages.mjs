import fs from 'fs';
import path from 'path';

const SOURCE = '/home/techmaven/Desktop/myProjects/work/niche-tech';
const OUT = '/home/techmaven/Desktop/myProjects/work/Nichetechcareer/frontend/src/content';

const PAGE_FILES = {
  home: 'index.html',
  about: 'about.html',
  services: 'service.html',
  caseStudies: 'caseStudy.html',
  blog: 'blog.html',
  blogDetails: 'blogdetails.html',
  careers: 'career.html',
  contact: 'contact.html',
  gallery: 'gallery.html',
  jobDetails: 'jobdetails.html',
  prakria: 'prakria-direct.html',
  akiGroup: 'aki-group.html',
  aladdin365: 'aladdin365-details.html',
};

const LINK_MAP = {
  'index.html': '/',
  'about.html': '/about',
  'service.html': '/services',
  'caseStudy.html': '/case-studies',
  'blog.html': '/blog',
  'blogdetails.html': '/blog/details',
  'career.html': '/careers',
  'careers.html': '/careers',
  'contact.html': '/contact',
  'gallery.html': '/gallery',
  'jobdetails.html': '/careers/job-details',
  'prakria-direct.html': '/case-studies/prakria',
  'aki-group.html': '/case-studies/aki-group',
  'aladdin365-details.html': '/case-studies/aladdin365',
};

const PAGE_CSS = {
  home: [],
  about: ['aboutpage.css'],
  services: ['service.css'],
  caseStudies: ['caseStudy.css'],
  blog: ['blogpage.css'],
  blogDetails: ['blogdetails.css'],
  careers: ['careerpage.css'],
  contact: ['contactpage.css'],
  gallery: ['gallery.css'],
  jobDetails: ['jobdetails.css'],
  prakria: ['project-details.css'],
  akiGroup: ['project-details.css'],
  aladdin365: ['project-details.css'],
};

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : 'Niche Techies';
}

function extractBodyClass(html) {
  const m = html.match(/<body[^>]*class="([^"]*)"/i);
  return m ? m[1] : 'bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white';
}

function extractMainContent(html) {
  const headerEnd = html.indexOf('</header>');
  if (headerEnd === -1) throw new Error('No </header> found');
  const afterHeader = headerEnd + '</header>'.length;

  const footerStart = html.indexOf('<footer', afterHeader);
  if (footerStart === -1) throw new Error('No <footer found');

  return html.slice(afterHeader, footerStart).trim();
}

function extractInlineScripts(html) {
  const footerEnd = html.lastIndexOf('</footer>');
  if (footerEnd === -1) return '';

  const tail = html.slice(footerEnd + '</footer>'.length);
  const gsapIdx = tail.search(/<script[^>]*gsap/i);
  const scriptRegion = gsapIdx === -1 ? tail : tail.slice(0, gsapIdx);

  const scripts = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(scriptRegion)) !== null) {
    const body = m[1].trim();
    if (body) scripts.push(body);
  }
  return scripts.join('\n\n');
}

function rewriteLinks(content) {
  let out = content.replace(/src="assets\//g, 'src="/assets/');
  out = out.replace(/href="assets\//g, 'href="/assets/');
  out = out.replace(/url\((['"]?)assets\//g, 'url($1/assets/');

  for (const [file, route] of Object.entries(LINK_MAP)) {
    out = out.replaceAll(`href="${file}"`, `href="${route}"`);
    out = out.replaceAll(`href='${file}'`, `href='${route}'`);
  }

  out = out.replace(/href="#home"/g, 'href="/#home"');
  return out;
}

fs.mkdirSync(OUT, { recursive: true });

const manifest = {};

for (const [key, file] of Object.entries(PAGE_FILES)) {
  const htmlPath = path.join(SOURCE, file);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const content = rewriteLinks(extractMainContent(html));
  const inlineScripts = extractInlineScripts(html);

  fs.writeFileSync(path.join(OUT, `${key}.html`), content);
  if (inlineScripts) {
    fs.writeFileSync(path.join(OUT, `${key}.scripts.js`), inlineScripts);
  }

  manifest[key] = {
    title: extractTitle(html),
    bodyClass: extractBodyClass(html),
    css: PAGE_CSS[key] || [],
    hasInlineScripts: Boolean(inlineScripts),
    sourceFile: file,
  };
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Extracted', Object.keys(PAGE_FILES).length, 'pages to', OUT);
