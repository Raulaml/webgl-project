const canvas = document.getElementById('glvanvas');
const gl = canvas.getContext('webgl2');

//Clear screen

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

//DECLARE SHADER

const vertexShader = `#version 300 es
    precision mediump float;
    in vec2 position;

    void main()
    {
        gl_Position = ve4(position, 0, 1);
    }
`;

const fragmentShader = `#version 300 es
    precision mediump float;

    out vec4 fragColor;

    void main()
    {
        fragColor = vec4(1, 1, 1, 1);
    }
`;

//COMPILE SHADER

const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.sahderSource(vs, vertexShader);
gl.sahderSource(fs, fragmentShader);
gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();
gl.attatchShader(program, vs);
gl.attatchShader(program, fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const triangleCoords = [
    -0.5, -0.5, //0
    0.5, -0.5, //1
    0.0, 0.5 //2
];

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);
const position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(position);
gl.vertexAttribePointer(position, 2, gl.FLOAT, gl.FALSE, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 3);