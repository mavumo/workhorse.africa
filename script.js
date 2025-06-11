// Demo job data. In production, replace with jobs fetched from your backend scraping LinkedIn.
const jobs = [
  {
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Cape Town, South Africa",
    country: "South Africa",
    posted: "2 days ago",
    description: "Join Acme Corp as a Frontend Developer building modern web apps with React and TypeScript.",
    url: "https://www.linkedin.com/jobs/view/123456/",
    source: "LinkedIn"
  },
  {
    title: "Digital Marketing Specialist",
    company: "Innovatech",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    posted: "4 days ago",
    description: "Drive digital campaigns and analytics for Innovatech. Experience with Google Ads required.",
    url: "https://www.linkedin.com/jobs/view/234567/",
    source: "LinkedIn"
  },
  {
    title: "Backend Engineer",
    company: "Tech Solutions",
    location: "Accra, Ghana",
    country: "Ghana",
    posted: "1 day ago",
    description: "Work on scalable backend systems using Node.js and PostgreSQL.",
    url: "https://www.linkedin.com/jobs/view/345678/",
    source: "LinkedIn"
  },
  {
    title: "Operations Manager",
    company: "Botswana Motors",
    location: "Gaborone, Botswana",
    country: "Botswana",
    posted: "3 days ago",
    description: "Manage operations and teams for a leading automotive firm.",
    url: "https://www.linkedin.com/jobs/view/456789/",
    source: "LinkedIn"
  },
  {
    title: "IT Support Analyst",
    company: "SwaziTech",
    location: "Mbabane, Swaziland",
    country: "Swaziland",
    posted: "5 days ago",
    description: "Provide IT support and troubleshooting for clients in Swaziland.",
    url: "https://www.linkedin.com/jobs/view/567890/",
    source: "LinkedIn"
  },
  {
    title: "Python Developer",
    company: "Nairobi AI",
    location: "Nairobi, Kenya",
    country: "Kenya",
    posted: "6 hours ago",
    description: "Build AI-driven web applications using Python, Django, and machine learning.",
    url: "https://www.linkedin.com/jobs/view/678901/",
    source: "LinkedIn"
  },
  {
    title: "Finance Manager",
    company: "ZimFinance",
    location: "Harare, Zimbabwe",
    country: "Zimbabwe",
    posted: "7 days ago",
    description: "Lead financial planning and reporting for ZimFinance.",
    url: "https://www.linkedin.com/jobs/view/789012/",
    source: "LinkedIn"
  },
  {
    title: "Sales Lead",
    company: "Zambia Agro",
    location: "Lusaka, Zambia",
    country: "Zambia",
    posted: "2 days ago",
    description: "Drive sales strategy and market expansion for Zambia Agro.",
    url: "https://www.linkedin.com/jobs/view/890123/",
    source: "LinkedIn"
  }
];

// Rendering job listings
function renderJobs(filteredJobs) {
  const list = document.getElementById('job-listings');
  list.innerHTML = '';
  if (!filteredJobs.length) {
    document.getElementById('no-results').style.display = 'block';
    return;
  }
  document.getElementById('no-results').style.display = 'none';
  for (const job of filteredJobs) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <div class="job-title">${job.title}</div>
      <div class="job-meta">
        <span><strong>${job.company}</strong></span>
        <span>${job.location}</span>
        <span class="job-country">${job.country}</span>
        <span>${job.posted}</span>
        <span style="color: #888; font-size: 0.9em;">${job.source}</span>
      </div>
      <div class="job-desc">${job.description}</div>
      <a class="job-link" href="${job.url}" target="_blank" rel="noopener">Apply</a>
    `;
    list.appendChild(card);
  }
}

// Search and filtering
function filterJobs(keyword, country) {
  const kw = keyword.trim().toLowerCase();
  return jobs.filter(job => {
    const inCountry = !country || job.country === country;
    const inText =
      !kw ||
      job.title.toLowerCase().includes(kw) ||
      job.company.toLowerCase().includes(kw) ||
      job.location.toLowerCase().includes(kw) ||
      job.description.toLowerCase().includes(kw);
    return inCountry && inText;
  });
}

// Handle search form
document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const keyword = document.getElementById('search').value;
  const country = document.getElementById('country').value;
  renderJobs(filterJobs(keyword, country));
});

// Initial page load
window.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobs);
});