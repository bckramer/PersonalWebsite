var ul = document.createElement("UL");
ul.setAttribute("id", "ul");

createLiElement("About Me", "/index", ul);
createLiElement("Significant Projects", "/SignificantProjects.html", ul);
createLiElement("Professional Experience", "/ProfessionalExperience.html", ul);
createLiElement("Skills", "/CodingSkills.html", ul);
createLiWithImage("images/linkedin.png", "https://www.linkedin.com/in/benjamin-kramer-579701148/", ul);
createLiWithImage("images/github.png", "https://github.com/bckramer", ul);

document.body.appendChild(ul);
document.getElementById("picture").style.marginTop = ul.clientHeight.toString() + "px";

window.onresize = function(event) {
    document.getElementById("picture").style.marginTop = ul.clientHeight.toString() + "px";
    updateTextSize();
    updateLiOnHoverSizes();
};

window.onload = function(event) {
    document.getElementById("picture").style.marginTop = ul.clientHeight.toString() + "px";
    updateTextSize();
    updateLiOnHoverSizes();
};

function updateTextSize() {
    let texts = document.getElementsByClassName("center");
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.fontSize = (document.getElementById("picture").clientHeight * .70).toString() + "%";
    }
}

function updateLiOnHoverSizes() {
    let liElements = ul.getElementsByTagName("li");
    let screenWidth = ul.clientWidth;
    let css;
    if (screenWidth < 676) {
        css = 'li a:hover{ height: auto; display: block; }';
    } else {
        css = 'li a:hover{ height: ' + ul.clientHeight.toString() + 'px; display: block; }';
    }
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    for (let i = 0; i < liElements.length; i++) {
        liElements[i].appendChild(style);
    }
}

function createLiElement(title, href, ul) {
    let li = document.createElement("LI");
    let a = document.createElement("a");
    let linkText = document.createTextNode(title);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    li.height = ul.clientHeight.toString() + "px";
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
    img.zIndex = 5;
}
