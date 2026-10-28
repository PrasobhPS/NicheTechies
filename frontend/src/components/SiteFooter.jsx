import footerHtml from '../content/footer.html?raw';

export default function SiteFooter() {
  return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;
}
