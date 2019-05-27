/*
 * Displays the search results after submitting the form.
 */

// maximum length of search results table
var LIMIT = 15;

// searches for the given name and gender
function search(name, gend) {

    // arguments are optional; read form if missing
    if (!name) {
        name = document.getElementById("name").value;
    }
    if (!gend) {
        if (document.getElementById("F").checked)
            gend = 'F';
        else
            gend = 'M';
    }

    // capitalize the name and update the form
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    document.getElementById("name").value = name;
    if (gend == 'F') {
        document.getElementById("F").checked = true;
        document.getElementById("M").checked = false;
    } else {
        document.getElementById("F").checked = false;
        document.getElementById("M").checked = true;
    }

    // initialize variables and validate inputs
    if (gend == 'F') {
        var code = f_phones[name];
        var sounds = f_sounds[code];
        var trends = f_trends[name];
    } else {
        var code = m_phones[name];
        var sounds = m_sounds[code];
        var trends = m_trends[name];
    }
    var table = document.getElementById("t0");
    if (code) {
        // display results for the first time
        table.style.display = "block";
    } else {
        alert(name + " (" + gend + ") not found");
        return;
    }

    // update search results
    table = document.getElementById("t1");
    for (var i = 0; i < table.children.length; i++) {
        if (table.children[i].firstChild.firstChild.data == name) {
            var child = table.children[i];
            table.removeChild(child);
            table.insertBefore(child, table.firstChild);
            break;
        }
    }
    if (i == table.children.length) {
        // insert name for the first time
        bchart(table, name, gend, true);
    }
    while (table.children.length > LIMIT) {
        table.removeChild(table.lastChild);
    }
    table.firstChild.style.backgroundColor = "lightyellow";
    if (table.children[1]) {
        table.children[1].style.backgroundColor = "whitesmoke";
    }

    // update sounds like
    table = document.getElementById("t2");
    table.innerHTML = "";
    for (i in sounds) {
        if (sounds[i] != name)
            bchart(table, sounds[i], gend);
    }

    // update trends like
    table = document.getElementById("t3");
    table.innerHTML = "";
    for (i in trends) {
        bchart(table, trends[i][1], gend);
        var td3 = document.createElement('td');
        table.lastChild.appendChild(td3);
        td3.innerHTML = trends[i][0].toLocaleString();
        td3.style.color = "darkgray";
    }
}

// searches for a random name and gender
function random() {
    if (Math.random() < 0.5) {
        document.getElementById("F").checked = true;
        var a = Object.keys(f_counts);
    } else {
        document.getElementById("M").checked = true;
        var a = Object.keys(m_counts);
    }
    var i = Math.floor(Math.random() * a.length);
    document.getElementById("name").value = a[i];
    search();
}
