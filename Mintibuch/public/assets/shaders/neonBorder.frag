precision mediump float;

uniform float time;
varying vec2 outTexCoord;

void main() {
    vec2 uv = outTexCoord;

    // Border kalınlığı (tuş boyutundan bağımsız orantılı)
    float borderRatio = 0.045; // %4.5
    float glowSize = 0.01;     // ışığın yayılma alanı

    // UV kenarına göre normalize edilmiş mesafe (X ve Y orantılı ayrı hesaplanır)
    float edgeX = min(uv.x, 1.0 - uv.x);
    float edgeY = min(uv.y, 1.0 - uv.y);
    float edgeDist = min(edgeX, edgeY);

    float speed = 2.5;
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float movingGlow = 0.5 + 0.5 * cos(angle - time * speed);

    // Border maskesi: sadece kenara yakın çiz
    float border = smoothstep(borderRatio, borderRatio + glowSize, edgeDist);

    vec3 neon = vec3(0.2, 1.0, 0.5);
    vec3 color = neon * (1.0 - border) * movingGlow;

    gl_FragColor = vec4(color, 1.0);
}
