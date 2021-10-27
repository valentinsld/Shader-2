varying float vElevation;

void main()
{
  vec3 color = vec3(vElevation);

  gl_FragColor.rgb = color;
  gl_FragColor.a = vElevation;
}