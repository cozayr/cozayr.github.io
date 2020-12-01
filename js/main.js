
var navmode = false;
var currentPage = "home";
var intransit = false;

// SHOW INDEX MENU
document.getElementById("bun").classList.add("show");




window.onpopstate = function (event) {
    if (event.state && event.state.target != "home") {
        content = event.state.target;
        console.log(content);
        load("#E74C3C", content);
    }
    else if (event.state && event.state.target == "home") {
        gohome();
    }
}


function load(e, page) {
    if (intransit) return;
    history.pushState({
        target: page,
    }, null, page);
    intransit = true;
    currentPage = page;
    document.querySelector("#loading").classList.add("showloading");

    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    bg = e;
    var elem = document.getElementById("cheese");
    elem.style.backgroundColor = e;
    elem.style.left = x + "px";
    elem.style.top = y + "px";
    elem.classList.add("meltCheese");
    document.querySelector('meta[name="theme-color"]').setAttribute('content', e);
}

function loadFromMenu(e, page) {
    if (intransit) return;
    history.pushState({
        target: page,
    }, null, page);
    intransit = true;
    currentPage = page;
    document.querySelector("#loading").classList.add("showloading");
    document.querySelector("#navigation").classList.add("navigationisloading");
    


}


const transition = document.querySelector('#cheese');
transition.addEventListener('transitionend', (event) => {
    if (event.propertyName == "transform") {
        httpGetAsync();
        intransit = false;
    }
});

let goHomeTransition = document.querySelector('#content');
goHomeTransition.addEventListener('transitionend', (event) => {
    if (event.propertyName == "left") {        
        intransit = false;
    }
});

let navigationTransition = document.querySelector('#navigation');
navigationTransition.addEventListener('transitionend', (event) => {
    if (event.propertyName == "width") {
        intransit = false;
        if (parseInt(window.getComputedStyle(document.querySelector('#navigation')).left.replace('px', ''), 10) >= 0) {
            setTimeout(() => { httpGetAsync(); }, 700);
        }
        
    }
});

function toggleNavigation() {
    if (!navmode) {
        document.querySelector("#navigation").classList.add("showNavigation");
        document.querySelector("#content").classList.add("makeRoom");
        navmode = true;
    } else {
        document.querySelector("#navigation").classList.remove("showNavigation");
        document.querySelector("#content").classList.remove("makeRoom");
        document.querySelector("#navigation").classList.remove("navigationisloading");
        navmode = false;
    }
}

function gohome() {
    if (intransit) return;
    document.querySelector("#content").classList.remove("showContent");
    history.pushState({
        target: "home",
    }, null, "home");
    document.querySelector("#opennavigation").classList.remove("shownav");
    if (navmode) {
        document.querySelector("#navigation").classList.remove("showNavigation");
        document.querySelector("#content").classList.remove("makeRoom");
        navmode = false;
    }
    document.querySelector('meta[name="theme-color"]').setAttribute('content', "#000000");
}

function httpGetAsync() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../content/' + currentPage + '.html?' + Math.random());
    xhr.send();

    xhr.onload = function () {
        if (xhr.status != 200) { // analyze HTTP status of the response
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            if (!navmode) {
                document.querySelector("#content").innerHTML = xhr.response;
                document.querySelector("#content").innerHTML = xhr.response;
                document.querySelector("#content").innerHTML = xhr.response;
                document.querySelector("#content").classList.add("showContent");
                document.querySelector("#loading").classList.remove("showloading");

                setTimeout(() => { document.querySelector("#cheese").classList.remove("meltCheese"); }, 700);
                document.querySelector("#opennavigation").classList.add("shownav");
            } else {
                document.querySelector("#content").innerHTML = xhr.response;
                toggleNavigation();
                document.querySelector("#loading").classList.remove("showloading");
            }
                      
        }
    };
}


history.pushState({
    target: "home",
}, "Home", "@home");

console.log("First state");