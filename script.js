const githubBtn = document.getElementById('github');
const githubLink = "https://github.com/Lolo280374/fuckCustoms";
const flavortownBtn = document.getElementById('flavortown');
const flavortownLink = "https://flavortown.hackclub.com/projects/13644";

lucide.createIcons();

if (githubBtn){
    githubBtn.addEventListener('click', (e) => {
        githubBtn.blur();
        window.open(githubLink, "_blank", "noopener");
    });
}

if (flavortownBtn){
    flavortownBtn.addEventListener('click', (e) => {
        flavortownBtn.blur();
        window.open(flavortownLink, "_blank", "noopener");
    });
}