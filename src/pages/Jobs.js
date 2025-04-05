// src/pages/Jobs.js
import React, { useState, useEffect } from 'react';
import './Jobs.css';
import JobsTable from '../components/Jobstable';
import baymax from '../baymax.gif';
import baymax_pic from '../baymax.jpeg';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const cachedData = localStorage.getItem('jobsData');
        const cachedTimestamp = localStorage.getItem('jobsTimestamp');
        const currentTime = new Date().getTime();
        
        if (cachedData && cachedTimestamp && (currentTime - parseInt(cachedTimestamp) < 3600000)) {
          console.log('Using cached jobs data');
          setJobs(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        
        // If no valid cached data, fetch from API
        console.log('Fetching fresh jobs data from API');
        const response = await fetch('https://sac13.pythonanywhere.com/api/jobs/combined');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        const fetchedJobs = data.jobs || [];
        
        // Store in localStorage with timestamp
        localStorage.setItem('jobsData', JSON.stringify(fetchedJobs));
        localStorage.setItem('jobsTimestamp', currentTime.toString());
        
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to force a refresh of the data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Clear localStorage
      localStorage.removeItem('jobsData');
      localStorage.removeItem('jobsTimestamp');
      
      // Fetch new data
      const response = await fetch('https://sac13.pythonanywhere.com/api/jobs/combined');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      const fetchedJobs = data.jobs || [];
      
      // Store new data
      localStorage.setItem('jobsData', JSON.stringify(fetchedJobs));
      localStorage.setItem('jobsTimestamp', new Date().getTime().toString());
      
      setJobs(fetchedJobs);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="jobs-page">
      <div className="banner-section">
        {/* Placeholder for future banner content, GIFs, images */}
        {/* <h1>International Embassy Jobs</h1>
        <p>Find your next career opportunity in diplomatic missions around the world</p> */}
        <img src={baymax_pic} alt="Loading..." className="loading-gif" />

      </div>
      
      {loading && (
        <div className="loading-container">
        <img src={baymax} alt="Loading..." className="loading-gif" />
        <p>Loading jobs...</p>
        </div>
        )}
      {error && <div className="error">Error loading jobs: {error}</div>}
      {!loading && !error && <JobsTable jobs={jobs} />}
      {!loading && 
        <div className="data-info">
          {localStorage.getItem('jobsTimestamp') && (
            <p className="cache-info">
              {/* Data last updated: {new Date(parseInt(localStorage.getItem('jobsTimestamp'))).toLocaleString()} */}
              <button className="refresh-button" onClick={refreshData}>
                Refresh Data
              </button>
            </p>
          )}
        </div>
      }
    </div>
  );
}

export default Jobs;