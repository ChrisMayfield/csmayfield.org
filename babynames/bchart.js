/*
 * Draws a compact vertical bar chart with interactive tooltips.
 */

// size of canvas, not counting the border
HEIGHT = 25;

// line height ranges from 0 to HEIGHT (0% to TOPPCT)
TOPPCT = 0.003;

// line color ranges from 255 to 0 (0% to MAXPCT)
MAXPCT = 0.05;

// calculates the relative mouse position inside of a canvas, as described on
// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// main function that draws the bar chart
function bchart(table, name, gend, insert) {

    // create a new table row
    var row = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    row.appendChild(td1);
    row.appendChild(td2);
    if (insert)
        table.insertBefore(row, table.firstChild);
    else
        table.appendChild(row);

    // initialize cell contents
    td1.innerHTML = name;
    td1.style.cursor = "pointer";
    td1.onclick = function() { search(name, gend); };
    var canvas = document.createElement('canvas');
    canvas.width = f_totals.length + 2;
    canvas.height = HEIGHT + 2;
    td2.appendChild(canvas);

    // draw a light border
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.rect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
    ctx.stroke();

    // use applicable variables
    if (gend == 'F') {
        var counts = f_counts[name];
        var totals = f_totals;
    } else {
        var counts = m_counts[name];
        var totals = m_totals;
    }
    if (!counts) return;

    // visualize the distribution
    var sum = 0;
    for (i = 0; i < counts.length; i++) {
        sum += counts[i];
        var ratio = counts[i] / totals[i];
        // determine the color by percentage and gender
        var color = Math.round(ratio * 255 / MAXPCT);
        if (gend == 'F') {
            ctx.strokeStyle = "rgba(" + (255 - color) + ", 0, 0, 0.9)";
        } else {
            ctx.strokeStyle = "rgba(0, 0, " + (255 - color) + ", 0.9)";
        }
        // draw a vertical line corresponding to this year
        var height = ratio * HEIGHT / TOPPCT;
        ctx.beginPath();
        ctx.moveTo(1.5 + i, 1 + HEIGHT);
        ctx.lineTo(1.5 + i, 1 + HEIGHT - height);
        ctx.stroke();
    }

    // show the details in tooltip
    canvas.addEventListener('mousemove', function(evt) {
        var x = Math.floor(getMousePos(canvas, evt).x);
        if (1 <= x && x <= counts.length) {
            x--; // 0-based indexing
            var year = x + 1880;
            var cnt = counts[x].toLocaleString();
            var pct = (100 * counts[x] / totals[x]).toLocaleString();
            canvas.title = year + ":  " + cnt + "  " + pct + "%";
        } else {
            // show number of names by default
            canvas.title = "Total: " + sum.toLocaleString();
        }
    }, false);
}
