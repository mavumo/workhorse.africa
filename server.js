const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the front-end
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

/**
 * GET /api/jobs
 * Query params:
 *   - search: string
 *   - country: one of the supported countries
 *   - page: 1-based page number
 */
app.get('/api/jobs', async (req, res) => {
  const { search = '', country = 'South Africa', page = '1' } = req.query;
  const pageNum = parseInt(page, 10);
  const perPage = 10;
  const offset = (pageNum - 1) * perPage;

  const browser = await puppeteer.launch({ headless: true });
  const pageP = await browser.newPage();

  // build LinkedIn search URL
  const keywords = encodeURIComponent(search);
  const location = encodeURIComponent(country);
  const linkedinURL = `https://www.linkedin.com/jobs/search?keywords=${keywords}&location=${location}&start=${offset}`;

  await pageP.goto(linkedinURL, { waitUntil: 'networkidle2' });

  // scrape job cards
  const jobs = await pageP.evaluate(() => {
    const selector = '.jobs-search-results__list-item';
    return Array.from(document.querySelectorAll(selector)).map(node => {
      const titleEl = node.querySelector('a.job-card-list__title');
      const companyEl = node.querySelector('h4.job-card-container__company-name');
      const locationEl = node.querySelector('span.job-card-container__metadata-item');
      return {
        title: titleEl?.innerText.trim() || '',
        company: companyEl?.innerText.trim() || '',
        location: locationEl?.innerText.trim() || '',
        url: titleEl?.href || ''
      };
    });
  });

  await browser.close();
  res.json({ jobs, page: pageNum, perPage });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
