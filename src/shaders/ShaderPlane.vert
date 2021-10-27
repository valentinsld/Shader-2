uniform float uTime;

varying float vElevation;

#pragma glslify: getPerlinNoise3d = require('./getPerlinNoise3d.glsl')

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  float distanceCenter = 1.0 - distance(uv,vec2(0.5)) * 2.0;
  float circled = smoothstep(0.0, 0.2, distanceCenter);
  float elevation = getPerlinNoise3d(vec3(modelPosition.xz, uTime)) * circled;
  gl_Position.y += elevation;

  elevation = step(0.08, mod(elevation, 0.1));
  // varying
  vElevation = elevation;
}