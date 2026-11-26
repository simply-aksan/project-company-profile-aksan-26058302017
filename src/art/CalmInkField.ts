import * as THREE from 'three';

const FULLSCREEN_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const COPY_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  void main() { gl_FragColor = texture2D(uTex, vUv); }
`;

const SPLAT_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float uAspect;
  uniform vec2 uPoint;
  uniform vec3 uValue;
  uniform float uRadius;
  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    float splat = exp(-dot(p, p) / max(0.00002, uRadius));
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat * uValue, 1.0);
  }
`;

const CURL_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
    gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform vec2 uTexelSize;
  uniform float uCurlStrength;
  uniform float uDt;
  void main() {
    float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= uCurlStrength * C;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
  }
`;

const DIVERGENCE_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
  }
`;

const CLEAR_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uValue;
  void main() { gl_FragColor = uValue * texture2D(uTexture, vUv); }
`;

const PRESSURE_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexelSize;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_SUB_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel.xy -= 0.5 * vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

const ADVECT_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uDissipation;
  void main() {
    vec2 coord = clamp(vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize, 0.0, 1.0);
    gl_FragColor = uDissipation * texture2D(uSource, coord);
  }
`;

const PARTICLE_SIM_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPositions;
  uniform sampler2D uOrigins;
  uniform sampler2D uRandoms;
  uniform sampler2D uFluidVelocity;
  uniform sampler2D uFluidDensity;
  uniform mat4 uViewProj;
  uniform mat4 uModel;
  uniform mat3 uCamRot;
  uniform float uTime;
  uniform float uHz;
  uniform float uScroll;

  vec3 snoiseVec3(vec3 x) {
    return vec3(
      sin(x.y * 1.9 + x.z * 1.5) + cos(x.x * 1.1 - x.z * 1.8),
      sin(x.z * 2.0 + x.x * 1.6) + cos(x.y * 1.3 - x.x * 1.7),
      sin(x.x * 2.2 + x.y * 1.2) + cos(x.z * 1.4 - x.y * 1.9)
    ) * 0.5;
  }

  vec3 curlNoise(vec3 p) {
    float e = 0.05;
    vec3 px0 = snoiseVec3(p - vec3(e, 0.0, 0.0)); vec3 px1 = snoiseVec3(p + vec3(e, 0.0, 0.0));
    vec3 py0 = snoiseVec3(p - vec3(0.0, e, 0.0)); vec3 py1 = snoiseVec3(p + vec3(0.0, e, 0.0));
    vec3 pz0 = snoiseVec3(p - vec3(0.0, 0.0, e)); vec3 pz1 = snoiseVec3(p + vec3(0.0, 0.0, e));
    vec3 res = vec3(
      py1.z - py0.z - pz1.y + pz0.y,
      pz1.x - pz0.x - px1.z + px0.z,
      px1.y - px0.y - py1.x + py0.x
    ) / (2.0 * e);
    float len = length(res);
    return len > 0.0001 ? res / len : vec3(0.0);
  }

  float sdFlowRibbon(vec3 p) {
    vec3 q = p;
    q.z = sqrt(q.z * q.z + 0.02) - sqrt(0.012);
    float theta = atan(q.y, q.x);
    float ripple = 0.055 * sin(theta * 2.0 + uTime * 0.28 + uScroll * 1.6) + 0.03 * cos(theta * 3.0 - uTime * 0.2);
    float targetRad = 0.45 + ripple + uScroll * 0.14;
    return length(vec2(length(q.xy) - targetRad, q.z)) - 0.11;
  }

  vec3 sdfNormal(vec3 p) {
    float eps = 0.0025;
    vec3 n = vec3(
      sdFlowRibbon(p + vec3(eps, 0.0, 0.0)) - sdFlowRibbon(p - vec3(eps, 0.0, 0.0)),
      sdFlowRibbon(p + vec3(0.0, eps, 0.0)) - sdFlowRibbon(p - vec3(0.0, eps, 0.0)),
      sdFlowRibbon(p + vec3(0.0, 0.0, eps)) - sdFlowRibbon(p - vec3(0.0, 0.0, eps))
    );
    float l = length(n);
    return l > 0.00001 ? n / l : vec3(0.0, 1.0, 0.0);
  }

  void main() {
    vec3 pos = texture2D(uPositions, vUv).xyz;
    vec3 origin = texture2D(uOrigins, vUv).xyz;
    vec4 rnd = texture2D(uRandoms, vUv);

    if (length(pos) > 0.94) pos *= 0.56;

    // Slow calm ambient breathing boosted subtly with scroll momentum
    pos += curlNoise(pos * 0.15 + uTime * 0.03) * (0.0002 + uScroll * 0.00035) * uHz;

    vec3 grad = sdfNormal(pos);
    float sdf = sdFlowRibbon(pos);
    vec3 dirPos = length(pos) > 0.0001 ? normalize(pos) : vec3(0.0, 1.0, 0.0);

    pos += cross(dirPos, grad) * 0.00065 * min(uHz, 2.0);
    pos += -grad * sdf * 0.055 * min(uHz, 2.0);
    pos += (origin - pos) * 0.0004 * min(uHz, 2.0);

    vec4 clipPos = uViewProj * (uModel * vec4(pos, 1.0));
    if (abs(clipPos.w) > 0.001) {
      vec2 screenUV = (clipPos.xy / clipPos.w) * 0.5 + 0.5;
      if (screenUV.x >= 0.0 && screenUV.x <= 1.0 && screenUV.y >= 0.0 && screenUV.y <= 1.0) {
        vec2 fVel = texture2D(uFluidVelocity, screenUV).xy;
        vec3 dSamp = texture2D(uFluidDensity, screenUV).rgb;
        float mask = max(dSamp.r, max(dSamp.g, dSamp.b));
        vec3 flowWorld = uCamRot * vec3(fVel, 0.0);
        pos += flowWorld * 0.0002 * uHz * mask * (0.65 + rnd.x * 0.65);
      }
    }

    gl_FragColor = vec4(pos, 1.0);
  }
