function setup() {
    createCanvas(1000, 1000);
    noStroke();
}

const n = sides.length;
var colors = [];
var distance = [];
var pi = Math.PI;

for (i = 0; i < n; i++) {
    colors.push("hsla(" + Math.round(i/n*360)%360 + ", 100%, 50%, " + opacity + ")");
}

function draw() {
    background(0);
    translate(width/2,height/2);
    var weight = [];
    var order = [];
    for (i = 0; i < n; i++) {
        let a = 0;
        for (j = 0; j < sides[i].split(".").length; j++) {
            a += z[parseInt(sides[i].split(".")[j])];
        }
        weight.push(a);
    }
    for (i = 0; i < n/2; i++) {
        let smallest = 0;
        for (j = 1; j < n; j++) {
            if (weight[j] < weight[smallest]) {
                smallest = j;
            }
        }
        order.push(smallest);
        weight[smallest] = "0";
    }
    for (i = 0; i < n; i++) {
        if (weight[i] != "0") {
            order.push(i);
        }
    }
    for (i = 0; i < n; i++) {
        let o = order[n-i-1];
        fill(color(colors[o]));
        beginShape();
        for (j = 0; j < sides[o].split(".").length; j++) {
            let a = parseInt(sides[o].split(".")[j]);
            vertex(x[a] / distance[a] * scale, y[a] / distance[a] * scale);
        }
        endShape();
    }

    if (Math.hypot(a, b) > Math.hypot(-0.001, -0.0005)) {
        a *= .98;
        b *= .98;
    } else {
        a = -0.001;
        b = -0.0005;
    }
}

var a = .5, b = .25;
function run() {
    for (i = 0; i < x.length; i++) {
        if (x[i] != 0) {
            var angle = Math.atan(z[i] / x[i]) + pi * (Math.abs(x[i]) / x[i] - 1) / -2;
        } else if (z[i] != 0) {
            var angle = pi / 2 * Math.abs(z[i]) / z[i];
        } else {
            var angle = 0;
        }
        
        var magnitude = Math.sqrt(x[i]*x[i] + z[i]*z[i]);
        x[i] = Math.cos(angle + a) * magnitude;
        z[i] = Math.sin(angle + a) * magnitude;

        if (z[i] != 0) {
            var angle = Math.atan(y[i] / z[i]) + pi * (Math.abs(z[i]) / z[i] - 1) / -2;
        } else if (y[i] != 0) {
            var angle = pi / 2 * Math.abs(y[i]) / y[i];
        } else {
            var angle = 0;
        }

        var magnitude = Math.sqrt(y[i]*y[i] + z[i]*z[i]);
        y[i] = Math.sin(angle - b) * magnitude;
        z[i] = Math.cos(angle - b) * magnitude;

        
        distance[i] = z[i] + dist;
    }


    setTimeout(() => {
        run();
    }, time);
} run();

var posX; var posY;
var pressure = false;
function down() {
    posX = event.clientX;
    posY = event.clientY;
    
    pressure = true;
}
function move() {
    if (pressure == true) {
        let newPosX = event.clientX;
        let newPosY = event.clientY;

        a = (newPosX - posX) / 1000 * sensitivity;
        b = (newPosY - posY) / 1000 * sensitivity;

        posX = newPosX;
        posY = newPosY;
    }
}
function up() {
    var q = 0;
    var bool = false;
    while (bool == false) {
        setTimeout(() => {
            a *= .99;
            b *= .99;
        }, q * 5);
        q += 1;
        if (Math.pow(.99, q) < 0.002 / Math.sqrt(a*a + b*b)) {
            bool = true;
            setTimeout(() => {
                a = 0;
                b = 0;
            }, q * 5);
        }
    }
    console.log(q);

    pressure = false;
}
function touchdown() {
    posX = event.touches[0].clientX;
    posY = event.touches[0].clientY;

    pressure = true;
}
function touchdown() {
    posX = event.touches[0].clientX;
    posY = event.touches[0].clientY;

    pressure = true;
}
function touchmove() {
    if (pressure == true) {
        let newPosX = event.touches[0].clientX;
        let newPosY = event.touches[0].clientY;

        a = (newPosX - posX) / 1000 * sensitivity;
        b = (newPosY - posY) / 1000 * sensitivity;

        posX = newPosX;
        posY = newPosY;
    }
}

if (window.innerHeight < window.innerWidth) {
    document.getElementsByTagName("main")[0].style.transform = 'scale(' + window.innerHeight / 1000 + ")";
} else {
    document.getElementsByTagName("main")[0].style.transform = 'scale(' + window.innerWidth / 1000 + ")";
}

document.body.style.height = window.innerHeight + "px";
document.body.style.width = window.innerWidth + "px";