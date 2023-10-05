document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const result = document.getElementById("result");

    searchButton.addEventListener("click", function () {
        const username = searchInput.value.trim();
        if (username !== "") {
            searchGitHubProfile(username);
        }
    });

    function searchGitHubProfile(username) {
        const apiUrl = `https://api.github.com/users/${username}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Not Found") {
                    result.innerHTML = "User not found.";
                } else {
                    displayGitHubProfile(data);
                }
            })
            .catch(error => {
                console.error("Error fetching GitHub API:", error);
                result.innerHTML = "An error occurred.";
            });
    }

    function displayGitHubProfile(data) {
        // Display GitHub profile information including profile name and photo
        const profileName = data.name || data.login;
        const profileURL = data.html_url;
        const profilePhotoURL = data.avatar_url;
        
        // Create an HTML element for the profile photo
        const profilePhotoElement = document.createElement("img");
        profilePhotoElement.src = profilePhotoURL;
        profilePhotoElement.alt = `${profileName}'s profile photo`;
        profilePhotoElement.classList.add("profile-photo");

        // Create a div element for the profile information
        const profileInfoElement = document.createElement("div");
        profileInfoElement.classList.add("profile-info");
        profileInfoElement.innerHTML = `
            <p><b>Name:</b> ${profileName}</p>
            <p><b>GitHub URL:</b> <a href="${profileURL}" target="_blank">${profileURL}</a></p>
        `;

        // Add both elements to the result container
        result.innerHTML = ""; // Clear previous content
        result.appendChild(profilePhotoElement);
        result.appendChild(profileInfoElement);
    }
});
