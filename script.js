
const base_url = "https://randomuser.me/api/";

async function fetchUsers(gender = '') {
    try {
        const response = await fetch(`${base_url}?results=10${gender ? `&gender=${gender}` : ''}`);
        if (response.status === 200) {
            const { results } = await response.json();
            let postCard = document.getElementById("post_container");
            postCard.innerHTML = ''; // Clear the container before appending new content.

            results.map((user, index) => {
                let card = document.createElement("div");
                card.className = "cards";
                card.id = `${user.login.uuid}`;

                card.innerHTML = `
                <div key=${index}>
                    <img src="${user.picture.medium}" alt="Profile Picture" />
                    <p>Name: ${user.name.first} ${user.name.last}</p>
                    <p>Gender: ${user.gender}</p>
                    <p>Email: ${user.email}</p>
                    <p>Address: ${user.location.street.name}, ${user.location.city}, ${user.location.country}</p>
                    <p>Postcode: ${user.location.postcode}</p>
                    <button type="button" class="btn btn-info" onclick="deletePost('${user.login.uuid}')">Delete Post</button>
                </div>
                `;

                postCard.append(card);
            });
        } else {
            console.log("Failed to fetch users");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

function deletePost(id) {
    const dltCard = document.getElementById(id);
    if (dltCard) dltCard.remove();
}

document.getElementById("fetch_males").addEventListener("click", () => {
    fetchUsers('male');
});

document.getElementById("fetch_females").addEventListener("click", () => {
    fetchUsers('female');
});

document.getElementById("fetch_both").addEventListener("click", () => {
    fetchUsers();
});