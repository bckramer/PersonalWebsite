var ul = document.createElement("UL");
ul.setAttribute("id", "ul");

createLiElement("About Me", "#picture", ul);
createLiElement("Significant Projects", "/SignificantProjects.html", ul);
createLiElement("Professional Experience", "/ProfessionalExperience.html", ul);
createLiElement("Skills", "/CodingSkills.html", ul);
createLiElement("Significant Projects", "/SignificantProjects.html", ul);

createLiWithImage("images/linkedin.png", "https://www.linkedin.com/in/benjamin-kramer-579701148/", ul);
createLiWithImage("images/github.png", "https://github.com/bckramer", ul);

document.body.appendChild(ul);
document.getElementById("picture").style.marginTop = ul.clientHeight.toString() + "px";

window.onresize = function(event) {
    document.getElementById("picture").style.marginTop = ul.clientHeight.toString() + "px";
}

function createLiElement(title, href, ul) {
    let li = document.createElement("LI");
    let a = document.createElement("a");
    let linkText = document.createTextNode(title);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    li.appendChild(a);
    ul.appendChild(li);
}

function createLiWithImage(src, href, ul) {
    let li = document.createElement("LI");
    let a = document.createElement("a");
    let img = document.createElement("img");
    img.src = src;
    a.append(img)
    a.href = href;
    li.appendChild(a);
    ul.appendChild(li);
}
