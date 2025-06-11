const listingsEl = document.getElementById('job-listings');
const searchInput = document.getElementById('search-input');
const countrySelect = document.getElementById('country-select');
const searchBtn = document.getElementById('search-btn');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let lastFetchCount = 0;

async function fetchJobs() {
  const q = encodeURIComponent(searchInput.value.trim());
  const country = encodeURIComponent(countrySelect.value);
  const res = await fetch(`/api/jobs?search=${q}&country=${country}&page=${currentPage}`);
  const { jobs, page, perPage } = await res.json();
  lastFetchCount = jobs.length;
  pageInfo.textContent = `Page ${page}`;
  renderJobs(jobs);
  prevBtn.disabled = page <= 1;
  nextBtn.disabled = jobs.length < perPage;
}

function renderJobs(jobs) {
  listingsEl.innerHTML = '';
  if (jobs.length === 0) {
    listingsEl.innerHTML = '<p>No jobs found.</p>';
    return;
  }
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <a href="${job.url}" target="_blank">View on LinkedIn</a>
    `;
    listingsEl.appendChild(card);
  });
}

// Event listeners
searchBtn.addEventListener('click', () => {
  currentPage = 1;
  fetchJobs();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchJobs();
  }
});

nextBtn.addEventListener('click', () => {
  if (lastFetchCount > 0) {
    currentPage++;
    fetchJobs();
  }
});

// Initial load
fetchJobs();
