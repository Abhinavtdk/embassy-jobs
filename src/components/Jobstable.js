// src/components/JobsTable.js
import React, { useState } from 'react';
import './Jobstable.css';

function JobsTable({ jobs }) {
  const [filters, setFilters] = useState({
    source: '',
    search: ''
  });

  // Get unique sources for filter dropdown
  const sources = [...new Set(jobs.map(job => job.source))];

  // Filter jobs based on selected filters
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
          placeholder="Search job titles..."
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
              <th>Job Title</th>
              <th>Location</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{job.location || 'Not specified'}</td>
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