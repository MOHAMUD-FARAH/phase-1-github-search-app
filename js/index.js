// index.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    let currentSearchType = 'user'; // Default search type
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value;
  
      if (currentSearchType === 'user') {
        await searchUsers(searchTerm);
      } else {
        await searchRepos(searchTerm);
      }
    });
  
    userList.addEventListener('click', async (event) => {
      if (event.target.tagName === 'LI') {
        const username = event.target.dataset.username;
        await fetchUserRepos(username);
      }
    });
  
    // Function to search GitHub users
    async function searchUsers(searchTerm) {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        const data = await response.json();
        displayUsers(data.items);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
  
    // Function to display GitHub users
    function displayUsers(users) {
      userList.innerHTML = users.map(user => `
        <li data-username="${user.login}">
          <img src="${user.avatar_url}" alt="${user.login} Avatar" width="50">
          <p>${user.login}</p>
          <a href="${user.html_url}" target="_blank">Profile</a>
        </li>
      `).join('');
    }
  
    // Function to search GitHub repositories
    async function searchRepos(searchTerm) {
      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        const data = await response.json();
        displayRepos(data.items);
      } catch (error) {
        console.error('Error searching repositories:', error);
      }
    }
  
    // Function to display GitHub repositories
    function displayRepos(repos) {
      reposList.innerHTML = repos.map(repo => `
        <li>
          <p>${repo.name}</p>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">Repository Link</a>
        </li>
      `).join('');
    }
  
    // Function to fetch repositories for a specific user
    async function fetchUserRepos(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        const repos = await response.json();
        displayRepos(repos);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  });
  