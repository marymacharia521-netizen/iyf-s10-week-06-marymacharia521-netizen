const lesson12Output = document.getElementById("lesson12-output");
const loadingState = document.getElementById("api-loading");
const errorState = document.getElementById("api-error");
const userDirectory = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const cityFilter = document.getElementById("city-filter");
const sortSelect = document.getElementById("sort");
const postForm = document.getElementById("post-form");
const postResult = document.getElementById("post-result");

let allUsers = [];

function addLesson12Block(title, content) {
    const article = document.createElement("article");
    article.className = "exercise-card";
    article.innerHTML = `
        <h2>${title}</h2>
        <pre>${content}</pre>
    `;
    lesson12Output.appendChild(article);
}

async function fetchJson(url, message) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(message || `HTTP error ${response.status}`);
    }

    return response.json();
}

async function runFetchBasics() {
    try {
        const singleUser = await fetchJson(
            "https://jsonplaceholder.typicode.com/users/1",
            "Failed to fetch a single user"
        );
        addLesson12Block("Task 12.1: Single User Fetch", JSON.stringify(singleUser, null, 2));

        const users = await fetchJson(
            "https://jsonplaceholder.typicode.com/users",
            "Failed to fetch all users"
        );
        addLesson12Block(
            "Task 12.1: All Users Fetch",
            `Fetched ${users.length} users successfully.`
        );

        const posts = await fetchJson(
            "https://jsonplaceholder.typicode.com/users/1/posts",
            "Failed to fetch posts for user 1"
        );
        addLesson12Block(
            "Task 12.1: User Posts Fetch",
            `Fetched ${posts.length} posts for user 1.`
        );
    } catch (error) {
        showApiError(error.message);
    }
}

function showLoading() {
    loadingState.classList.remove("hidden");
}

function hideLoading() {
    loadingState.classList.add("hidden");
}

function showApiError(message) {
    errorState.textContent = message;
    errorState.classList.remove("hidden");
}

function hideApiError() {
    errorState.textContent = "";
    errorState.classList.add("hidden");
}

function displayUsers(users) {
    if (!users.length) {
        userDirectory.innerHTML = "<p class=\"empty-directory\">No users match the current filters.</p>";
        return;
    }

    userDirectory.innerHTML = users.map((user) => `
        <article class="user-card">
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        </article>
    `).join("");
}

function populateCityFilter(users) {
    const cities = [...new Set(users.map((user) => user.address.city))].sort();

    cityFilter.innerHTML = [
        "<option value=\"\">All Cities</option>",
        ...cities.map((city) => `<option value="${city}">${city}</option>`)
    ].join("");
}

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCity = cityFilter.value;
    const sortOrder = sortSelect.value;

    let filteredUsers = allUsers.filter((user) => {
        const matchesQuery =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);
        const matchesCity = !selectedCity || user.address.city === selectedCity;

        return matchesQuery && matchesCity;
    });

    filteredUsers = filteredUsers.sort((firstUser, secondUser) => {
        if (sortOrder === "z-a") {
            return secondUser.name.localeCompare(firstUser.name);
        }

        return firstUser.name.localeCompare(secondUser.name);
    });

    displayUsers(filteredUsers);
}

async function loadUsers() {
    try {
        showLoading();
        hideApiError();

        allUsers = await fetchJson(
            "https://jsonplaceholder.typicode.com/users",
            "Failed to fetch users"
        );

        populateCityFilter(allUsers);
        applyFilters();
    } catch (error) {
        showApiError(error.message);
    } finally {
        hideLoading();
    }
}

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body, userId })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

async function handlePostSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    const userId = Number(document.getElementById("post-user-id").value);

    postResult.textContent = "Submitting post...";

    try {
        const newPost = await createPost(title, body, userId);
        postResult.textContent = `Created post with ID ${newPost.id} for user ${newPost.userId}.`;
        addLesson12Block("Task 12.3: POST Request Result", JSON.stringify(newPost, null, 2));
        postForm.reset();
    } catch (error) {
        postResult.textContent = error.message;
    }
}

searchInput.addEventListener("input", applyFilters);
cityFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
postForm.addEventListener("submit", handlePostSubmit);

runFetchBasics();
loadUsers();
