// const base_url = "https://randomuser.me/api/";
// async function fetchUsers(gender = '') {
//     try {
//         const response = await fetch(`${base_url}?results=10${gender ? `&gender=${gender}` : ''}`);
//         if (response.status === 200) {
//             const { results } = await response.json();
//             let postCard = document.getElementById("post_container");
//             postCard.innerHTML = ''; 

//             results.map((user, index) => {
//                 let card = document.createElement("div");
//                 card.className = "cards";
//                 card.id = `${user.login.uuid}`;

//                 card.innerHTML = `
//                 <div key=${index}>
//                     <img src="${user.picture.medium}" class="pic" alt="Profile Picture" />
//                     <h6 class="m-3">Name: ${user.name.first} ${user.name.last}</h6>
//                     <p>Gender: ${user.gender}</p>
//                     <button type="button" class="btn btn-success m-3">view profile</button>
//                 </div>
//                 `;

//                 postCard.append(card);
//             });
//         } else {
//             console.log("Failed to fetch users");
//         }
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }

// function deletePost(id) {
//     const dltCard = document.getElementById(id);
//     if (dltCard) dltCard.remove();
// }

// document.getElementById("fetch_males").addEventListener("click", () => {
//     fetchUsers('males');
// });

// document.getElementById("fetch_females").addEventListener("click", () => {
//     fetchUsers('males');
// });
// document.getElementById("fetch_both").addEventListener("click", () => {
    
//     const maleButton = document.getElementById("fetch_males");
//     const femaleButton = document.getElementById("fetch_females");

//     maleButton.style.display = "inline-block";
//     femaleButton.style.display = "inline-block";

//     fetchUsers();
// });
const base_url = "https://randomuser.me/api/";

async function fetchUsers(gender = '') {
    try {
        const response = await fetch(`${base_url}?results=10${gender ? `&gender=${gender}` : ''}`);
        if (response.status === 200) {
            const { results } = await response.json();
            let postCard = document.getElementById("post_container");
            postCard.innerHTML = '';

            results.map((user, index) => {
                let card = document.createElement("div");
                card.className = "cards";
                card.id = `${user.login.uuid}`;

                card.innerHTML = `
                <div>
                    <img src="${user.picture.medium}" class="pic" alt="Profile Picture" />
                    <h5 class="m-4">Name :  ${user.name.first} ${user.name.last}</h5>
                    <h6>Gender :  ${user.gender}</h6>
                    <button type="button" class="btn btn-dark m-3 view-post" data-id="${user.login.uuid}">ViewPost</button>
                </div>
                `;
                postCard.append(card);
            });

            // Attach event listeners to "ViewPost" buttons
            document.querySelectorAll('.view-post').forEach(button => {
                button.addEventListener('click', (e) => {
                    const userId = e.target.getAttribute('data-id');
                    const user = results.find(u => u.login.uuid === userId);
                    showSinglePost(user);
                });
            });

        } else {
            console.log("Failed to fetch users.");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

function showSinglePost(user) {
    let postCard = document.getElementById("post_container");
    postCard.innerHTML = `
        <div class="single-post">
            <img src="${user.picture.large}" class="pic" alt="Profile Picture" />
            <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
            <h5>Gender: ${user.gender}</h5>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <button type="button" class="btn btn-secondary back-btn m-3">Back</button>
        </div>
    `;

    // Attach event listener to the "Back" button
    document.querySelector('.back-btn').addEventListener('click', () => {
        fetchUsers();
    });
}

document.getElementById("fetch_males").addEventListener("click", () => {
    fetchUsers('male');
});

document.getElementById("fetch_females").addEventListener("click", () => {
    fetchUsers("female");
});

document.getElementById("fetch_both").addEventListener("click", () => {
    const maleButton = document.getElementById("fetch_males");
    const femaleButton = document.getElementById("fetch_females");

    maleButton.style.display = "inline";
    femaleButton.style.display = "inline";

    fetchUsers();
});