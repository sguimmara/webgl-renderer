#version 100
attribute vec3 a_position;
attribute vec2 a_texcoords;

varying vec2 texcoords;

void main(void) {
    gl_Position = vec4(a_position, 1.0);
    texcoords = a_texcoords;
}
