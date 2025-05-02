precision mediump float;

uniform float time;
uniform vec3 color;
varying vec2 outTexCoord;

void main() {
    vec2 uv = outTexCoord;

    float borderRatio = 0.045;
    float glowSize = 0.01;

    float edgeX = min(uv.x, 1.0 - uv.x);
    float edgeY = min(uv.y, 1.0 - uv.y);
    float edgeDist = min(edgeX, edgeY);

    float speed = 2.5;
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float glow = 0.5 + 0.5 * cos(angle - time * speed);

    float border = smoothstep(borderRatio, borderRatio + glowSize, edgeDist);

    float intensity = (1.0 - border) * glow;

    vec3 finalColor = color * intensity;

    // ✨ Sadece border çizgisi opak, içi transparan
    gl_FragColor = vec4(finalColor, intensity);
}
