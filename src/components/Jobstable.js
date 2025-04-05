import React, { useState } from 'react';
import './Jobstable.css';
import flower from '../flower-1151963_1280.png';

function JobsTable({ jobs }) {
  const [filters, setFilters] = useState({
    source: '',
    search: ''
  });

  const sources = [...new Set(jobs.map(job => job.source))];

  const filteredJobs = jobs.filter(job => {
    const matchesSource = !filters.source || job.source === filters.source;
    const matchesSearch = !filters.search || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesSource && matchesSearch;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="jobs-table-container">
      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
        
        <select 
          name="source" 
          value={filters.source} 
          onChange={handleFilterChange}
          className="source-filter"
        >
          <option value="">All Countries</option>
          {sources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>
      
      <div className="table-responsive">
        <table className="jobs-table">
          <thead>
            <tr>
              <th></th>  
              <th>Job Title</th>
              <th>Location</th>
              <th>Cloding Date</th>
              <th>Source</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={index}>
                  <td><img src={flower} alt="Loading..." className="flower-pic" /></td>
                  <td>{job.title}</td>
                  <td>{job.location || 'Not specified'}</td>
                  <td>{job.closing_date || 'Not specified'}</td>
                  <td>{job.source}</td>
                  <td>
                    <a 
                      href={job.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-button"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-jobs">No jobs found matching your criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="job-count">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </div>
    </div>
  );
}

export default JobsTable;