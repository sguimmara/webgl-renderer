#version 100
precision mediump float;

varying highp vec2 texcoords;

uniform sampler2D u_texture;

void main(void) {
    vec4 color = texture2D(u_texture, texcoords);
    vec4 uv = vec4(texcoords, 0, 1);
    gl_FragColor = color;
}