`;

const INK_RENDER_VERT = `
  attribute vec4 aRandom;
  varying vec4 vRandom;
  uniform sampler2D uPositions;
  uniform float uDpr;

  void main() {
    vRandom = aRandom;
    vec3 pos = texture2D(uPositions, position.xy).xyz;
    pos *= mix(1.0, 1.28, pow(aRandom.y, 90.0));
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    float viewDist = max(0.3, -mvPos.z);
    float scale = mix(0.65, 1.15, aRandom.z);
    gl_PointSize = clamp(0.038 * uDpr * 2.0 * scale * (960.0 / viewDist) * 0.24, 1.3, 8.5);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const INK_RENDER_FRAG = `
  precision highp float;
  varying vec4 vRandom;
  uniform float uTime;
  uniform float uFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    // Charcoal mineral sumi-e pigment with subtle copper mineral warmth
    vec3 charcoal = vec3(0.09, 0.11, 0.14);
    vec3 slate = vec3(0.24, 0.27, 0.34);
    vec3 copper = vec3(0.56, 0.30, 0.18);

    vec3 col = mix(charcoal, slate, vRandom.x * 0.68);
    float copperMask = step(0.82, vRandom.w);
    col = mix(col, copper, copperMask * 0.62);

    float breathe = 0.78 + 0.22 * sin(uTime * 1.4 + vRandom.y * 16.0);
    float alpha = smoothstep(0.5, 0.06, d) * 0.56 * breathe * uFade;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface DoubleFBO {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  dispose: () => void;
}

/**
 * Daylight WebGL ink & fluid particle field for AksanLab Hero.
 * Pauses automatically offscreen/hidden, throttles pointer splats,
 * and couples smoothly to page scroll progression.
 */
export class CalmInkField {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  private quadScene = new THREE.Scene();
  private quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quadMesh: THREE.Mesh;

  private simSize: number;
  private velFBO: DoubleFBO;
  private dyeFBO: DoubleFBO;
  private pressureFBO: DoubleFBO;
  private curlFBO: THREE.WebGLRenderTarget;
  private divFBO: THREE.WebGLRenderTarget;
  private posFBO: DoubleFBO;
  private originTex: THREE.DataTexture;
  private randomTex: THREE.DataTexture;

  private copyMat: THREE.ShaderMaterial;
  private splatMat: THREE.ShaderMaterial;
  private curlMat: THREE.ShaderMaterial;
  private vorticityMat: THREE.ShaderMaterial;
  private divMat: THREE.ShaderMaterial;
  private clearMat: THREE.ShaderMaterial;
  private pressureMat: THREE.ShaderMaterial;
  private gradSubMat: THREE.ShaderMaterial;
  private advectMat: THREE.ShaderMaterial;
  private particleSimMat: THREE.ShaderMaterial;
  private particleRenderMat: THREE.ShaderMaterial;

  private viewProjMat = new THREE.Matrix4();
  private camRotMat = new THREE.Matrix3();
  private cloudGroup = new THREE.Group();

  private ptrX = 0.5;
  private ptrY = 0.5;
  private lastPtrX = 0.5;
  private lastPtrY = 0.5;
  private ptrDx = 0;
  private ptrDy = 0;
  private ptrDirty = false;
  private lastMoveTs = 0;
  private gazeX = 0;
  private gazeY = 0;
  private scrollProgress = 0;

  private observer: IntersectionObserver | null = null;
  private inViewport = true;
  private startTime = performance.now();
  private lastFrameTs = performance.now();
  private rafId: number | null = null;
  private reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  private disposed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || 640;
    const isMobile = w <= 780;
    this.simSize = isMobile ? 112 : 192;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, w / Math.max(1, h), 0.1, 60);
    this.camera.position.set(0, 0, 12.0);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';
    container.appendChild(this.renderer.domElement);

    const gl = this.renderer.getContext();
    const rtType =
      Boolean(gl.getExtension('EXT_color_buffer_float')) ||
      Boolean(gl.getExtension('EXT_color_buffer_half_float'))
        ? THREE.HalfFloatType
        : THREE.UnsignedByteType;
    const posType = gl.getExtension('EXT_color_buffer_float')
      ? THREE.FloatType
      : THREE.HalfFloatType;

    const makeFBO = (rw: number, rh: number, lin: boolean, tp: THREE.TextureDataType) =>
      new THREE.WebGLRenderTarget(rw, rh, {
        minFilter: lin ? THREE.LinearFilter : THREE.NearestFilter,
        magFilter: lin ? THREE.LinearFilter : THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: tp,
        depthBuffer: false,
        stencilBuffer: false,
      });

    const makeDouble = (rw: number, rh: number, lin: boolean, tp: THREE.TextureDataType): DoubleFBO => {
      const fbo: DoubleFBO = {
        read: makeFBO(rw, rh, lin, tp),
        write: makeFBO(rw, rh, lin, tp),
        swap() {
          const tmp = fbo.read;
          fbo.read = fbo.write;
          fbo.write = tmp;
        },
        dispose() {
          fbo.read.dispose();
          fbo.write.dispose();
        },
      };
      return fbo;
    };

    const simRes = 160;
    const dyeRes = 256;
    this.velFBO = makeDouble(simRes, simRes, true, rtType);
    this.dyeFBO = makeDouble(dyeRes, dyeRes, true, rtType);
    this.pressureFBO = makeDouble(simRes, simRes, false, rtType);
    this.curlFBO = makeFBO(simRes, simRes, false, rtType);
    this.divFBO = makeFBO(simRes, simRes, false, rtType);
    this.posFBO = makeDouble(this.simSize, this.simSize, false, posType);

    const ptsCount = this.simSize * this.simSize;
    const originArr = new Float32Array(ptsCount * 4);
    const randArr = new Float32Array(ptsCount * 4);
    for (let i = 0; i < ptsCount; i++) {
      originArr[i * 4] = (Math.random() * 2 - 1) * 0.7;
      originArr[i * 4 + 1] = (Math.random() * 2 - 1) * 0.7;
      originArr[i * 4 + 2] = (Math.random() * 2 - 1) * 0.7;
      originArr[i * 4 + 3] = 1;
      randArr[i * 4] = Math.random();
      randArr[i * 4 + 1] = Math.random();
      randArr[i * 4 + 2] = Math.random();
      randArr[i * 4 + 3] = Math.random();
    }

    this.originTex = new THREE.DataTexture(originArr, this.simSize, this.simSize, THREE.RGBAFormat, THREE.FloatType);
    this.originTex.needsUpdate = true;
    this.randomTex = new THREE.DataTexture(randArr, this.simSize, this.simSize, THREE.RGBAFormat, THREE.FloatType);
    this.randomTex.needsUpdate = true;

    const simTexel = new THREE.Vector2(1 / simRes, 1 / simRes);
    const dyeTexel = new THREE.Vector2(1 / dyeRes, 1 / dyeRes);

    this.copyMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COPY_FRAG,
      uniforms: { uTex: { value: this.originTex } },
      depthTest: false,
      depthWrite: false,
    });
    this.splatMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: SPLAT_FRAG,
      uniforms: {
        uTarget: { value: null },
        uAspect: { value: w / Math.max(1, h) },
        uPoint: { value: new THREE.Vector2(0.5, 0.5) },
        uValue: { value: new THREE.Vector3() },
        uRadius: { value: 0.008 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.curlMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: CURL_FRAG,
      uniforms: { uVelocity: { value: null }, uTexelSize: { value: simTexel } },
      depthTest: false,
      depthWrite: false,
    });
    this.vorticityMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: VORTICITY_FRAG,
      uniforms: {
        uVelocity: { value: null },
        uCurl: { value: null },
        uTexelSize: { value: simTexel },
        uCurlStrength: { value: 22.0 },
        uDt: { value: 1 / 60 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.divMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: DIVERGENCE_FRAG,
      uniforms: { uVelocity: { value: null }, uTexelSize: { value: simTexel } },
      depthTest: false,
      depthWrite: false,
    });
    this.clearMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: CLEAR_FRAG,
      uniforms: { uTexture: { value: null }, uValue: { value: 0.94 } },
      depthTest: false,
      depthWrite: false,
    });
    this.pressureMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: PRESSURE_FRAG,
      uniforms: { uPressure: { value: null }, uDivergence: { value: null }, uTexelSize: { value: simTexel } },
      depthTest: false,
      depthWrite: false,
    });
    this.gradSubMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: GRADIENT_SUB_FRAG,
      uniforms: { uPressure: { value: null }, uVelocity: { value: null }, uTexelSize: { value: simTexel } },
      depthTest: false,
      depthWrite: false,
    });
    this.advectMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: ADVECT_FRAG,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: simTexel },
        uDt: { value: 1 / 60 },
        uDissipation: { value: 0.98 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.advectMat.userData = { simTexel, dyeTexel };

    this.particleSimMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: PARTICLE_SIM_FRAG,
      uniforms: {
        uPositions: { value: null },
        uOrigins: { value: this.originTex },
        uRandoms: { value: this.randomTex },
        uFluidVelocity: { value: null },
        uFluidDensity: { value: null },
        uViewProj: { value: new THREE.Matrix4() },
        uModel: { value: new THREE.Matrix4() },
        uCamRot: { value: new THREE.Matrix3() },
        uTime: { value: 0 },
        uHz: { value: 1 },
        uScroll: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.copyMat);
    this.quadScene.add(this.quadMesh);
    this.blit(this.posFBO.read, this.copyMat);
    this.blit(this.posFBO.write, this.copyMat);

    const ptCoords = new Float32Array(ptsCount * 3);
    for (let j = 0; j < this.simSize; j++) {
      for (let i = 0; i < this.simSize; i++) {
        const k = j * this.simSize + i;
        ptCoords[k * 3] = (i + 0.5) / this.simSize;
        ptCoords[k * 3 + 1] = (j + 0.5) / this.simSize;
        ptCoords[k * 3 + 2] = 0;
      }
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptCoords, 3));
    ptGeo.setAttribute('aRandom', new THREE.BufferAttribute(randArr, 4));

    this.particleRenderMat = new THREE.ShaderMaterial({
      vertexShader: INK_RENDER_VERT,
      fragmentShader: INK_RENDER_FRAG,
      uniforms: {
        uPositions: { value: this.posFBO.read.texture },
        uTime: { value: 0 },
        uDpr: { value: dpr },
        uFade: { value: 1 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const points = new THREE.Points(ptGeo, this.particleRenderMat);
    points.frustumCulled = false;
    this.cloudGroup.add(points);
    this.updateCloudFraming(w);
    this.scene.add(this.cloudGroup);

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibility);
    this.renderer.domElement.addEventListener('webglcontextlost', this.handleContextLost);

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          this.inViewport = entry ? entry.isIntersecting : true;
          this.syncLoopState();
        },
        { threshold: 0.01 }
      );
      this.observer.observe(container);
    }

    if (this.reducedMotion) {
      for (let i = 0; i < 12; i++) this.stepFrame(1 / 60, i * 0.05);
      this.renderer.render(this.scene, this.camera);
    } else {
      this.syncLoopState();
    }
  }

  public setScrollProgress(p: number) {
    this.scrollProgress = Math.max(0, Math.min(1, p));
  }

  private handleContextLost = (e: Event) => {
    e.preventDefault();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };

  private handleVisibility = () => {
    this.syncLoopState();
  };

  private syncLoopState() {
    if (this.disposed || this.reducedMotion) return;
    const shouldRun = this.inViewport && !document.hidden;
    if (shouldRun && this.rafId === null) {
      this.lastFrameTs = performance.now();
      this.animate();
    } else if (!shouldRun && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private updateCloudFraming(w: number) {
    if (w >= 960) {
      this.cloudGroup.position.set(2.15, 0.1, -1.4);
      this.cloudGroup.scale.setScalar(5.4);
    } else {
      this.cloudGroup.position.set(0.35, -0.35, -2.0);
      this.cloudGroup.scale.setScalar(4.4);
    }
  }

  private blit(target: THREE.WebGLRenderTarget | null, mat: THREE.ShaderMaterial) {
    this.quadMesh.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCam);
    this.renderer.setRenderTarget(null);
  }

  private stepFluid() {
    const dt = 1 / 60;
    const { simTexel, dyeTexel } = this.advectMat.userData as {
      simTexel: THREE.Vector2;
      dyeTexel: THREE.Vector2;
    };

    if (this.ptrDirty) {
      const lenPx = Math.hypot(this.ptrDx, this.ptrDy);
      if (lenPx > 0.01) {
        const rect = this.container.getBoundingClientRect();
        const mult = Math.min(7, (lenPx / 16) * 7);
        this.splatMat.uniforms.uAspect.value = rect.width / Math.max(1, rect.height);
        this.splatMat.uniforms.uPoint.value.set(this.ptrX, this.ptrY);
        this.splatMat.uniforms.uRadius.value = 0.008;

        this.splatMat.uniforms.uTarget.value = this.velFBO.read.texture;
        this.splatMat.uniforms.uValue.value.set(this.ptrDx * mult * 0.22, -this.ptrDy * mult * 0.22, 0);
        this.blit(this.velFBO.write, this.splatMat);
        this.velFBO.swap();

        this.splatMat.uniforms.uTarget.value = this.dyeFBO.read.texture;
        this.splatMat.uniforms.uValue.value.set(1, 1, 1);
        this.blit(this.dyeFBO.write, this.splatMat);
        this.dyeFBO.swap();
      }
      this.ptrDirty = false;
      this.ptrDx = 0;
      this.ptrDy = 0;
    }

    this.curlMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.blit(this.curlFBO, this.curlMat);

    this.vorticityMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.vorticityMat.uniforms.uCurl.value = this.curlFBO.texture;
    this.vorticityMat.uniforms.uDt.value = dt;
    this.blit(this.velFBO.write, this.vorticityMat);
    this.velFBO.swap();

    this.divMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.blit(this.divFBO, this.divMat);

    this.clearMat.uniforms.uTexture.value = this.pressureFBO.read.texture;
    this.blit(this.pressureFBO.write, this.clearMat);
    this.pressureFBO.swap();

    this.pressureMat.uniforms.uDivergence.value = this.divFBO.texture;
    for (let i = 0; i < 6; i++) {
      this.pressureMat.uniforms.uPressure.value = this.pressureFBO.read.texture;
      this.blit(this.pressureFBO.write, this.pressureMat);
      this.pressureFBO.swap();
    }

    this.gradSubMat.uniforms.uPressure.value = this.pressureFBO.read.texture;
    this.gradSubMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.blit(this.velFBO.write, this.gradSubMat);
    this.velFBO.swap();

    this.advectMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.advectMat.uniforms.uSource.value = this.velFBO.read.texture;
    this.advectMat.uniforms.uTexelSize.value = simTexel;
    this.advectMat.uniforms.uDissipation.value = 0.98;
    this.blit(this.velFBO.write, this.advectMat);
    this.velFBO.swap();

    this.advectMat.uniforms.uVelocity.value = this.velFBO.read.texture;
    this.advectMat.uniforms.uSource.value = this.dyeFBO.read.texture;
    this.advectMat.uniforms.uTexelSize.value = dyeTexel;
    this.advectMat.uniforms.uDissipation.value = 0.97;
    this.blit(this.dyeFBO.write, this.advectMat);
    this.dyeFBO.swap();
  }

  private stepFrame(dt: number, elapsed: number) {
    const hz = dt * 60;
    this.camera.position.x += (-this.gazeX * 0.32 - this.camera.position.x) * 0.04;
    this.camera.position.y += (this.gazeY * 0.22 - this.scrollProgress * 0.55 - this.camera.position.y) * 0.04;
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();

    this.cloudGroup.rotation.set(
      -0.36 + this.scrollProgress * 0.14,
      0.28 + Math.sin(elapsed * 0.14) * 0.14 + this.scrollProgress * 0.45,
      0.06
    );
    this.cloudGroup.updateMatrixWorld();

    this.stepFluid();

    this.viewProjMat.multiplyMatrices(
      this.camera.projectionMatrix,
      this.camera.matrixWorldInverse
    );
    this.camRotMat.setFromMatrix4(this.camera.matrixWorld);

    this.particleSimMat.uniforms.uPositions.value = this.posFBO.read.texture;
    this.particleSimMat.uniforms.uFluidVelocity.value = this.velFBO.read.texture;
    this.particleSimMat.uniforms.uFluidDensity.value = this.dyeFBO.read.texture;
    this.particleSimMat.uniforms.uViewProj.value.copy(this.viewProjMat);
    this.particleSimMat.uniforms.uModel.value.copy(this.cloudGroup.matrixWorld);
    this.particleSimMat.uniforms.uCamRot.value.copy(this.camRotMat);
    this.particleSimMat.uniforms.uTime.value = elapsed;
    this.particleSimMat.uniforms.uHz.value = hz;
    this.particleSimMat.uniforms.uScroll.value = this.scrollProgress;

    this.blit(this.posFBO.write, this.particleSimMat);
    this.posFBO.swap();

    this.particleRenderMat.uniforms.uPositions.value = this.posFBO.read.texture;
    this.particleRenderMat.uniforms.uTime.value = elapsed;
    this.particleRenderMat.uniforms.uFade.value = Math.max(0.22, 1 - this.scrollProgress * 0.72);
  }

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.inViewport) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const nx = (e.clientX - rect.left) / rect.width;
    const ny = 1 - (e.clientY - rect.top) / rect.height;

    this.gazeX = Math.max(-1, Math.min(1, nx * 2 - 1));
    this.gazeY = Math.max(-1, Math.min(1, ny * 2 - 1));

    if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
      const now = performance.now();
      if (now - this.lastMoveTs > 50) {
        this.lastPtrX = nx;
        this.lastPtrY = ny;
      }
      this.ptrDx = (nx - this.lastPtrX) * rect.width;
      this.ptrDy = ((1 - ny) - (1 - this.lastPtrY)) * rect.height;
      this.ptrX = nx;
      this.ptrY = ny;
      this.lastPtrX = nx;
      this.lastPtrY = ny;
      this.lastMoveTs = now;
      this.ptrDirty = true;
    }
  };

  private handleResize = () => {
    if (this.disposed) return;
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || 640;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.updateCloudFraming(w);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.particleRenderMat.uniforms.uDpr.value = dpr;
    if (this.reducedMotion) this.renderer.render(this.scene, this.camera);
  };

  private animate = () => {
    if (this.disposed || !this.inViewport || document.hidden) {
      this.rafId = null;
      return;
    }
    this.rafId = requestAnimationFrame(this.animate);
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - this.lastFrameTs) / 1000));
    this.lastFrameTs = now;
    const elapsed = (now - this.startTime) / 1000;

    this.stepFrame(dt, elapsed);
    this.renderer.render(this.scene, this.camera);
  };

  public dispose() {
    this.disposed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.observer?.disconnect();
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost);

    this.velFBO.dispose();
    this.dyeFBO.dispose();
    this.pressureFBO.dispose();
    this.curlFBO.dispose();
    this.divFBO.dispose();
    this.posFBO.dispose();
    this.originTex.dispose();
    this.randomTex.dispose();
    this.copyMat.dispose();
    this.splatMat.dispose();
    this.curlMat.dispose();
    this.vorticityMat.dispose();
    this.divMat.dispose();
    this.clearMat.dispose();
    this.pressureMat.dispose();
    this.gradSubMat.dispose();
    this.advectMat.dispose();
    this.particleSimMat.dispose();
    this.particleRenderMat.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
