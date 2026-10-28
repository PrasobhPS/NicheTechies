import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layout/SiteLayout';
import PageView from './pages/PageView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<PageView pageKey="home" />} />
          <Route path="about" element={<PageView pageKey="about" />} />
          <Route path="services" element={<PageView pageKey="services" />} />
          <Route path="case-studies" element={<PageView pageKey="caseStudies" />} />
          <Route path="case-studies/prakria" element={<PageView pageKey="prakria" />} />
          <Route path="case-studies/aki-group" element={<PageView pageKey="akiGroup" />} />
          <Route path="case-studies/aladdin365" element={<PageView pageKey="aladdin365" />} />
          <Route path="blog" element={<PageView pageKey="blog" />} />
          <Route path="blog/details" element={<PageView pageKey="blogDetails" />} />
          <Route path="careers" element={<PageView pageKey="careers" />} />
          <Route path="careers/job-details" element={<PageView pageKey="jobDetails" />} />
          <Route path="contact" element={<PageView pageKey="contact" />} />
          <Route path="gallery" element={<PageView pageKey="gallery" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
