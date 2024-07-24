async function flipBox() {
    const box = document.getElementById('box');
    const userName = document.getElementById("input-box").value;
    
    if (!box.classList.contains('flipped')) {
        try {
            const res = await fetch("https://api.github.com/users/" + userName);
            const info = await res.json();
            document.getElementById("profile_image").innerHTML = `<img src="${info.avatar_url}" alt="user_avatar" style="border-radius: 50%; width: 150px; height: 150px;">`;
            document.getElementById("username").innerHTML = `Name: ${info.name || 'No name provided'}`;
            
            const repoRes = await fetch(`https://api.github.com/users/${userName}/repos`);
            const repos = await repoRes.json();
            const repoList = document.getElementById('Reposdetails');
            repoList.innerHTML = '';

            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'repo';
                repoElement.innerHTML = `
                   <p>${repo.description || 'No description'}</p>
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>    
                `;
                repoList.appendChild(repoElement);
            });
        } catch (error) {
            console.error(error);
            document.getElementById('Reposdetails').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }

    box.classList.toggle('flipped');
}