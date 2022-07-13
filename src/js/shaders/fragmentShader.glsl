uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;
void main() {
  vec4 textrueColor = texture2D(uTexture, vUv);
  textrueColor.rgb *= vElevation * 1.5 + 0.7;
  gl_FragColor = textrueColor;
}