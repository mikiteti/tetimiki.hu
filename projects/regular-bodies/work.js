if (window.innerWidth < window.innerHeight) document.body.style.height = window.innerHeight * .83 + "px";
var canvas = document.getElementById("myCanvas"), size = Math.min(window.innerWidth*3/2, window.innerHeight);
fps = 1000 / fps;
sensitivity = sensitivity / 1000;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas = canvas.getContext("2d");
canvas.translate(window.innerWidth*.5, window.innerHeight*.5);
canvas.lineWidth = .3;

// Work -----------------------------------------------------------------------------------------------
var magnitude = [];
for (let l of light_source) magnitude.push(l[0]*l[0] + l[1]*l[1] + l[2]*l[2]);

for (let b of bodies) {
    b.toMe = [];
    b.scale *= size;
    for (let f of b.faces) {
        let x = 0, y = 0, z = 0;
        for (let i of f) {
            x += b.coord[0][i];
            y += b.coord[1][i];
            z += b.coord[2][i];
        }
        b.toMe.push(-(x*x + y*y + z*z) / f.length / b.position[2]);
    }

    b.light_source = [];
    for (let l of light_source) b.light_source.push([l[0], l[1], l[2]]);
    // for (let l of light_source) b.light_source.push([l[0] - b.position[0], l[1] - b.position[1], l[2] - b.position[2]]);
}

var a = .5, b = .25;
function rotate() {
    let rot_y = [
        [Math.cos(a),   0,  Math.sin(a)],
        [0,             1,  0],
        [-Math.sin(a),  0,  Math.cos(a)],
    ], rot_x = [
        [1,0,           0],
        [0,Math.cos(b), -Math.sin(b)],
        [0,Math.sin(b), Math.cos(b)],
    ];

    for (let b of bodies) {
        for (let i in b.coord[0]) {
            // rotating around y
            let temp = { x: b.coord[0][i], y: b.coord[1][i], z: b.coord[2][i] };
            b.coord[0][i] = rot_y[0][0]*temp.x + rot_y[0][2]*temp.z;
            b.coord[2][i] = rot_y[2][0]*temp.x + rot_y[2][2]*temp.z;

            // rotating around x
            temp = { x: b.coord[0][i], y: b.coord[1][i], z: b.coord[2][i] };
            b.coord[1][i] = rot_x[1][1]*temp.y + rot_x[1][2]*temp.z;
            b.coord[2][i] = rot_x[2][1]*temp.y + rot_x[2][2]*temp.z;
        }
    }

    if (Math.hypot(a, b) > Math.hypot(-0.001, -0.0005)) {
        a *= .98;
        b *= .98;
    } else {
        a = -0.001;
        b = -0.0005;
    }
}

function draw() {
    if (a || b) {
        rotate();
        canvas.clearRect(-size/2,-size/2,size,size);

        for (let b of bodies) {
            canvas.translate(b.position[0]*size, b.position[1]*size);
            for (let i in b.faces) {
                let f = b.faces[i];
                let z = 0;
                for (let j of f) z += b.coord[2][j];
                if (z < b.toMe[i]) {
                    // Computing Brightness ------------------------------------------------------------------------------
                    let n = 0;
                    for (let l in b.light_source) {
                        let m = 0;
                        for (let c = 0; c < 3; c++) {
                            let sum = 0;
                            for (let k of f) sum += b.coord[c][k];
                            m += sum / f.length * b.light_source[l][c];
                        }
                        if (m >= 0) n += m / magnitude[l];
                    }
                    n *= b.luminance;
                    // Drawing The Faces-----------------------------------------------------------------------------------
                    canvas.beginPath();
                    let sc = b.scale / (b.position[2] + b.coord[2][f[0]]);
                    canvas.moveTo(b.coord[0][f[0]] * sc, -b.coord[1][f[0]] * sc);
                    for (let k = 1; k < f.length; k++) {
                        let sc = b.scale / (b.position[2] + b.coord[2][f[k]]);
                        canvas.lineTo(b.coord[0][f[k]] * sc, -b.coord[1][f[k]] * sc);
                    }
                    canvas.fillStyle = "rgba(" + Math.floor(n * color[0]) + ", " + Math.floor(n * color[1]) + ", " + Math.floor(n * color[2]) + ")";
                    canvas.closePath();
                    canvas.fill();
                    canvas.strokeStyle = "rgba(" + Math.floor(n * color[0]) + ", " + Math.floor(n * color[1]) + ", " + Math.floor(n * color[2]) + ")";
                    canvas.stroke();
                }
            }
            canvas.translate(-b.position[0]*size, -b.position[1]*size);
        }
    }
}


// Controls ---------------------------------------------------------------------------------------
var posX, posY, pressure = false;
function down(x, y) {
    pressure = true;

    posX = x;
    posY = y;
} function move(x, y) {
    if (pressure) {
        a = -(x - posX) * sensitivity;
        b = -(y - posY) * sensitivity;

        posX = x;
        posY = y;
    }
} function up() { pressure = false; }
setInterval(draw, fps);