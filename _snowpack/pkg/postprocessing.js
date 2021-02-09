import { C as Camera, a as Color, W as WebGLMultisampleRenderTarget, U as UnsignedByteType, V as Vector2, D as DepthTexture, b as DepthStencilFormat, c as UnsignedInt248Type, d as UnsignedIntType, e as WebGLRenderTarget, f as Uniform, L as LinearFilter, R as RGBFormat, g as Vector3, M as Matrix4, h as RGBAFormat, T as Texture, N as NearestFilter, i as Loader, S as ShaderMaterial, j as NoBlending, P as PerspectiveCamera, k as Scene, l as Mesh, B as BackSide, m as DoubleSide, F as FrontSide, E as EventDispatcher, n as LuminanceFormat, o as LoadingManager, p as BufferGeometry, q as BufferAttribute } from './common/three.module-1fff554e.js';

/**
 * postprocessing v6.20.3 build Mon Feb 01 2021
 * https://github.com/vanruesc/postprocessing
 * Copyright 2021 Raoul van Rüschen
 * @license Zlib
 */

// src/materials/glsl/common/shader.vert
var shader_default2 = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n	vUv = position.xy * 0.5 + 0.5;\r\n	gl_Position = vec4(position.xy, 1.0, 1.0);\r\n\r\n}\r\n";

// src/materials/glsl/edge-detection/shader.frag
var shader_default5 = "varying vec2 vUv;\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\n\r\n#if EDGE_DETECTION_MODE != 0\r\n\r\n	varying vec2 vUv2;\r\n	varying vec2 vUv3;\r\n	varying vec2 vUv4;\r\n	varying vec2 vUv5;\r\n\r\n#endif\r\n\r\n#if EDGE_DETECTION_MODE == 1\r\n\r\n	#include <common>\r\n\r\n#endif\r\n\r\n#if EDGE_DETECTION_MODE == 0 || PREDICATION_MODE == 1\r\n\r\n	#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n\r\n		uniform highp sampler2D depthBuffer;\r\n\r\n	#else\r\n\r\n		uniform mediump sampler2D depthBuffer;\r\n\r\n	#endif\r\n\r\n	float readDepth(const in vec2 uv) {\r\n\r\n		#if DEPTH_PACKING == 3201\r\n\r\n			return unpackRGBAToDepth(texture2D(depthBuffer, uv));\r\n\r\n		#else\r\n\r\n			return texture2D(depthBuffer, uv).r;\r\n\r\n		#endif\r\n\r\n	}\r\n\r\n	vec3 gatherNeighbors() {\r\n\r\n		float p = readDepth(vUv);\r\n		float pLeft = readDepth(vUv0);\r\n		float pTop = readDepth(vUv1);\r\n\r\n		return vec3(p, pLeft, pTop);\r\n\r\n	}\r\n\r\n#elif PREDICATION_MODE == 2\r\n\r\n	uniform sampler2D predicationBuffer;\r\n\r\n	vec3 gatherNeighbors() {\r\n\r\n		float p = texture2D(predicationBuffer, vUv).r;\r\n		float pLeft = texture2D(predicationBuffer, vUv0).r;\r\n		float pTop = texture2D(predicationBuffer, vUv1).r;\r\n\r\n		return vec3(p, pLeft, pTop);\r\n\r\n	}\r\n\r\n#endif\r\n\r\n#if PREDICATION_MODE != 0\r\n\r\n	vec2 calculatePredicatedThreshold() {\r\n\r\n		vec3 neighbours = gatherNeighbors();\r\n		vec2 delta = abs(neighbours.xx - neighbours.yz);\r\n		vec2 edges = step(PREDICATION_THRESHOLD, delta);\r\n\r\n		return PREDICATION_SCALE * EDGE_THRESHOLD * (1.0 - PREDICATION_STRENGTH * edges);\r\n\r\n	}\r\n\r\n#endif\r\n\r\n#if EDGE_DETECTION_MODE != 0\r\n\r\n	uniform sampler2D inputBuffer;\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n	#if EDGE_DETECTION_MODE == 0\r\n\r\n		const vec2 threshold = vec2(DEPTH_THRESHOLD);\r\n\r\n	#elif PREDICATION_MODE != 0\r\n\r\n		vec2 threshold = calculatePredicatedThreshold();\r\n\r\n	#else\r\n\r\n		const vec2 threshold = vec2(EDGE_THRESHOLD);\r\n\r\n	#endif\r\n\r\n	#if EDGE_DETECTION_MODE == 0\r\n\r\n		// Depth-based edge detection.\r\n\r\n		vec3 neighbors = gatherNeighbors();\r\n		vec2 delta = abs(neighbors.xx - vec2(neighbors.y, neighbors.z));\r\n		vec2 edges = step(threshold, delta);\r\n\r\n		if(dot(edges, vec2(1.0)) == 0.0) {\r\n\r\n			discard;\r\n\r\n		}\r\n\r\n		gl_FragColor = vec4(edges, 0.0, 1.0);\r\n\r\n	#elif EDGE_DETECTION_MODE == 1\r\n\r\n		// Luma-based edge detection.\r\n\r\n		float l = linearToRelativeLuminance(texture2D(inputBuffer, vUv).rgb);\r\n		float lLeft = linearToRelativeLuminance(texture2D(inputBuffer, vUv0).rgb);\r\n		float lTop  = linearToRelativeLuminance(texture2D(inputBuffer, vUv1).rgb);\r\n\r\n		vec4 delta;\r\n		delta.xy = abs(l - vec2(lLeft, lTop));\r\n\r\n		vec2 edges = step(threshold, delta.xy);\r\n\r\n		if(dot(edges, vec2(1.0)) == 0.0) {\r\n\r\n			discard;\r\n\r\n		}\r\n\r\n		// Calculate right and bottom deltas.\r\n		float lRight = linearToRelativeLuminance(texture2D(inputBuffer, vUv2).rgb);\r\n		float lBottom  = linearToRelativeLuminance(texture2D(inputBuffer, vUv3).rgb);\r\n		delta.zw = abs(l - vec2(lRight, lBottom));\r\n\r\n		// Calculate the maximum delta in the direct neighborhood.\r\n		vec2 maxDelta = max(delta.xy, delta.zw);\r\n\r\n		// Calculate left-left and top-top deltas.\r\n		float lLeftLeft = linearToRelativeLuminance(texture2D(inputBuffer, vUv4).rgb);\r\n		float lTopTop = linearToRelativeLuminance(texture2D(inputBuffer, vUv5).rgb);\r\n		delta.zw = abs(vec2(lLeft, lTop) - vec2(lLeftLeft, lTopTop));\r\n\r\n		// Calculate the final maximum delta.\r\n		maxDelta = max(maxDelta.xy, delta.zw);\r\n		float finalDelta = max(maxDelta.x, maxDelta.y);\r\n\r\n		// Local contrast adaptation.\r\n		edges.xy *= step(finalDelta, LOCAL_CONTRAST_ADAPTATION_FACTOR * delta.xy);\r\n\r\n		gl_FragColor = vec4(edges, 0.0, 1.0);\r\n\r\n	#elif EDGE_DETECTION_MODE == 2\r\n\r\n		// Chroma-based edge detection.\r\n\r\n		vec4 delta;\r\n		vec3 c = texture2D(inputBuffer, vUv).rgb;\r\n\r\n		vec3 cLeft = texture2D(inputBuffer, vUv0).rgb;\r\n		vec3 t = abs(c - cLeft);\r\n		delta.x = max(max(t.r, t.g), t.b);\r\n\r\n		vec3 cTop = texture2D(inputBuffer, vUv1).rgb;\r\n		t = abs(c - cTop);\r\n		delta.y = max(max(t.r, t.g), t.b);\r\n\r\n		vec2 edges = step(threshold, delta.xy);\r\n\r\n		if(dot(edges, vec2(1.0)) == 0.0) {\r\n\r\n			discard;\r\n\r\n		}\r\n\r\n		// Calculate right and bottom deltas.\r\n		vec3 cRight = texture2D(inputBuffer, vUv2).rgb;\r\n		t = abs(c - cRight);\r\n		delta.z = max(max(t.r, t.g), t.b);\r\n\r\n		vec3 cBottom = texture2D(inputBuffer, vUv3).rgb;\r\n		t = abs(c - cBottom);\r\n		delta.w = max(max(t.r, t.g), t.b);\r\n\r\n		// Calculate the maximum delta in the direct neighborhood.\r\n		vec2 maxDelta = max(delta.xy, delta.zw);\r\n\r\n		// Calculate left-left and top-top deltas.\r\n		vec3 cLeftLeft = texture2D(inputBuffer, vUv4).rgb;\r\n		t = abs(c - cLeftLeft);\r\n		delta.z = max(max(t.r, t.g), t.b);\r\n\r\n		vec3 cTopTop = texture2D(inputBuffer, vUv5).rgb;\r\n		t = abs(c - cTopTop);\r\n		delta.w = max(max(t.r, t.g), t.b);\r\n\r\n		// Calculate the final maximum delta.\r\n		maxDelta = max(maxDelta.xy, delta.zw);\r\n		float finalDelta = max(maxDelta.x, maxDelta.y);\r\n\r\n		// Local contrast adaptation.\r\n		edges *= step(finalDelta, LOCAL_CONTRAST_ADAPTATION_FACTOR * delta.xy);\r\n\r\n		gl_FragColor = vec4(edges, 0.0, 1.0);\r\n\r\n	#endif\r\n\r\n}\r\n";

// src/materials/glsl/edge-detection/shader.vert
var shader_default6 = "uniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\n\r\n#if EDGE_DETECTION_MODE != 0\r\n\r\n	varying vec2 vUv2;\r\n	varying vec2 vUv3;\r\n	varying vec2 vUv4;\r\n	varying vec2 vUv5;\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n	vUv = position.xy * 0.5 + 0.5;\r\n\r\n	// Left and top texel coordinates.\r\n	vUv0 = vUv + texelSize * vec2(-1.0, 0.0);\r\n	vUv1 = vUv + texelSize * vec2(0.0, -1.0);\r\n\r\n	#if EDGE_DETECTION_MODE != 0\r\n\r\n		// Right and bottom texel coordinates.\r\n		vUv2 = vUv + texelSize * vec2(1.0, 0.0);\r\n		vUv3 = vUv + texelSize * vec2(0.0, 1.0);\r\n\r\n		// Left-left and top-top texel coordinates.\r\n		vUv4 = vUv + texelSize * vec2(-2.0, 0.0);\r\n		vUv5 = vUv + texelSize * vec2(0.0, -2.0);\r\n\r\n	#endif\r\n\r\n	gl_Position = vec4(position.xy, 1.0, 1.0);\r\n\r\n}\r\n";

// src/materials/glsl/convolution/shader.frag
var shader_default7 = "#include <common>\r\n#include <dithering_pars_fragment>\r\n\r\nuniform sampler2D inputBuffer;\r\n\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\nvarying vec2 vUv2;\r\nvarying vec2 vUv3;\r\n\r\nvoid main() {\r\n\r\n	// Sample top left texel.\r\n	vec4 sum = texture2D(inputBuffer, vUv0);\r\n\r\n	// Sample top right texel.\r\n	sum += texture2D(inputBuffer, vUv1);\r\n\r\n	// Sample bottom right texel.\r\n	sum += texture2D(inputBuffer, vUv2);\r\n\r\n	// Sample bottom left texel.\r\n	sum += texture2D(inputBuffer, vUv3);\r\n\r\n	// Compute the average.\r\n	gl_FragColor = sum * 0.25;\r\n\r\n	#include <dithering_fragment>\r\n\r\n}\r\n";

// src/materials/glsl/convolution/shader.vert
var shader_default8 = "uniform vec2 texelSize;\r\nuniform vec2 halfTexelSize;\r\nuniform float kernel;\r\nuniform float scale;\r\n\r\n/* Packing multiple texture coordinates into one varying and using a swizzle to\r\nextract them in the fragment shader still causes a dependent texture read. */\r\nvarying vec2 vUv0;\r\nvarying vec2 vUv1;\r\nvarying vec2 vUv2;\r\nvarying vec2 vUv3;\r\n\r\nvoid main() {\r\n\r\n	vec2 uv = position.xy * 0.5 + 0.5;\r\n	vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;\r\n\r\n	vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);\r\n	vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);\r\n	vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);\r\n	vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);\r\n\r\n	gl_Position = vec4(position.xy, 1.0, 1.0);\r\n\r\n}\r\n";

// src/materials/ConvolutionMaterial.js
var ConvolutionMaterial = class extends ShaderMaterial {
  constructor(texelSize = new Vector2()) {
    super({
      type: "ConvolutionMaterial",
      uniforms: {
        inputBuffer: new Uniform(null),
        texelSize: new Uniform(new Vector2()),
        halfTexelSize: new Uniform(new Vector2()),
        kernel: new Uniform(0),
        scale: new Uniform(1)
      },
      fragmentShader: shader_default7,
      vertexShader: shader_default8,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
    this.setTexelSize(texelSize.x, texelSize.y);
    this.kernelSize = KernelSize.LARGE;
  }
  getKernel() {
    return kernelPresets[this.kernelSize];
  }
  setTexelSize(x, y) {
    this.uniforms.texelSize.value.set(x, y);
    this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5);
  }
};
var kernelPresets = [
  new Float32Array([0, 0]),
  new Float32Array([0, 1, 1]),
  new Float32Array([0, 1, 1, 2]),
  new Float32Array([0, 1, 2, 2, 3]),
  new Float32Array([0, 1, 2, 3, 4, 4, 5]),
  new Float32Array([0, 1, 2, 3, 4, 5, 7, 8, 9, 10])
];
var KernelSize = {
  VERY_SMALL: 0,
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  VERY_LARGE: 4,
  HUGE: 5
};

// src/materials/glsl/copy/shader.frag
var shader_default9 = "uniform sampler2D inputBuffer;\r\nuniform float opacity;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n	vec4 texel = texture2D(inputBuffer, vUv);\r\n	gl_FragColor = opacity * texel;\r\n\r\n	#include <encodings_fragment>\r\n\r\n}\r\n";

// src/materials/CopyMaterial.js
var CopyMaterial = class extends ShaderMaterial {
  constructor() {
    super({
      type: "CopyMaterial",
      uniforms: {
        inputBuffer: new Uniform(null),
        opacity: new Uniform(1)
      },
      fragmentShader: shader_default9,
      vertexShader: shader_default2,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
  }
};
var EdgeDetectionMaterial = class extends ShaderMaterial {
  constructor(texelSize = new Vector2(), mode = EdgeDetectionMode.COLOR) {
    super({
      type: "EdgeDetectionMaterial",
      defines: {
        LOCAL_CONTRAST_ADAPTATION_FACTOR: "2.0",
        EDGE_THRESHOLD: "0.1",
        DEPTH_THRESHOLD: "0.01",
        PREDICATION_MODE: "0",
        PREDICATION_THRESHOLD: "0.01",
        PREDICATION_SCALE: "2.0",
        PREDICATION_STRENGTH: "1.0",
        DEPTH_PACKING: "0"
      },
      uniforms: {
        inputBuffer: new Uniform(null),
        depthBuffer: new Uniform(null),
        predicationBuffer: new Uniform(null),
        texelSize: new Uniform(texelSize)
      },
      fragmentShader: shader_default5,
      vertexShader: shader_default6,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
    this.setEdgeDetectionMode(mode);
  }
  get depthPacking() {
    return Number(this.defines.DEPTH_PACKING);
  }
  set depthPacking(value) {
    this.defines.DEPTH_PACKING = value.toFixed(0);
    this.needsUpdate = true;
  }
  setEdgeDetectionMode(mode) {
    this.defines.EDGE_DETECTION_MODE = mode.toFixed(0);
    this.needsUpdate = true;
  }
  setLocalContrastAdaptationFactor(factor) {
    this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR = factor.toFixed("6");
    this.needsUpdate = true;
  }
  setEdgeDetectionThreshold(threshold) {
    this.defines.EDGE_THRESHOLD = threshold.toFixed("6");
    this.defines.DEPTH_THRESHOLD = (threshold * 0.1).toFixed("6");
    this.needsUpdate = true;
  }
  setPredicationMode(mode) {
    this.defines.PREDICATION_MODE = mode.toFixed(0);
    this.needsUpdate = true;
  }
  setPredicationBuffer(predicationBuffer) {
    this.uniforms.predicationBuffer.value = predicationBuffer;
  }
  setPredicationThreshold(threshold) {
    this.defines.PREDICATION_THRESHOLD = threshold.toFixed("6");
    this.needsUpdate = true;
  }
  setPredicationScale(scale) {
    this.defines.PREDICATION_SCALE = scale.toFixed("6");
    this.needsUpdate = true;
  }
  setPredicationStrength(strength) {
    this.defines.PREDICATION_STRENGTH = strength.toFixed("6");
    this.needsUpdate = true;
  }
};
var EdgeDetectionMode = {
  DEPTH: 0,
  LUMA: 1,
  COLOR: 2
};

// src/materials/glsl/effect/shader.frag
var shader_default15 = "#include <common>\r\n#include <packing>\r\n#include <dithering_pars_fragment>\r\n\r\nuniform sampler2D inputBuffer;\r\n\r\n#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n\r\n	uniform highp sampler2D depthBuffer;\r\n\r\n#else\r\n\r\n	uniform mediump sampler2D depthBuffer;\r\n\r\n#endif\r\n\r\nuniform vec2 resolution;\r\nuniform vec2 texelSize;\r\n\r\nuniform float cameraNear;\r\nuniform float cameraFar;\r\nuniform float aspect;\r\nuniform float time;\r\n\r\nvarying vec2 vUv;\r\n\r\nfloat readDepth(const in vec2 uv) {\r\n\r\n	#if DEPTH_PACKING == 3201\r\n\r\n		return unpackRGBAToDepth(texture2D(depthBuffer, uv));\r\n\r\n	#else\r\n\r\n		return texture2D(depthBuffer, uv).r;\r\n\r\n	#endif\r\n\r\n}\r\n\r\nfloat getViewZ(const in float depth) {\r\n\r\n	#ifdef PERSPECTIVE_CAMERA\r\n\r\n		return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);\r\n\r\n	#else\r\n\r\n		return orthographicDepthToViewZ(depth, cameraNear, cameraFar);\r\n\r\n	#endif\r\n\r\n}\r\n\r\nFRAGMENT_HEAD\r\n\r\nvoid main() {\r\n\r\n	FRAGMENT_MAIN_UV\r\n\r\n	vec4 color0 = texture2D(inputBuffer, UV);\r\n	vec4 color1 = vec4(0.0);\r\n\r\n	FRAGMENT_MAIN_IMAGE\r\n\r\n	gl_FragColor = color0;\r\n\r\n	#ifdef ENCODE_OUTPUT\r\n\r\n		#include <encodings_fragment>\r\n\r\n	#endif\r\n\r\n	#include <dithering_fragment>\r\n\r\n}\r\n";

// src/materials/glsl/effect/shader.vert
var shader_default16 = "uniform vec2 resolution;\r\nuniform vec2 texelSize;\r\n\r\nuniform float cameraNear;\r\nuniform float cameraFar;\r\nuniform float aspect;\r\nuniform float time;\r\n\r\nvarying vec2 vUv;\r\n\r\nVERTEX_HEAD\r\n\r\nvoid main() {\r\n\r\n	vUv = position.xy * 0.5 + 0.5;\r\n\r\n	VERTEX_MAIN_SUPPORT\r\n\r\n	gl_Position = vec4(position.xy, 1.0, 1.0);\r\n\r\n}\r\n";

// src/materials/EffectMaterial.js
var EffectMaterial = class extends ShaderMaterial {
  constructor(shaderParts = null, defines = null, uniforms = null, camera, dithering = false) {
    super({
      type: "EffectMaterial",
      defines: {
        DEPTH_PACKING: "0",
        ENCODE_OUTPUT: "1"
      },
      uniforms: {
        inputBuffer: new Uniform(null),
        depthBuffer: new Uniform(null),
        resolution: new Uniform(new Vector2()),
        texelSize: new Uniform(new Vector2()),
        cameraNear: new Uniform(0.3),
        cameraFar: new Uniform(1e3),
        aspect: new Uniform(1),
        time: new Uniform(0)
      },
      blending: NoBlending,
      depthWrite: false,
      depthTest: false,
      dithering
    });
    this.toneMapped = false;
    if (shaderParts !== null) {
      this.setShaderParts(shaderParts);
    }
    if (defines !== null) {
      this.setDefines(defines);
    }
    if (uniforms !== null) {
      this.setUniforms(uniforms);
    }
    this.adoptCameraSettings(camera);
  }
  get depthPacking() {
    return Number(this.defines.DEPTH_PACKING);
  }
  set depthPacking(value) {
    this.defines.DEPTH_PACKING = value.toFixed(0);
    this.needsUpdate = true;
  }
  setShaderParts(shaderParts) {
    this.fragmentShader = shader_default15.replace(Section.FRAGMENT_HEAD, shaderParts.get(Section.FRAGMENT_HEAD)).replace(Section.FRAGMENT_MAIN_UV, shaderParts.get(Section.FRAGMENT_MAIN_UV)).replace(Section.FRAGMENT_MAIN_IMAGE, shaderParts.get(Section.FRAGMENT_MAIN_IMAGE));
    this.vertexShader = shader_default16.replace(Section.VERTEX_HEAD, shaderParts.get(Section.VERTEX_HEAD)).replace(Section.VERTEX_MAIN_SUPPORT, shaderParts.get(Section.VERTEX_MAIN_SUPPORT));
    this.needsUpdate = true;
    return this;
  }
  setDefines(defines) {
    for (const entry of defines.entries()) {
      this.defines[entry[0]] = entry[1];
    }
    this.needsUpdate = true;
    return this;
  }
  setUniforms(uniforms) {
    for (const entry of uniforms.entries()) {
      this.uniforms[entry[0]] = entry[1];
    }
    return this;
  }
  adoptCameraSettings(camera = null) {
    if (camera !== null) {
      this.uniforms.cameraNear.value = camera.near;
      this.uniforms.cameraFar.value = camera.far;
      if (camera instanceof PerspectiveCamera) {
        this.defines.PERSPECTIVE_CAMERA = "1";
      } else {
        delete this.defines.PERSPECTIVE_CAMERA;
      }
      this.needsUpdate = true;
    }
  }
  setSize(width, height) {
    const w = Math.max(width, 1);
    const h = Math.max(height, 1);
    this.uniforms.resolution.value.set(w, h);
    this.uniforms.texelSize.value.set(1 / w, 1 / h);
    this.uniforms.aspect.value = w / h;
  }
};
var Section = {
  FRAGMENT_HEAD: "FRAGMENT_HEAD",
  FRAGMENT_MAIN_UV: "FRAGMENT_MAIN_UV",
  FRAGMENT_MAIN_IMAGE: "FRAGMENT_MAIN_IMAGE",
  VERTEX_HEAD: "VERTEX_HEAD",
  VERTEX_MAIN_SUPPORT: "VERTEX_MAIN_SUPPORT"
};

// src/materials/glsl/luminance/shader.frag
var shader_default18 = "#include <common>\r\n\r\nuniform sampler2D inputBuffer;\r\n\r\n#ifdef RANGE\r\n\r\n	uniform vec2 range;\r\n\r\n#elif defined(THRESHOLD)\r\n\r\n	uniform float threshold;\r\n	uniform float smoothing;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n	vec4 texel = texture2D(inputBuffer, vUv);\r\n	float l = linearToRelativeLuminance(texel.rgb);\r\n\r\n	#ifdef RANGE\r\n\r\n		// Apply a luminance range mask.\r\n		float low = step(range.x, l);\r\n		float high = step(l, range.y);\r\n\r\n		l *= low * high;\r\n\r\n	#elif defined(THRESHOLD)\r\n\r\n		l = smoothstep(threshold, threshold + smoothing, l);\r\n\r\n	#endif\r\n\r\n	#ifdef COLOR\r\n\r\n		gl_FragColor = vec4(texel.rgb * l, l);\r\n\r\n	#else\r\n\r\n		gl_FragColor = vec4(l);\r\n\r\n	#endif\r\n\r\n}\r\n";

// src/materials/LuminanceMaterial.js
var LuminanceMaterial = class extends ShaderMaterial {
  constructor(colorOutput = false, luminanceRange = null) {
    const useRange = luminanceRange !== null;
    super({
      type: "LuminanceMaterial",
      uniforms: {
        inputBuffer: new Uniform(null),
        threshold: new Uniform(0),
        smoothing: new Uniform(1),
        range: new Uniform(useRange ? luminanceRange : new Vector2())
      },
      fragmentShader: shader_default18,
      vertexShader: shader_default2,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
    this.colorOutput = colorOutput;
    this.useThreshold = true;
    this.useRange = useRange;
  }
  get threshold() {
    return this.uniforms.threshold.value;
  }
  set threshold(value) {
    this.uniforms.threshold.value = value;
  }
  get smoothing() {
    return this.uniforms.smoothing.value;
  }
  set smoothing(value) {
    this.uniforms.smoothing.value = value;
  }
  get useThreshold() {
    return this.defines.THRESHOLD !== void 0;
  }
  set useThreshold(value) {
    if (value) {
      this.defines.THRESHOLD = "1";
    } else {
      delete this.defines.THRESHOLD;
    }
    this.needsUpdate = true;
  }
  get colorOutput() {
    return this.defines.COLOR !== void 0;
  }
  set colorOutput(value) {
    if (value) {
      this.defines.COLOR = "1";
    } else {
      delete this.defines.COLOR;
    }
    this.needsUpdate = true;
  }
  setColorOutputEnabled(enabled) {
    this.colorOutput = enabled;
  }
  get useRange() {
    return this.defines.RANGE !== void 0;
  }
  set useRange(value) {
    if (value) {
      this.defines.RANGE = "1";
    } else {
      delete this.defines.RANGE;
    }
    this.needsUpdate = true;
  }
  get luminanceRange() {
    return this.useRange;
  }
  set luminanceRange(value) {
    this.useRange = value;
  }
  setLuminanceRangeEnabled(enabled) {
    this.useRange = enabled;
  }
};

// src/materials/glsl/smaa-weights/shader.frag
var shader_default22 = "#define sampleLevelZeroOffset(t, coord, offset) texture2D(t, coord + offset * texelSize)\r\n\r\n#if __VERSION__ < 300\r\n\r\n	#define round(v) floor(v + 0.5)\r\n\r\n#endif\r\n\r\nuniform sampler2D inputBuffer;\r\nuniform sampler2D areaTexture;\r\nuniform sampler2D searchTexture;\r\n\r\nuniform vec2 texelSize;\r\nuniform vec2 resolution;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\nvarying vec2 vPixCoord;\r\n\r\n\r\n/**\r\n * Moves values to a target vector based on a given conditional vector.\r\n */\r\n\r\nvoid movec(const in bvec2 c, inout vec2 variable, const in vec2 value) {\r\n\r\n	if(c.x) { variable.x = value.x; }\r\n	if(c.y) { variable.y = value.y; }\r\n\r\n}\r\n\r\nvoid movec(const in bvec4 c, inout vec4 variable, const in vec4 value) {\r\n\r\n	movec(c.xy, variable.xy, value.xy);\r\n	movec(c.zw, variable.zw, value.zw);\r\n\r\n}\r\n\r\n/**\r\n * Allows to decode two binary values from a bilinear-filtered access.\r\n *\r\n * Bilinear access for fetching 'e' have a 0.25 offset, and we are interested\r\n * in the R and G edges:\r\n *\r\n * +---G---+-------+\r\n * |   x o R   x   |\r\n * +-------+-------+\r\n *\r\n * Then, if one of these edge is enabled:\r\n *  Red: (0.75 * X + 0.25 * 1) => 0.25 or 1.0\r\n *  Green: (0.75 * 1 + 0.25 * X) => 0.75 or 1.0\r\n *\r\n * This function will unpack the values (mad + mul + round):\r\n * wolframalpha.com: round(x * abs(5 * x - 5 * 0.75)) plot 0 to 1\r\n */\r\n\r\nvec2 decodeDiagBilinearAccess(in vec2 e) {\r\n\r\n	e.r = e.r * abs(5.0 * e.r - 5.0 * 0.75);\r\n\r\n	return round(e);\r\n\r\n}\r\n\r\nvec4 decodeDiagBilinearAccess(in vec4 e) {\r\n\r\n	e.rb = e.rb * abs(5.0 * e.rb - 5.0 * 0.75);\r\n\r\n	return round(e);\r\n\r\n}\r\n\r\n/**\r\n * Diagonal pattern searches.\r\n */\r\n\r\nvec2 searchDiag1(const in vec2 texCoord, const in vec2 dir, out vec2 e) {\r\n\r\n	vec4 coord = vec4(texCoord, -1.0, 1.0);\r\n	vec3 t = vec3(texelSize, 1.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n		if(!(coord.z < float(MAX_SEARCH_STEPS_DIAG_INT - 1) && coord.w > 0.9)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		coord.xyz = t * vec3(dir, 1.0) + coord.xyz;\r\n		e = texture2D(inputBuffer, coord.xy).rg;\r\n		coord.w = dot(e, vec2(0.5));\r\n\r\n	}\r\n\r\n	return coord.zw;\r\n\r\n}\r\n\r\nvec2 searchDiag2(const in vec2 texCoord, const in vec2 dir, out vec2 e) {\r\n\r\n	vec4 coord = vec4(texCoord, -1.0, 1.0);\r\n	coord.x += 0.25 * texelSize.x; // See @SearchDiag2Optimization\r\n	vec3 t = vec3(texelSize, 1.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n		if(!(coord.z < float(MAX_SEARCH_STEPS_DIAG_INT - 1) && coord.w > 0.9)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		coord.xyz = t * vec3(dir, 1.0) + coord.xyz;\r\n\r\n		// @SearchDiag2Optimization\r\n		// Fetch both edges at once using bilinear filtering.\r\n		e = texture2D(inputBuffer, coord.xy).rg;\r\n		e = decodeDiagBilinearAccess(e);\r\n\r\n		// Non-optimized version:\r\n		// e.g = texture2D(inputBuffer, coord.xy).g;\r\n		// e.r = SMAASampleLevelZeroOffset(inputBuffer, coord.xy, vec2(1, 0)).r;\r\n\r\n		coord.w = dot(e, vec2(0.5));\r\n\r\n	}\r\n\r\n	return coord.zw;\r\n\r\n}\r\n\r\n/**\r\n * Calculates the area corresponding to a certain diagonal distance and crossing\r\n * edges 'e'.\r\n */\r\n\r\nvec2 areaDiag(const in vec2 dist, const in vec2 e, const in float offset) {\r\n\r\n	vec2 texCoord = vec2(AREATEX_MAX_DISTANCE_DIAG, AREATEX_MAX_DISTANCE_DIAG) * e + dist;\r\n\r\n	// Apply a scale and bias for mapping to texel space.\r\n	texCoord = AREATEX_PIXEL_SIZE * texCoord + 0.5 * AREATEX_PIXEL_SIZE;\r\n\r\n	// Diagonal areas are on the second half of the texture.\r\n	texCoord.x += 0.5;\r\n\r\n	// Move to the proper place, according to the subpixel offset.\r\n	texCoord.y += AREATEX_SUBTEX_SIZE * offset;\r\n\r\n	return texture2D(areaTexture, texCoord).rg;\r\n\r\n}\r\n\r\n/**\r\n * Searches for diagonal patterns and returns the corresponding weights.\r\n */\r\n\r\nvec2 calculateDiagWeights(const in vec2 texCoord, const in vec2 e, const in vec4 subsampleIndices) {\r\n\r\n	vec2 weights = vec2(0.0);\r\n\r\n	// Search for the line ends.\r\n	vec4 d;\r\n	vec2 end;\r\n\r\n	if(e.r > 0.0) {\r\n\r\n		d.xz = searchDiag1(texCoord, vec2(-1.0,  1.0), end);\r\n		d.x += float(end.y > 0.9);\r\n\r\n	} else {\r\n\r\n		d.xz = vec2(0.0);\r\n\r\n	}\r\n\r\n	d.yw = searchDiag1(texCoord, vec2(1.0, -1.0), end);\r\n\r\n	if(d.x + d.y > 2.0) { // d.x + d.y + 1 > 3\r\n\r\n		// Fetch the crossing edges.\r\n		vec4 coords = vec4(-d.x + 0.25, d.x, d.y, -d.y - 0.25) * texelSize.xyxy + texCoord.xyxy;\r\n		vec4 c;\r\n		c.xy = sampleLevelZeroOffset(inputBuffer, coords.xy, vec2(-1, 0)).rg;\r\n		c.zw = sampleLevelZeroOffset(inputBuffer, coords.zw, vec2(1, 0)).rg;\r\n		c.yxwz = decodeDiagBilinearAccess(c.xyzw);\r\n\r\n		// Non-optimized version:\r\n		// vec4 coords = vec4(-d.x, d.x, d.y, -d.y) * texelSize.xyxy + texCoord.xyxy;\r\n		// vec4 c;\r\n		// c.x = sampleLevelZeroOffset(inputBuffer, coords.xy, vec2(-1, 0)).g;\r\n		// c.y = sampleLevelZeroOffset(inputBuffer, coords.xy, vec2(0, 0)).r;\r\n		// c.z = sampleLevelZeroOffset(inputBuffer, coords.zw, vec2(1, 0)).g;\r\n		// c.w = sampleLevelZeroOffset(inputBuffer, coords.zw, vec2(1, -1)).r;\r\n\r\n		// Merge crossing edges at each side into a single value.\r\n		vec2 cc = vec2(2.0) * c.xz + c.yw;\r\n\r\n		// Remove the crossing edge if no end of the line could be found.\r\n		movec(bvec2(step(0.9, d.zw)), cc, vec2(0.0));\r\n\r\n		// Fetch the areas for this line.\r\n		weights += areaDiag(d.xy, cc, subsampleIndices.z);\r\n\r\n	}\r\n\r\n	// Search for the line ends.\r\n	d.xz = searchDiag2(texCoord, vec2(-1.0, -1.0), end);\r\n\r\n	if(sampleLevelZeroOffset(inputBuffer, texCoord, vec2(1, 0)).r > 0.0) {\r\n\r\n		d.yw = searchDiag2(texCoord, vec2(1.0), end);\r\n		d.y += float(end.y > 0.9);\r\n\r\n	} else {\r\n\r\n		d.yw = vec2(0.0);\r\n\r\n	}\r\n\r\n	if(d.x + d.y > 2.0) { // d.x + d.y + 1 > 3\r\n\r\n		// Fetch the crossing edges.\r\n		vec4 coords = vec4(-d.x, -d.x, d.y, d.y) * texelSize.xyxy + texCoord.xyxy;\r\n		vec4 c;\r\n		c.x = sampleLevelZeroOffset(inputBuffer, coords.xy, vec2(-1, 0)).g;\r\n		c.y = sampleLevelZeroOffset(inputBuffer, coords.xy, vec2(0, -1)).r;\r\n		c.zw = sampleLevelZeroOffset(inputBuffer, coords.zw, vec2(1, 0)).gr;\r\n		vec2 cc = vec2(2.0) * c.xz + c.yw;\r\n\r\n		// Remove the crossing edge if no end of the line could be found.\r\n		movec(bvec2(step(0.9, d.zw)), cc, vec2(0.0));\r\n\r\n		// Fetch the areas for this line.\r\n		weights += areaDiag(d.xy, cc, subsampleIndices.w).gr;\r\n\r\n	}\r\n\r\n	return weights;\r\n\r\n}\r\n\r\n/**\r\n * Determines how much length should be added in the last step of the searches.\r\n *\r\n * Takes the bilinearly interpolated edge (see @PSEUDO_GATHER4), and adds 0, 1\r\n * or 2 depending on which edges and crossing edges are active.\r\n */\r\n\r\nfloat searchLength(const in vec2 e, const in float offset) {\r\n\r\n	/* The texture is flipped vertically, with left and right cases taking half\r\n	of the space horizontally. */\r\n	vec2 scale = SEARCHTEX_SIZE * vec2(0.5, -1.0);\r\n	vec2 bias = SEARCHTEX_SIZE * vec2(offset, 1.0);\r\n\r\n	// Scale and bias to access texel centers.\r\n	scale += vec2(-1.0, 1.0);\r\n	bias += vec2(0.5, -0.5);\r\n\r\n	// Convert from pixel coordinates to texcoords.\r\n	scale *= 1.0 / SEARCHTEX_PACKED_SIZE;\r\n	bias *= 1.0 / SEARCHTEX_PACKED_SIZE;\r\n\r\n	return texture2D(searchTexture, scale * e + bias).r;\r\n\r\n}\r\n\r\n/**\r\n * Horizontal search for the second pass.\r\n */\r\n\r\nfloat searchXLeft(in vec2 texCoord, const in float end) {\r\n\r\n	/* @PSEUDO_GATHER4\r\n	This texCoord has been offset by (-0.25, -0.125) in the vertex shader to\r\n	sample between edges, thus fetching four edges in a row.\r\n	Sampling with different offsets in each direction allows to disambiguate\r\n	which edges are active from the four fetched ones. */\r\n\r\n	vec2 e = vec2(0.0, 1.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n		if(!(texCoord.x > end && e.g > 0.8281 && e.r == 0.0)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		e = texture2D(inputBuffer, texCoord).rg;\r\n		texCoord = vec2(-2.0, 0.0) * texelSize + texCoord;\r\n\r\n	}\r\n\r\n	float offset = -(255.0 / 127.0) * searchLength(e, 0.0) + 3.25;\r\n\r\n	return texelSize.x * offset + texCoord.x;\r\n\r\n	// Non-optimized version:\r\n	// Correct the previous (-0.25, -0.125) offset.\r\n	// texCoord.x += 0.25 * texelSize.x;\r\n	// The searches are biased by 1, so adjust the coords accordingly.\r\n	// texCoord.x += texelSize.x;\r\n	// Disambiguate the length added by the last step.\r\n	// texCoord.x += 2.0 * texelSize.x; // Undo last step.\r\n	// texCoord.x -= texelSize.x * (255.0 / 127.0) * searchLength(e, 0.0);\r\n	// return texelSize.x * offset + texCoord.x);\r\n\r\n}\r\n\r\nfloat searchXRight(vec2 texCoord, const in float end) {\r\n\r\n	vec2 e = vec2(0.0, 1.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n		if(!(texCoord.x < end && e.g > 0.8281 && e.r == 0.0)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		e = texture2D(inputBuffer, texCoord).rg;\r\n		texCoord = vec2(2.0, 0.0) * texelSize.xy + texCoord;\r\n\r\n	}\r\n\r\n	float offset = -(255.0 / 127.0) * searchLength(e, 0.5) + 3.25;\r\n\r\n	return -texelSize.x * offset + texCoord.x;\r\n\r\n}\r\n\r\n/**\r\n * Vertical search for the second pass.\r\n */\r\n\r\nfloat searchYUp(vec2 texCoord, const in float end) {\r\n\r\n	vec2 e = vec2(1.0, 0.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; ++i) {\r\n\r\n		if(!(texCoord.y > end && e.r > 0.8281 && e.g == 0.0)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		e = texture2D(inputBuffer, texCoord).rg;\r\n		texCoord = -vec2(0.0, 2.0) * texelSize.xy + texCoord;\r\n\r\n	}\r\n\r\n	float offset = -(255.0 / 127.0) * searchLength(e.gr, 0.0) + 3.25;\r\n\r\n	return texelSize.y * offset + texCoord.y;\r\n\r\n}\r\n\r\nfloat searchYDown(vec2 texCoord, const in float end) {\r\n\r\n	vec2 e = vec2(1.0, 0.0);\r\n\r\n	for(int i = 0; i < MAX_SEARCH_STEPS_INT; i++) {\r\n\r\n		if(!(texCoord.y < end && e.r > 0.8281 && e.g == 0.0)) {\r\n\r\n			break;\r\n\r\n		}\r\n\r\n		e = texture2D(inputBuffer, texCoord).rg;\r\n		texCoord = vec2(0.0, 2.0) * texelSize.xy + texCoord;\r\n\r\n	}\r\n\r\n	float offset = -(255.0 / 127.0) * searchLength(e.gr, 0.5) + 3.25;\r\n\r\n	return -texelSize.y * offset + texCoord.y;\r\n\r\n}\r\n\r\n/**\r\n * Determines the areas at each side of the current edge.\r\n */\r\n\r\nvec2 area(const in vec2 dist, const in float e1, const in float e2, const in float offset) {\r\n\r\n	// Rounding prevents precision errors of bilinear filtering.\r\n	vec2 texCoord = vec2(AREATEX_MAX_DISTANCE) * round(4.0 * vec2(e1, e2)) + dist;\r\n\r\n	// Apply a scale and bias for mapping to texel space.\r\n	texCoord = AREATEX_PIXEL_SIZE * texCoord + 0.5 * AREATEX_PIXEL_SIZE;\r\n\r\n	// Move to the proper place, according to the subpixel offset.\r\n	texCoord.y = AREATEX_SUBTEX_SIZE * offset + texCoord.y;\r\n\r\n	return texture2D(areaTexture, texCoord).rg;\r\n\r\n}\r\n\r\n/**\r\n * Corner detection.\r\n */\r\n\r\nvoid detectHorizontalCornerPattern(inout vec2 weights, const in vec4 texCoord, const in vec2 d) {\r\n\r\n	#if !defined(DISABLE_CORNER_DETECTION)\r\n\r\n		vec2 leftRight = step(d.xy, d.yx);\r\n		vec2 rounding = (1.0 - CORNER_ROUNDING_NORM) * leftRight;\r\n\r\n		// Reduce blending for pixels in the center of a line.\r\n		rounding /= leftRight.x + leftRight.y;\r\n\r\n		vec2 factor = vec2(1.0);\r\n		factor.x -= rounding.x * sampleLevelZeroOffset(inputBuffer, texCoord.xy, vec2(0, 1)).r;\r\n		factor.x -= rounding.y * sampleLevelZeroOffset(inputBuffer, texCoord.zw, vec2(1, 1)).r;\r\n		factor.y -= rounding.x * sampleLevelZeroOffset(inputBuffer, texCoord.xy, vec2(0, -2)).r;\r\n		factor.y -= rounding.y * sampleLevelZeroOffset(inputBuffer, texCoord.zw, vec2(1, -2)).r;\r\n\r\n		weights *= clamp(factor, 0.0, 1.0);\r\n\r\n	#endif\r\n\r\n}\r\n\r\nvoid detectVerticalCornerPattern(inout vec2 weights, const in vec4 texCoord, const in vec2 d) {\r\n\r\n	#if !defined(DISABLE_CORNER_DETECTION)\r\n\r\n		vec2 leftRight = step(d.xy, d.yx);\r\n		vec2 rounding = (1.0 - CORNER_ROUNDING_NORM) * leftRight;\r\n\r\n		rounding /= leftRight.x + leftRight.y;\r\n\r\n		vec2 factor = vec2(1.0);\r\n		factor.x -= rounding.x * sampleLevelZeroOffset(inputBuffer, texCoord.xy, vec2(1, 0)).g;\r\n		factor.x -= rounding.y * sampleLevelZeroOffset(inputBuffer, texCoord.zw, vec2(1, 1)).g;\r\n		factor.y -= rounding.x * sampleLevelZeroOffset(inputBuffer, texCoord.xy, vec2(-2, 0)).g;\r\n		factor.y -= rounding.y * sampleLevelZeroOffset(inputBuffer, texCoord.zw, vec2(-2, 1)).g;\r\n\r\n		weights *= clamp(factor, 0.0, 1.0);\r\n\r\n	#endif\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n	vec4 weights = vec4(0.0);\r\n	vec4 subsampleIndices = vec4(0.0);\r\n	vec2 e = texture2D(inputBuffer, vUv).rg;\r\n\r\n	if(e.g > 0.0) {\r\n\r\n		// Edge at north.\r\n\r\n		#if !defined(DISABLE_DIAG_DETECTION)\r\n\r\n			/* Diagonals have both north and west edges, so searching for them in one of\r\n			the boundaries is enough. */\r\n			weights.rg = calculateDiagWeights(vUv, e, subsampleIndices);\r\n\r\n			// Skip horizontal/vertical processing if there is a diagonal.\r\n			if(weights.r == -weights.g) { // weights.r + weights.g == 0.0\r\n\r\n		#endif\r\n\r\n		vec2 d;\r\n\r\n		// Find the distance to the left.\r\n		vec3 coords;\r\n		coords.x = searchXLeft(vOffset[0].xy, vOffset[2].x);\r\n		coords.y = vOffset[1].y; // vOffset[1].y = vUv.y - 0.25 * texelSize.y (@CROSSING_OFFSET)\r\n		d.x = coords.x;\r\n\r\n		/* Now fetch the left crossing edges, two at a time using bilinear\r\n		filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to discern what\r\n		value each edge has. */\r\n		float e1 = texture2D(inputBuffer, coords.xy).r;\r\n\r\n		// Find the distance to the right.\r\n		coords.z = searchXRight(vOffset[0].zw, vOffset[2].y);\r\n		d.y = coords.z;\r\n\r\n		/* Translate distances to pixel units for better interleave arithmetic and\r\n		memory accesses. */\r\n		d = round(resolution.xx * d + -vPixCoord.xx);\r\n\r\n		// The area texture is compressed quadratically.\r\n		vec2 sqrtD = sqrt(abs(d));\r\n\r\n		// Fetch the right crossing edges.\r\n		float e2 = sampleLevelZeroOffset(inputBuffer, coords.zy, vec2(1, 0)).r;\r\n\r\n		// Pattern recognized, now get the actual area.\r\n		weights.rg = area(sqrtD, e1, e2, subsampleIndices.y);\r\n\r\n		// Fix corners.\r\n		coords.y = vUv.y;\r\n		detectHorizontalCornerPattern(weights.rg, coords.xyzy, d);\r\n\r\n		#if !defined(DISABLE_DIAG_DETECTION)\r\n\r\n			} else {\r\n\r\n				// Skip vertical processing.\r\n				e.r = 0.0;\r\n\r\n			}\r\n\r\n		#endif\r\n\r\n	}\r\n\r\n	if(e.r > 0.0) {\r\n\r\n		// Edge at west.\r\n\r\n		vec2 d;\r\n\r\n		// Find the distance to the top.\r\n		vec3 coords;\r\n		coords.y = searchYUp(vOffset[1].xy, vOffset[2].z);\r\n		coords.x = vOffset[0].x; // vOffset[1].x = vUv.x - 0.25 * texelSize.x;\r\n		d.x = coords.y;\r\n\r\n		// Fetch the top crossing edges.\r\n		float e1 = texture2D(inputBuffer, coords.xy).g;\r\n\r\n		// Find the distance to the bottom.\r\n		coords.z = searchYDown(vOffset[1].zw, vOffset[2].w);\r\n		d.y = coords.z;\r\n\r\n		// Translate distances into pixel units.\r\n		d = round(resolution.yy * d - vPixCoord.yy);\r\n\r\n		// The area texture is compressed quadratically.\r\n		vec2 sqrtD = sqrt(abs(d));\r\n\r\n		// Fetch the bottom crossing edges.\r\n		float e2 = sampleLevelZeroOffset(inputBuffer, coords.xz, vec2(0, 1)).g;\r\n\r\n		// Get the area for this direction.\r\n		weights.ba = area(sqrtD, e1, e2, subsampleIndices.x);\r\n\r\n		// Fix corners.\r\n		coords.x = vUv.x;\r\n		detectVerticalCornerPattern(weights.ba, coords.xyxz, d);\r\n\r\n	}\r\n\r\n	gl_FragColor = weights;\r\n\r\n}\r\n";

// src/materials/glsl/smaa-weights/shader.vert
var shader_default23 = "uniform vec2 texelSize;\r\nuniform vec2 resolution;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\nvarying vec2 vPixCoord;\r\n\r\nvoid main() {\r\n\r\n	vUv = position.xy * 0.5 + 0.5;\r\n	vPixCoord = vUv * resolution;\r\n\r\n	// Offsets for the searches (see @PSEUDO_GATHER4).\r\n	vOffset[0] = vUv.xyxy + texelSize.xyxy * vec4(-0.25, -0.125, 1.25, -0.125);\r\n	vOffset[1] = vUv.xyxy + texelSize.xyxy * vec4(-0.125, -0.25, -0.125, 1.25);\r\n\r\n	// This indicates the ends of the loops.\r\n	vOffset[2] = vec4(vOffset[0].xz, vOffset[1].yw) +\r\n		vec4(-2.0, 2.0, -2.0, 2.0) * texelSize.xxyy * MAX_SEARCH_STEPS_FLOAT;\r\n\r\n	gl_Position = vec4(position.xy, 1.0, 1.0);\r\n\r\n}\r\n";

// src/materials/SMAAWeightsMaterial.js
var SMAAWeightsMaterial = class extends ShaderMaterial {
  constructor(texelSize = new Vector2(), resolution = new Vector2()) {
    super({
      type: "SMAAWeightsMaterial",
      defines: {
        MAX_SEARCH_STEPS_INT: "16",
        MAX_SEARCH_STEPS_FLOAT: "16.0",
        MAX_SEARCH_STEPS_DIAG_INT: "8",
        MAX_SEARCH_STEPS_DIAG_FLOAT: "8.0",
        CORNER_ROUNDING: "25",
        CORNER_ROUNDING_NORM: "0.25",
        AREATEX_MAX_DISTANCE: "16.0",
        AREATEX_MAX_DISTANCE_DIAG: "20.0",
        AREATEX_PIXEL_SIZE: "(1.0 / vec2(160.0, 560.0))",
        AREATEX_SUBTEX_SIZE: "(1.0 / 7.0)",
        SEARCHTEX_SIZE: "vec2(66.0, 33.0)",
        SEARCHTEX_PACKED_SIZE: "vec2(64.0, 16.0)"
      },
      uniforms: {
        inputBuffer: new Uniform(null),
        areaTexture: new Uniform(null),
        searchTexture: new Uniform(null),
        texelSize: new Uniform(texelSize),
        resolution: new Uniform(resolution)
      },
      fragmentShader: shader_default22,
      vertexShader: shader_default23,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
  }
  setOrthogonalSearchSteps(steps) {
    const s = Math.min(Math.max(steps, 0), 112);
    this.defines.MAX_SEARCH_STEPS_INT = s.toFixed("0");
    this.defines.MAX_SEARCH_STEPS_FLOAT = s.toFixed("1");
    this.needsUpdate = true;
  }
  setDiagonalSearchSteps(steps) {
    const s = Math.min(Math.max(steps, 0), 20);
    this.defines.MAX_SEARCH_STEPS_DIAG_INT = s.toFixed("0");
    this.defines.MAX_SEARCH_STEPS_DIAG_FLOAT = s.toFixed("1");
    this.needsUpdate = true;
  }
  setCornerRounding(rounding) {
    const r = Math.min(Math.max(rounding, 0), 100);
    this.defines.CORNER_ROUNDING = r.toFixed("4");
    this.defines.CORNER_ROUNDING_NORM = (r / 100).toFixed("4");
    this.needsUpdate = true;
  }
  get diagonalDetection() {
    return this.defines.DISABLE_DIAG_DETECTION === void 0;
  }
  set diagonalDetection(value) {
    if (value) {
      delete this.defines.DISABLE_DIAG_DETECTION;
    } else {
      this.defines.DISABLE_DIAG_DETECTION = "1";
    }
    this.needsUpdate = true;
  }
  get cornerRounding() {
    return this.defines.DISABLE_CORNER_DETECTION === void 0;
  }
  set cornerRounding(value) {
    if (value) {
      delete this.defines.DISABLE_CORNER_DETECTION;
    } else {
      this.defines.DISABLE_CORNER_DETECTION = "1";
    }
    this.needsUpdate = true;
  }
};
var dummyCamera = new Camera();
var geometry = null;
function getFullscreenTriangle() {
  if (geometry === null) {
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    geometry = new BufferGeometry();
    if (geometry.setAttribute !== void 0) {
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));
      geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
    } else {
      geometry.addAttribute("position", new BufferAttribute(vertices, 3));
      geometry.addAttribute("uv", new BufferAttribute(uvs, 2));
    }
  }
  return geometry;
}
var Pass = class {
  constructor(name = "Pass", scene = new Scene(), camera = dummyCamera) {
    this.name = name;
    this.scene = scene;
    this.camera = camera;
    this.screen = null;
    this.rtt = true;
    this.needsSwap = true;
    this.needsDepthTexture = false;
    this.enabled = true;
  }
  get renderToScreen() {
    return !this.rtt;
  }
  set renderToScreen(value) {
    if (this.rtt === value) {
      const material = this.getFullscreenMaterial();
      if (material !== null) {
        material.needsUpdate = true;
      }
      this.rtt = !value;
    }
  }
  getFullscreenMaterial() {
    return this.screen !== null ? this.screen.material : null;
  }
  setFullscreenMaterial(material) {
    let screen = this.screen;
    if (screen !== null) {
      screen.material = material;
    } else {
      screen = new Mesh(getFullscreenTriangle(), material);
      screen.frustumCulled = false;
      if (this.scene === null) {
        this.scene = new Scene();
      }
      this.scene.add(screen);
      this.screen = screen;
    }
  }
  getDepthTexture() {
    return null;
  }
  setDepthTexture(depthTexture, depthPacking = 0) {
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    throw new Error("Render method not implemented!");
  }
  setSize(width, height) {
  }
  initialize(renderer, alpha, frameBufferType) {
  }
  dispose() {
    const material = this.getFullscreenMaterial();
    if (material !== null) {
      material.dispose();
    }
    for (const key of Object.keys(this)) {
      const property = this[key];
      if (property !== null && typeof property.dispose === "function") {
        if (property instanceof Scene) {
          continue;
        }
        this[key].dispose();
      }
    }
  }
};
var AUTO_SIZE = -1;
var Resizer = class {
  constructor(resizable, width = AUTO_SIZE, height = AUTO_SIZE, scale = 1) {
    this.resizable = resizable;
    this.base = new Vector2(1, 1);
    this.target = new Vector2(width, height);
    this.s = scale;
  }
  get scale() {
    return this.s;
  }
  set scale(value) {
    this.s = value;
    this.target.x = AUTO_SIZE;
    this.target.y = AUTO_SIZE;
    this.resizable.setSize(this.base.x, this.base.y);
  }
  get width() {
    const base = this.base;
    const target = this.target;
    let result;
    if (target.x !== AUTO_SIZE) {
      result = target.x;
    } else if (target.y !== AUTO_SIZE) {
      result = Math.round(target.y * (base.x / base.y));
    } else {
      result = Math.round(base.x * this.s);
    }
    return result;
  }
  set width(value) {
    this.target.x = value;
    this.resizable.setSize(this.base.x, this.base.y);
  }
  get height() {
    const base = this.base;
    const target = this.target;
    let result;
    if (target.y !== AUTO_SIZE) {
      result = target.y;
    } else if (target.x !== AUTO_SIZE) {
      result = Math.round(target.x / (base.x / base.y));
    } else {
      result = Math.round(base.y * this.s);
    }
    return result;
  }
  set height(value) {
    this.target.y = value;
    this.resizable.setSize(this.base.x, this.base.y);
  }
  static get AUTO_SIZE() {
    return AUTO_SIZE;
  }
};

// src/passes/BlurPass.js
var BlurPass = class extends Pass {
  constructor({
    resolutionScale = 0.5,
    width = Resizer.AUTO_SIZE,
    height = Resizer.AUTO_SIZE,
    kernelSize = KernelSize.LARGE
  } = {}) {
    super("BlurPass");
    this.renderTargetA = new WebGLRenderTarget(1, 1, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false
    });
    this.renderTargetA.texture.name = "Blur.Target.A";
    this.renderTargetB = this.renderTargetA.clone();
    this.renderTargetB.texture.name = "Blur.Target.B";
    this.resolution = new Resizer(this, width, height, resolutionScale);
    this.convolutionMaterial = new ConvolutionMaterial();
    this.ditheredConvolutionMaterial = new ConvolutionMaterial();
    this.ditheredConvolutionMaterial.dithering = true;
    this.dithering = false;
    this.kernelSize = kernelSize;
  }
  get width() {
    return this.resolution.width;
  }
  set width(value) {
    this.resolution.width = value;
  }
  get height() {
    return this.resolution.height;
  }
  set height(value) {
    this.resolution.height = value;
  }
  get scale() {
    return this.convolutionMaterial.uniforms.scale.value;
  }
  set scale(value) {
    this.convolutionMaterial.uniforms.scale.value = value;
    this.ditheredConvolutionMaterial.uniforms.scale.value = value;
  }
  get kernelSize() {
    return this.convolutionMaterial.kernelSize;
  }
  set kernelSize(value) {
    this.convolutionMaterial.kernelSize = value;
    this.ditheredConvolutionMaterial.kernelSize = value;
  }
  getResolutionScale() {
    return this.resolution.scale;
  }
  setResolutionScale(scale) {
    this.resolution.scale = scale;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const scene = this.scene;
    const camera = this.camera;
    const renderTargetA = this.renderTargetA;
    const renderTargetB = this.renderTargetB;
    let material = this.convolutionMaterial;
    let uniforms = material.uniforms;
    const kernel = material.getKernel();
    let lastRT = inputBuffer;
    let destRT;
    let i, l;
    this.setFullscreenMaterial(material);
    for (i = 0, l = kernel.length - 1; i < l; ++i) {
      destRT = (i & 1) === 0 ? renderTargetA : renderTargetB;
      uniforms.kernel.value = kernel[i];
      uniforms.inputBuffer.value = lastRT.texture;
      renderer.setRenderTarget(destRT);
      renderer.render(scene, camera);
      lastRT = destRT;
    }
    if (this.dithering) {
      material = this.ditheredConvolutionMaterial;
      uniforms = material.uniforms;
      this.setFullscreenMaterial(material);
    }
    uniforms.kernel.value = kernel[i];
    uniforms.inputBuffer.value = lastRT.texture;
    renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
    renderer.render(scene, camera);
  }
  setSize(width, height) {
    const resolution = this.resolution;
    resolution.base.set(width, height);
    const w = resolution.width;
    const h = resolution.height;
    this.renderTargetA.setSize(w, h);
    this.renderTargetB.setSize(w, h);
    this.convolutionMaterial.setTexelSize(1 / w, 1 / h);
    this.ditheredConvolutionMaterial.setTexelSize(1 / w, 1 / h);
  }
  initialize(renderer, alpha, frameBufferType) {
    if (!alpha && frameBufferType === UnsignedByteType) {
      this.renderTargetA.texture.format = RGBFormat;
      this.renderTargetB.texture.format = RGBFormat;
    }
    if (frameBufferType !== void 0) {
      this.renderTargetA.texture.type = frameBufferType;
      this.renderTargetB.texture.type = frameBufferType;
    }
  }
  static get AUTO_SIZE() {
    return Resizer.AUTO_SIZE;
  }
};

// src/passes/ClearMaskPass.js
var ClearMaskPass = class extends Pass {
  constructor() {
    super("ClearMaskPass", null, null);
    this.needsSwap = false;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const stencil = renderer.state.buffers.stencil;
    stencil.setLocked(false);
    stencil.setTest(false);
  }
};
var color = new Color();
var ClearPass = class extends Pass {
  constructor(color2 = true, depth = true, stencil = false) {
    super("ClearPass", null, null);
    this.needsSwap = false;
    this.color = color2;
    this.depth = depth;
    this.stencil = stencil;
    this.overrideClearColor = null;
    this.overrideClearAlpha = -1;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const overrideClearColor = this.overrideClearColor;
    const overrideClearAlpha = this.overrideClearAlpha;
    const clearAlpha = renderer.getClearAlpha();
    const hasOverrideClearColor = overrideClearColor !== null;
    const hasOverrideClearAlpha = overrideClearAlpha >= 0;
    if (hasOverrideClearColor) {
      color.copy(renderer.getClearColor(color));
      renderer.setClearColor(overrideClearColor, hasOverrideClearAlpha ? overrideClearAlpha : clearAlpha);
    } else if (hasOverrideClearAlpha) {
      renderer.setClearAlpha(overrideClearAlpha);
    }
    renderer.setRenderTarget(this.renderToScreen ? null : inputBuffer);
    renderer.clear(this.color, this.depth, this.stencil);
    if (hasOverrideClearColor) {
      renderer.setClearColor(color, clearAlpha);
    } else if (hasOverrideClearAlpha) {
      renderer.setClearAlpha(clearAlpha);
    }
  }
};
var workaroundEnabled = false;
var OverrideMaterialManager = class {
  constructor(material = null) {
    this.originalMaterials = new Map();
    this.material = null;
    this.materials = null;
    this.materialsBackSide = null;
    this.materialsDoubleSide = null;
    this.setMaterial(material);
    this.meshCount = 0;
    this.replaceMaterial = (node) => {
      if (node.isMesh) {
        let materials;
        switch (node.material.side) {
          case DoubleSide:
            materials = this.materialsDoubleSide;
            break;
          case BackSide:
            materials = this.materialsBackSide;
            break;
          default:
            materials = this.materials;
            break;
        }
        this.originalMaterials.set(node, node.material);
        if (node.isSkinnedMesh) {
          node.material = materials[2];
        } else if (node.isInstancedMesh) {
          node.material = materials[1];
        } else {
          node.material = materials[0];
        }
        ++this.meshCount;
      }
    };
  }
  setMaterial(material) {
    this.disposeMaterials();
    this.material = material;
    if (material !== null) {
      const materials = this.materials = [
        material.clone(),
        material.clone(),
        material.clone()
      ];
      for (const m2 of materials) {
        m2.uniforms = Object.assign({}, material.uniforms);
        m2.side = FrontSide;
      }
      materials[2].skinning = true;
      this.materialsBackSide = materials.map((m2) => {
        const c2 = m2.clone();
        c2.uniforms = Object.assign({}, material.uniforms);
        c2.side = BackSide;
        return c2;
      });
      this.materialsDoubleSide = materials.map((m2) => {
        const c2 = m2.clone();
        c2.uniforms = Object.assign({}, material.uniforms);
        c2.side = DoubleSide;
        return c2;
      });
    }
  }
  render(renderer, scene, camera) {
    const shadowMapEnabled = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = false;
    if (workaroundEnabled) {
      const originalMaterials = this.originalMaterials;
      this.meshCount = 0;
      scene.traverse(this.replaceMaterial);
      renderer.render(scene, camera);
      for (const entry of originalMaterials) {
        entry[0].material = entry[1];
      }
      if (this.meshCount !== originalMaterials.size) {
        originalMaterials.clear();
      }
    } else {
      const overrideMaterial = scene.overrideMaterial;
      scene.overrideMaterial = this.material;
      renderer.render(scene, camera);
      scene.overrideMaterial = overrideMaterial;
    }
    renderer.shadowMap.enabled = shadowMapEnabled;
  }
  disposeMaterials() {
    if (this.material !== null) {
      const materials = this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide);
      for (const m2 of materials) {
        m2.dispose();
      }
    }
  }
  dispose() {
    this.originalMaterials.clear();
    this.disposeMaterials();
  }
  static get workaroundEnabled() {
    return workaroundEnabled;
  }
  static set workaroundEnabled(value) {
    workaroundEnabled = value;
  }
};

// src/passes/RenderPass.js
var RenderPass = class extends Pass {
  constructor(scene, camera, overrideMaterial = null) {
    super("RenderPass", scene, camera);
    this.needsSwap = false;
    this.clearPass = new ClearPass();
    this.overrideMaterialManager = overrideMaterial === null ? null : new OverrideMaterialManager(overrideMaterial);
  }
  get renderToScreen() {
    return super.renderToScreen;
  }
  set renderToScreen(value) {
    super.renderToScreen = value;
    this.clearPass.renderToScreen = value;
  }
  get overrideMaterial() {
    const manager = this.overrideMaterialManager;
    return manager !== null ? manager.material : null;
  }
  set overrideMaterial(value) {
    const manager = this.overrideMaterialManager;
    if (value !== null) {
      if (manager !== null) {
        manager.setMaterial(value);
      } else {
        this.overrideMaterialManager = new OverrideMaterialManager(value);
      }
    } else if (manager !== null) {
      manager.dispose();
      this.overrideMaterialManager = null;
    }
  }
  get clear() {
    return this.clearPass.enabled;
  }
  set clear(value) {
    this.clearPass.enabled = value;
  }
  getClearPass() {
    return this.clearPass;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const scene = this.scene;
    const camera = this.camera;
    const background = scene.background;
    const renderTarget = this.renderToScreen ? null : inputBuffer;
    if (this.clear) {
      if (this.clearPass.overrideClearColor !== null) {
        scene.background = null;
      }
      this.clearPass.render(renderer, inputBuffer);
    }
    renderer.setRenderTarget(renderTarget);
    if (this.overrideMaterialManager !== null) {
      this.overrideMaterialManager.render(renderer, scene, camera);
    } else {
      renderer.render(scene, camera);
    }
    if (scene.background !== background) {
      scene.background = background;
    }
  }
};

// src/effects/blending/BlendFunction.js
var BlendFunction = {
  SKIP: 0,
  ADD: 1,
  ALPHA: 2,
  AVERAGE: 3,
  COLOR_BURN: 4,
  COLOR_DODGE: 5,
  DARKEN: 6,
  DIFFERENCE: 7,
  EXCLUSION: 8,
  LIGHTEN: 9,
  MULTIPLY: 10,
  DIVIDE: 11,
  NEGATION: 12,
  NORMAL: 13,
  OVERLAY: 14,
  REFLECT: 15,
  SCREEN: 16,
  SOFT_LIGHT: 17,
  SUBTRACT: 18
};

// src/effects/blending/glsl/add/shader.frag
var shader_default26 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return min(x + y, 1.0) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/alpha/shader.frag
var shader_default27 = "vec3 blend(const in vec3 x, const in vec3 y, const in float opacity) {\r\n\r\n	return y * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	float a = min(y.a, opacity);\r\n\r\n	return vec4(blend(x.rgb, y.rgb, a), max(x.a, a));\r\n\r\n}\r\n";

// src/effects/blending/glsl/average/shader.frag
var shader_default28 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return (x + y) * 0.5 * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/color-burn/shader.frag
var shader_default29 = "float blend(const in float x, const in float y) {\r\n\r\n	return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/color-dodge/shader.frag
var shader_default30 = "float blend(const in float x, const in float y) {\r\n\r\n	return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/darken/shader.frag
var shader_default31 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return min(x, y) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/difference/shader.frag
var shader_default32 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return abs(x - y) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/exclusion/shader.frag
var shader_default33 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return (x + y - 2.0 * x * y) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/lighten/shader.frag
var shader_default34 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return max(x, y) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/multiply/shader.frag
var shader_default35 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return x * y * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/divide/shader.frag
var shader_default36 = "float blend(const in float x, const in float y) {\r\n\r\n	return (y > 0.0) ? min(x / y, 1.0) : 1.0;\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/negation/shader.frag
var shader_default37 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return (1.0 - abs(1.0 - x - y)) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/normal/shader.frag
var shader_default38 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return y * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/overlay/shader.frag
var shader_default39 = "float blend(const in float x, const in float y) {\r\n\r\n	return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/reflect/shader.frag
var shader_default40 = "float blend(const in float x, const in float y) {\r\n\r\n	return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/screen/shader.frag
var shader_default41 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return (1.0 - (1.0 - x) * (1.0 - y)) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/soft-light/shader.frag
var shader_default42 = "float blend(const in float x, const in float y) {\r\n\r\n	return (y < 0.5) ?\r\n		(2.0 * x * y + x * x * (1.0 - 2.0 * y)) :\r\n		(sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));\r\n\r\n}\r\n\r\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	vec4 z = vec4(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b), blend(x.a, y.a));\r\n\r\n	return z * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/glsl/subtract/shader.frag
var shader_default43 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\r\n\r\n	return max(x + y - 1.0, 0.0) * opacity + x * (1.0 - opacity);\r\n\r\n}\r\n";

// src/effects/blending/BlendMode.js
var blendFunctions = new Map([
  [BlendFunction.SKIP, null],
  [BlendFunction.ADD, shader_default26],
  [BlendFunction.ALPHA, shader_default27],
  [BlendFunction.AVERAGE, shader_default28],
  [BlendFunction.COLOR_BURN, shader_default29],
  [BlendFunction.COLOR_DODGE, shader_default30],
  [BlendFunction.DARKEN, shader_default31],
  [BlendFunction.DIFFERENCE, shader_default32],
  [BlendFunction.EXCLUSION, shader_default33],
  [BlendFunction.LIGHTEN, shader_default34],
  [BlendFunction.MULTIPLY, shader_default35],
  [BlendFunction.DIVIDE, shader_default36],
  [BlendFunction.NEGATION, shader_default37],
  [BlendFunction.NORMAL, shader_default38],
  [BlendFunction.OVERLAY, shader_default39],
  [BlendFunction.REFLECT, shader_default40],
  [BlendFunction.SCREEN, shader_default41],
  [BlendFunction.SOFT_LIGHT, shader_default42],
  [BlendFunction.SUBTRACT, shader_default43]
]);
var BlendMode = class extends EventDispatcher {
  constructor(blendFunction, opacity = 1) {
    super();
    this.blendFunction = blendFunction;
    this.opacity = new Uniform(opacity);
  }
  getBlendFunction() {
    return this.blendFunction;
  }
  setBlendFunction(blendFunction) {
    this.blendFunction = blendFunction;
    this.dispatchEvent({type: "change"});
  }
  getShaderCode() {
    return blendFunctions.get(this.blendFunction);
  }
};
var Effect = class extends EventDispatcher {
  constructor(name, fragmentShader, {
    attributes = EffectAttribute.NONE,
    blendFunction = BlendFunction.SCREEN,
    defines = new Map(),
    uniforms = new Map(),
    extensions = null,
    vertexShader = null
  } = {}) {
    super();
    this.name = name;
    this.attributes = attributes;
    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
    this.defines = defines;
    this.uniforms = uniforms;
    this.extensions = extensions;
    this.blendMode = new BlendMode(blendFunction);
    this.blendMode.addEventListener("change", (event) => this.setChanged());
  }
  setChanged() {
    this.dispatchEvent({type: "change"});
  }
  getAttributes() {
    return this.attributes;
  }
  setAttributes(attributes) {
    this.attributes = attributes;
    this.setChanged();
  }
  getFragmentShader() {
    return this.fragmentShader;
  }
  setFragmentShader(fragmentShader) {
    this.fragmentShader = fragmentShader;
    this.setChanged();
  }
  getVertexShader() {
    return this.vertexShader;
  }
  setVertexShader(vertexShader) {
    this.vertexShader = vertexShader;
    this.setChanged();
  }
  setDepthTexture(depthTexture, depthPacking = 0) {
  }
  update(renderer, inputBuffer, deltaTime) {
  }
  setSize(width, height) {
  }
  initialize(renderer, alpha, frameBufferType) {
  }
  dispose() {
    for (const key of Object.keys(this)) {
      const property = this[key];
      if (property !== null && typeof property.dispose === "function") {
        if (property instanceof Scene) {
          continue;
        }
        this[key].dispose();
      }
    }
  }
};
var EffectAttribute = {
  NONE: 0,
  DEPTH: 1,
  CONVOLUTION: 2
};

// src/passes/EffectPass.js
function findSubstrings(regExp, string) {
  const substrings = [];
  let result;
  while ((result = regExp.exec(string)) !== null) {
    substrings.push(result[1]);
  }
  return substrings;
}
function prefixSubstrings(prefix, substrings, strings) {
  let prefixed, regExp;
  for (const substring of substrings) {
    prefixed = "$1" + prefix + substring.charAt(0).toUpperCase() + substring.slice(1);
    regExp = new RegExp("([^\\.])(\\b" + substring + "\\b)", "g");
    for (const entry of strings.entries()) {
      if (entry[1] !== null) {
        strings.set(entry[0], entry[1].replace(regExp, prefixed));
      }
    }
  }
}
function integrateEffect(prefix, effect, shaderParts, blendModes, defines, uniforms, attributes) {
  const functionRegExp = /(?:\w+\s+(\w+)\([\w\s,]*\)\s*{[^}]+})/g;
  const varyingRegExp = /(?:varying\s+\w+\s+(\w*))/g;
  const blendMode = effect.blendMode;
  const shaders = new Map([
    ["fragment", effect.getFragmentShader()],
    ["vertex", effect.getVertexShader()]
  ]);
  const mainImageExists = shaders.get("fragment") !== void 0 && /mainImage/.test(shaders.get("fragment"));
  const mainUvExists = shaders.get("fragment") !== void 0 && /mainUv/.test(shaders.get("fragment"));
  let varyings = [], names = [];
  let transformedUv = false;
  let readDepth = false;
  if (shaders.get("fragment") === void 0) {
    console.error("Missing fragment shader", effect);
  } else if (mainUvExists && (attributes & EffectAttribute.CONVOLUTION) !== 0) {
    console.error("Effects that transform UV coordinates are incompatible with convolution effects", effect);
  } else if (!mainImageExists && !mainUvExists) {
    console.error("The fragment shader contains neither a mainImage nor a mainUv function", effect);
  } else {
    if (mainUvExists) {
      shaderParts.set(Section.FRAGMENT_MAIN_UV, shaderParts.get(Section.FRAGMENT_MAIN_UV) + "	" + prefix + "MainUv(UV);\n");
      transformedUv = true;
    }
    if (shaders.get("vertex") !== null && /mainSupport/.test(shaders.get("vertex"))) {
      let string = "	" + prefix + "MainSupport(";
      if (/mainSupport *\([\w\s]*?uv\s*?\)/.test(shaders.get("vertex"))) {
        string += "vUv";
      }
      string += ");\n";
      shaderParts.set(Section.VERTEX_MAIN_SUPPORT, shaderParts.get(Section.VERTEX_MAIN_SUPPORT) + string);
      varyings = varyings.concat(findSubstrings(varyingRegExp, shaders.get("vertex")));
      names = names.concat(varyings).concat(findSubstrings(functionRegExp, shaders.get("vertex")));
    }
    names = names.concat(findSubstrings(functionRegExp, shaders.get("fragment"))).concat(Array.from(effect.defines.keys()).map((s) => s.replace(/\([\w\s,]*\)/g, ""))).concat(Array.from(effect.uniforms.keys()));
    effect.uniforms.forEach((value, key) => uniforms.set(prefix + key.charAt(0).toUpperCase() + key.slice(1), value));
    effect.defines.forEach((value, key) => defines.set(prefix + key.charAt(0).toUpperCase() + key.slice(1), value));
    prefixSubstrings(prefix, names, defines);
    prefixSubstrings(prefix, names, shaders);
    blendModes.set(blendMode.blendFunction, blendMode);
    if (mainImageExists) {
      const depthParamRegExp = /MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;
      let string = prefix + "MainImage(color0, UV, ";
      if ((attributes & EffectAttribute.DEPTH) !== 0 && depthParamRegExp.test(shaders.get("fragment"))) {
        string += "depth, ";
        readDepth = true;
      }
      string += "color1);\n	";
      const blendOpacity = prefix + "BlendOpacity";
      uniforms.set(blendOpacity, blendMode.opacity);
      string += "color0 = blend" + blendMode.getBlendFunction() + "(color0, color1, " + blendOpacity + ");\n\n	";
      shaderParts.set(Section.FRAGMENT_MAIN_IMAGE, shaderParts.get(Section.FRAGMENT_MAIN_IMAGE) + string);
      shaderParts.set(Section.FRAGMENT_HEAD, shaderParts.get(Section.FRAGMENT_HEAD) + "uniform float " + blendOpacity + ";\n\n");
    }
    shaderParts.set(Section.FRAGMENT_HEAD, shaderParts.get(Section.FRAGMENT_HEAD) + shaders.get("fragment") + "\n");
    if (shaders.get("vertex") !== null) {
      shaderParts.set(Section.VERTEX_HEAD, shaderParts.get(Section.VERTEX_HEAD) + shaders.get("vertex") + "\n");
    }
  }
  return {varyings, transformedUv, readDepth};
}
var EffectPass = class extends Pass {
  constructor(camera, ...effects) {
    super("EffectPass");
    this.setFullscreenMaterial(new EffectMaterial(null, null, null, camera));
    this.effects = effects.sort((a, b) => b.attributes - a.attributes);
    this.skipRendering = false;
    this.uniforms = 0;
    this.varyings = 0;
    this.minTime = 1;
    this.maxTime = Number.POSITIVE_INFINITY;
  }
  get encodeOutput() {
    return this.getFullscreenMaterial().defines.ENCODE_OUTPUT !== void 0;
  }
  set encodeOutput(value) {
    if (this.encodeOutput !== value) {
      const material = this.getFullscreenMaterial();
      material.needsUpdate = true;
      if (value) {
        material.defines.ENCODE_OUTPUT = "1";
      } else {
        delete material.defines.ENCODE_OUTPUT;
      }
    }
  }
  get dithering() {
    return this.getFullscreenMaterial().dithering;
  }
  set dithering(value) {
    const material = this.getFullscreenMaterial();
    if (material.dithering !== value) {
      material.dithering = value;
      material.needsUpdate = true;
    }
  }
  verifyResources(renderer) {
    const capabilities = renderer.capabilities;
    let max = Math.min(capabilities.maxFragmentUniforms, capabilities.maxVertexUniforms);
    if (this.uniforms > max) {
      console.warn("The current rendering context doesn't support more than " + max + " uniforms, but " + this.uniforms + " were defined");
    }
    max = capabilities.maxVaryings;
    if (this.varyings > max) {
      console.warn("The current rendering context doesn't support more than " + max + " varyings, but " + this.varyings + " were defined");
    }
  }
  updateMaterial() {
    const blendRegExp = /\bblend\b/g;
    const shaderParts = new Map([
      [Section.FRAGMENT_HEAD, ""],
      [Section.FRAGMENT_MAIN_UV, ""],
      [Section.FRAGMENT_MAIN_IMAGE, ""],
      [Section.VERTEX_HEAD, ""],
      [Section.VERTEX_MAIN_SUPPORT, ""]
    ]);
    const blendModes = new Map();
    const defines = new Map();
    const uniforms = new Map();
    const extensions = new Set();
    let id = 0, varyings = 0, attributes = 0;
    let transformedUv = false;
    let readDepth = false;
    let result;
    for (const effect of this.effects) {
      if (effect.blendMode.getBlendFunction() === BlendFunction.SKIP) {
        attributes |= effect.getAttributes() & EffectAttribute.DEPTH;
      } else if ((attributes & EffectAttribute.CONVOLUTION) !== 0 && (effect.getAttributes() & EffectAttribute.CONVOLUTION) !== 0) {
        console.error("Convolution effects cannot be merged", effect);
      } else {
        attributes |= effect.getAttributes();
        result = integrateEffect("e" + id++, effect, shaderParts, blendModes, defines, uniforms, attributes);
        varyings += result.varyings.length;
        transformedUv = transformedUv || result.transformedUv;
        readDepth = readDepth || result.readDepth;
        if (effect.extensions !== null) {
          for (const extension of effect.extensions) {
            extensions.add(extension);
          }
        }
      }
    }
    for (const blendMode of blendModes.values()) {
      shaderParts.set(Section.FRAGMENT_HEAD, shaderParts.get(Section.FRAGMENT_HEAD) + blendMode.getShaderCode().replace(blendRegExp, "blend" + blendMode.getBlendFunction()) + "\n");
    }
    if ((attributes & EffectAttribute.DEPTH) !== 0) {
      if (readDepth) {
        shaderParts.set(Section.FRAGMENT_MAIN_IMAGE, "float depth = readDepth(UV);\n\n	" + shaderParts.get(Section.FRAGMENT_MAIN_IMAGE));
      }
      this.needsDepthTexture = this.getDepthTexture() === null;
    } else {
      this.needsDepthTexture = false;
    }
    if (transformedUv) {
      shaderParts.set(Section.FRAGMENT_MAIN_UV, "vec2 transformedUv = vUv;\n" + shaderParts.get(Section.FRAGMENT_MAIN_UV));
      defines.set("UV", "transformedUv");
    } else {
      defines.set("UV", "vUv");
    }
    shaderParts.forEach((value, key, map) => map.set(key, value.trim().replace(/^#/, "\n#")));
    this.uniforms = uniforms.size;
    this.varyings = varyings;
    this.skipRendering = id === 0;
    this.needsSwap = !this.skipRendering;
    const material = this.getFullscreenMaterial();
    material.setShaderParts(shaderParts).setDefines(defines).setUniforms(uniforms);
    material.extensions = {};
    if (extensions.size > 0) {
      for (const extension of extensions) {
        material.extensions[extension] = true;
      }
    }
    this.needsUpdate = false;
  }
  recompile(renderer) {
    this.updateMaterial();
    if (renderer !== void 0) {
      this.verifyResources(renderer);
    }
  }
  getDepthTexture() {
    return this.getFullscreenMaterial().uniforms.depthBuffer.value;
  }
  setDepthTexture(depthTexture, depthPacking = 0) {
    const material = this.getFullscreenMaterial();
    material.uniforms.depthBuffer.value = depthTexture;
    material.depthPacking = depthPacking;
    material.needsUpdate = true;
    for (const effect of this.effects) {
      effect.setDepthTexture(depthTexture, depthPacking);
    }
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const material = this.getFullscreenMaterial();
    const time = material.uniforms.time.value + deltaTime;
    if (this.needsUpdate) {
      this.recompile(renderer);
    }
    for (const effect of this.effects) {
      effect.update(renderer, inputBuffer, deltaTime);
    }
    if (!this.skipRendering || this.renderToScreen) {
      material.uniforms.inputBuffer.value = inputBuffer.texture;
      material.uniforms.time.value = time <= this.maxTime ? time : this.minTime;
      renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
      renderer.render(this.scene, this.camera);
    }
  }
  setSize(width, height) {
    this.getFullscreenMaterial().setSize(width, height);
    for (const effect of this.effects) {
      effect.setSize(width, height);
    }
  }
  initialize(renderer, alpha, frameBufferType) {
    this.capabilities = renderer.capabilities;
    for (const effect of this.effects) {
      effect.initialize(renderer, alpha, frameBufferType);
      effect.addEventListener("change", (event) => this.handleEvent(event));
    }
    this.updateMaterial();
    this.verifyResources(renderer);
  }
  dispose() {
    super.dispose();
    for (const effect of this.effects) {
      effect.dispose();
    }
  }
  handleEvent(event) {
    switch (event.type) {
      case "change":
        this.needsUpdate = true;
        break;
    }
  }
};
var LuminancePass = class extends Pass {
  constructor({
    width = Resizer.AUTO_SIZE,
    height = Resizer.AUTO_SIZE,
    renderTarget,
    luminanceRange,
    colorOutput
  } = {}) {
    super("LuminancePass");
    this.setFullscreenMaterial(new LuminanceMaterial(colorOutput, luminanceRange));
    this.needsSwap = false;
    this.renderTarget = renderTarget;
    if (this.renderTarget === void 0) {
      this.renderTarget = new WebGLRenderTarget(1, 1, {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: colorOutput ? RGBAFormat : LuminanceFormat,
        stencilBuffer: false,
        depthBuffer: false
      });
      this.renderTarget.texture.name = "LuminancePass.Target";
      this.renderTarget.texture.generateMipmaps = false;
    }
    this.resolution = new Resizer(this, width, height);
  }
  get texture() {
    return this.renderTarget.texture;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const material = this.getFullscreenMaterial();
    material.uniforms.inputBuffer.value = inputBuffer.texture;
    renderer.setRenderTarget(this.renderToScreen ? null : this.renderTarget);
    renderer.render(this.scene, this.camera);
  }
  setSize(width, height) {
    const resolution = this.resolution;
    resolution.base.set(width, height);
    this.renderTarget.setSize(resolution.width, resolution.height);
  }
};

// src/passes/MaskPass.js
var MaskPass = class extends Pass {
  constructor(scene, camera) {
    super("MaskPass", scene, camera);
    this.needsSwap = false;
    this.clearPass = new ClearPass(false, false, true);
    this.inverse = false;
  }
  get clear() {
    return this.clearPass.enabled;
  }
  set clear(value) {
    this.clearPass.enabled = value;
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    const context = renderer.getContext();
    const buffers = renderer.state.buffers;
    const scene = this.scene;
    const camera = this.camera;
    const clearPass = this.clearPass;
    const writeValue = this.inverse ? 0 : 1;
    const clearValue = 1 - writeValue;
    buffers.color.setMask(false);
    buffers.depth.setMask(false);
    buffers.color.setLocked(true);
    buffers.depth.setLocked(true);
    buffers.stencil.setTest(true);
    buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
    buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
    buffers.stencil.setClear(clearValue);
    buffers.stencil.setLocked(true);
    if (this.clear) {
      if (this.renderToScreen) {
        clearPass.render(renderer, null);
      } else {
        clearPass.render(renderer, inputBuffer);
        clearPass.render(renderer, outputBuffer);
      }
    }
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    } else {
      renderer.setRenderTarget(inputBuffer);
      renderer.render(scene, camera);
      renderer.setRenderTarget(outputBuffer);
      renderer.render(scene, camera);
    }
    buffers.color.setLocked(false);
    buffers.depth.setLocked(false);
    buffers.stencil.setLocked(false);
    buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
    buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
    buffers.stencil.setLocked(true);
  }
};

// src/passes/ShaderPass.js
var ShaderPass = class extends Pass {
  constructor(material, input = "inputBuffer") {
    super("ShaderPass");
    this.setFullscreenMaterial(material);
    this.uniform = null;
    this.setInput(input);
  }
  setInput(input) {
    const material = this.getFullscreenMaterial();
    this.uniform = null;
    if (material !== null) {
      const uniforms = material.uniforms;
      if (uniforms !== void 0 && uniforms[input] !== void 0) {
        this.uniform = uniforms[input];
      }
    }
  }
  render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
    if (this.uniform !== null && inputBuffer !== null) {
      this.uniform.value = inputBuffer.texture;
    }
    renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
    renderer.render(this.scene, this.camera);
  }
};

// src/core/EffectComposer.js
var EffectComposer = class {
  constructor(renderer = null, {
    depthBuffer = true,
    stencilBuffer = false,
    multisampling = 0,
    frameBufferType
  } = {}) {
    this.renderer = renderer;
    this.inputBuffer = null;
    this.outputBuffer = null;
    if (this.renderer !== null) {
      this.renderer.autoClear = false;
      this.inputBuffer = this.createBuffer(depthBuffer, stencilBuffer, frameBufferType, multisampling);
      this.outputBuffer = this.inputBuffer.clone();
      this.enableExtensions();
    }
    this.copyPass = new ShaderPass(new CopyMaterial());
    this.depthTexture = null;
    this.passes = [];
    this.autoRenderToScreen = true;
  }
  get multisampling() {
    return this.inputBuffer instanceof WebGLMultisampleRenderTarget ? this.inputBuffer.samples : 0;
  }
  set multisampling(value) {
    const buffer = this.inputBuffer;
    const multisampling = this.multisampling;
    if (multisampling > 0 && value > 0) {
      this.inputBuffer.samples = value;
      this.outputBuffer.samples = value;
    } else if (multisampling !== value) {
      this.inputBuffer.dispose();
      this.outputBuffer.dispose();
      this.inputBuffer = this.createBuffer(buffer.depthBuffer, buffer.stencilBuffer, buffer.texture.type, value);
      this.inputBuffer.depthTexture = this.depthTexture;
      this.outputBuffer = this.inputBuffer.clone();
    }
  }
  getRenderer() {
    return this.renderer;
  }
  enableExtensions() {
    const frameBufferType = this.inputBuffer.texture.type;
    const capabilities = this.renderer.capabilities;
    const context = this.renderer.getContext();
    if (frameBufferType !== UnsignedByteType) {
      if (capabilities.isWebGL2) {
        context.getExtension("EXT_color_buffer_float");
      } else {
        context.getExtension("EXT_color_buffer_half_float");
      }
    }
  }
  replaceRenderer(renderer, updateDOM = true) {
    const oldRenderer = this.renderer;
    if (oldRenderer !== null && oldRenderer !== renderer) {
      const oldSize = oldRenderer.getSize(new Vector2());
      const newSize = renderer.getSize(new Vector2());
      const parent = oldRenderer.domElement.parentNode;
      this.renderer = renderer;
      this.renderer.autoClear = false;
      if (!oldSize.equals(newSize)) {
        this.setSize();
      }
      if (updateDOM && parent !== null) {
        parent.removeChild(oldRenderer.domElement);
        parent.appendChild(renderer.domElement);
      }
      this.enableExtensions();
    }
    return oldRenderer;
  }
  createDepthTexture() {
    const depthTexture = this.depthTexture = new DepthTexture();
    this.inputBuffer.depthTexture = depthTexture;
    this.inputBuffer.dispose();
    if (this.inputBuffer.stencilBuffer) {
      depthTexture.format = DepthStencilFormat;
      depthTexture.type = UnsignedInt248Type;
    } else {
      depthTexture.type = UnsignedIntType;
    }
    return depthTexture;
  }
  deleteDepthTexture() {
    if (this.depthTexture !== null) {
      this.depthTexture.dispose();
      this.depthTexture = null;
      this.inputBuffer.depthTexture = null;
      this.inputBuffer.dispose();
      for (const pass of this.passes) {
        pass.setDepthTexture(null);
      }
    }
  }
  createBuffer(depthBuffer, stencilBuffer, type, multisampling) {
    const size = this.renderer.getDrawingBufferSize(new Vector2());
    const alpha = this.renderer.getContext().getContextAttributes().alpha;
    const options = {
      format: !alpha && type === UnsignedByteType ? RGBFormat : RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer,
      depthBuffer,
      type
    };
    const renderTarget = multisampling > 0 ? new WebGLMultisampleRenderTarget(size.width, size.height, options) : new WebGLRenderTarget(size.width, size.height, options);
    if (multisampling > 0) {
      renderTarget.samples = multisampling;
    }
    renderTarget.texture.name = "EffectComposer.Buffer";
    renderTarget.texture.generateMipmaps = false;
    return renderTarget;
  }
  addPass(pass, index) {
    const passes = this.passes;
    const renderer = this.renderer;
    const drawingBufferSize = renderer.getDrawingBufferSize(new Vector2());
    const alpha = renderer.getContext().getContextAttributes().alpha;
    const frameBufferType = this.inputBuffer.texture.type;
    pass.setSize(drawingBufferSize.width, drawingBufferSize.height);
    pass.initialize(renderer, alpha, frameBufferType);
    if (this.autoRenderToScreen) {
      if (passes.length > 0) {
        passes[passes.length - 1].renderToScreen = false;
      }
      if (pass.renderToScreen) {
        this.autoRenderToScreen = false;
      }
    }
    if (index !== void 0) {
      passes.splice(index, 0, pass);
    } else {
      passes.push(pass);
    }
    if (this.autoRenderToScreen) {
      passes[passes.length - 1].renderToScreen = true;
    }
    if (pass.needsDepthTexture || this.depthTexture !== null) {
      if (this.depthTexture === null) {
        const depthTexture = this.createDepthTexture();
        for (pass of passes) {
          pass.setDepthTexture(depthTexture);
        }
      } else {
        pass.setDepthTexture(this.depthTexture);
      }
    }
  }
  removePass(pass) {
    const passes = this.passes;
    const index = passes.indexOf(pass);
    const exists = index !== -1;
    const removed = exists && passes.splice(index, 1).length > 0;
    if (removed) {
      if (this.depthTexture !== null) {
        const reducer = (a, b) => a || b.needsDepthTexture;
        const depthTextureRequired = passes.reduce(reducer, false);
        if (!depthTextureRequired) {
          if (pass.getDepthTexture() === this.depthTexture) {
            pass.setDepthTexture(null);
          }
          this.deleteDepthTexture();
        }
      }
      if (this.autoRenderToScreen) {
        if (index === passes.length) {
          pass.renderToScreen = false;
          if (passes.length > 0) {
            passes[passes.length - 1].renderToScreen = true;
          }
        }
      }
    }
  }
  removeAllPasses() {
    const passes = this.passes;
    this.deleteDepthTexture();
    if (passes.length > 0) {
      if (this.autoRenderToScreen) {
        passes[passes.length - 1].renderToScreen = false;
      }
      this.passes = [];
    }
  }
  render(deltaTime) {
    const renderer = this.renderer;
    const copyPass = this.copyPass;
    let inputBuffer = this.inputBuffer;
    let outputBuffer = this.outputBuffer;
    let stencilTest = false;
    let context, stencil, buffer;
    for (const pass of this.passes) {
      if (pass.enabled) {
        pass.render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest);
        if (pass.needsSwap) {
          if (stencilTest) {
            copyPass.renderToScreen = pass.renderToScreen;
            context = renderer.getContext();
            stencil = renderer.state.buffers.stencil;
            stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
            copyPass.render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest);
            stencil.setFunc(context.EQUAL, 1, 4294967295);
          }
          buffer = inputBuffer;
          inputBuffer = outputBuffer;
          outputBuffer = buffer;
        }
        if (pass instanceof MaskPass) {
          stencilTest = true;
        } else if (pass instanceof ClearMaskPass) {
          stencilTest = false;
        }
      }
    }
  }
  setSize(width, height, updateStyle) {
    const renderer = this.renderer;
    if (width === void 0 || height === void 0) {
      const size = renderer.getSize(new Vector2());
      width = size.width;
      height = size.height;
    } else {
      renderer.setSize(width, height, updateStyle);
    }
    const drawingBufferSize = renderer.getDrawingBufferSize(new Vector2());
    this.inputBuffer.setSize(drawingBufferSize.width, drawingBufferSize.height);
    this.outputBuffer.setSize(drawingBufferSize.width, drawingBufferSize.height);
    for (const pass of this.passes) {
      pass.setSize(drawingBufferSize.width, drawingBufferSize.height);
    }
  }
  reset() {
    this.dispose();
    this.autoRenderToScreen = true;
  }
  dispose() {
    for (const pass of this.passes) {
      pass.dispose();
    }
    this.passes = [];
    if (this.inputBuffer !== null) {
      this.inputBuffer.dispose();
    }
    if (this.outputBuffer !== null) {
      this.outputBuffer.dispose();
    }
    this.deleteDepthTexture();
    this.copyPass.dispose();
  }
};

// src/effects/glsl/bloom/shader.frag
var shader_default44 = "uniform sampler2D texture;\r\nuniform float intensity;\r\n\r\nvoid mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r\n\r\n	outputColor = clamp(texture2D(texture, uv) * intensity, 0.0, 1.0);\r\n\r\n}\r\n";

// src/effects/BloomEffect.js
var BloomEffect = class extends Effect {
  constructor({
    blendFunction = BlendFunction.SCREEN,
    luminanceThreshold = 0.9,
    luminanceSmoothing = 0.025,
    resolutionScale = 0.5,
    intensity = 1,
    width = Resizer.AUTO_SIZE,
    height = Resizer.AUTO_SIZE,
    kernelSize = KernelSize.LARGE
  } = {}) {
    super("BloomEffect", shader_default44, {
      blendFunction,
      uniforms: new Map([
        ["texture", new Uniform(null)],
        ["intensity", new Uniform(intensity)]
      ])
    });
    this.renderTarget = new WebGLRenderTarget(1, 1, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false
    });
    this.renderTarget.texture.name = "Bloom.Target";
    this.renderTarget.texture.generateMipmaps = false;
    this.uniforms.get("texture").value = this.renderTarget.texture;
    this.blurPass = new BlurPass({resolutionScale, width, height, kernelSize});
    this.blurPass.resolution.resizable = this;
    this.luminancePass = new LuminancePass({
      renderTarget: this.renderTarget,
      colorOutput: true
    });
    this.luminancePass.resolution = this.resolution;
    this.luminanceMaterial.threshold = luminanceThreshold;
    this.luminanceMaterial.smoothing = luminanceSmoothing;
  }
  get texture() {
    return this.renderTarget.texture;
  }
  get luminanceMaterial() {
    return this.luminancePass.getFullscreenMaterial();
  }
  get resolution() {
    return this.blurPass.resolution;
  }
  get width() {
    return this.resolution.width;
  }
  set width(value) {
    this.resolution.width = value;
  }
  get height() {
    return this.resolution.height;
  }
  set height(value) {
    this.resolution.height = value;
  }
  get dithering() {
    return this.blurPass.dithering;
  }
  set dithering(value) {
    this.blurPass.dithering = value;
  }
  get kernelSize() {
    return this.blurPass.kernelSize;
  }
  set kernelSize(value) {
    this.blurPass.kernelSize = value;
  }
  get distinction() {
    console.warn(this.name, "The distinction field has been removed, use luminanceMaterial.threshold and luminanceMaterial.smoothing instead.");
    return 1;
  }
  set distinction(value) {
    console.warn(this.name, "The distinction field has been removed, use luminanceMaterial.threshold and luminanceMaterial.smoothing instead.");
  }
  get intensity() {
    return this.uniforms.get("intensity").value;
  }
  set intensity(value) {
    this.uniforms.get("intensity").value = value;
  }
  getResolutionScale() {
    return this.resolution.scale;
  }
  setResolutionScale(scale) {
    this.resolution.scale = scale;
  }
  update(renderer, inputBuffer, deltaTime) {
    const renderTarget = this.renderTarget;
    if (this.luminancePass.enabled) {
      this.luminancePass.render(renderer, inputBuffer, renderTarget);
      this.blurPass.render(renderer, renderTarget, renderTarget);
    } else {
      this.blurPass.render(renderer, inputBuffer, renderTarget);
    }
  }
  setSize(width, height) {
    this.blurPass.setSize(width, height);
    this.renderTarget.setSize(this.resolution.width, this.resolution.height);
  }
  initialize(renderer, alpha, frameBufferType) {
    this.blurPass.initialize(renderer, alpha, frameBufferType);
    if (!alpha && frameBufferType === UnsignedByteType) {
      this.renderTarget.texture.format = RGBFormat;
    }
    if (frameBufferType !== void 0) {
      this.renderTarget.texture.type = frameBufferType;
    }
  }
};

// src/effects/GodRaysEffect.js
new Vector3();
new Matrix4();

// src/images/textures/LookupTexture3D.js
new Color();
new Vector3();
new Vector3();

// src/images/smaa/searchImageDataURL.js
var searchImageDataURL_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAeElEQVRYR+2XSwqAMAxEJ168ePEqwRSKhIIiuHjJqiU0gWE+1CQdApcVAMUAuARaMGCX1MIL/Ow13++9lW2s3mW9MWvsnWc/2fvGygwPAN4E8QzAA4CXAB6AHjG4JTHYI1ey3pcx6FHnEfhLDOIBKAmUBK6/ANUDTlROXAHd9EC1AAAAAElFTkSuQmCC";

// src/images/smaa/areaImageDataURL.js
var areaImageDataURL_default = "data:image/png;base64,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";

// src/effects/glsl/smaa/shader.frag
var shader_default69 = "uniform sampler2D weightMap;\r\n\r\nvarying vec2 vOffset0;\r\nvarying vec2 vOffset1;\r\n\r\n/**\r\n * Moves values to a target vector based on a given conditional vector.\r\n */\r\n\r\nvoid movec(const in bvec2 c, inout vec2 variable, const in vec2 value) {\r\n\r\n	if(c.x) { variable.x = value.x; }\r\n	if(c.y) { variable.y = value.y; }\r\n\r\n}\r\n\r\nvoid movec(const in bvec4 c, inout vec4 variable, const in vec4 value) {\r\n\r\n	movec(c.xy, variable.xy, value.xy);\r\n	movec(c.zw, variable.zw, value.zw);\r\n\r\n}\r\n\r\nvoid mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\r\n\r\n	// Fetch the blending weights for the current pixel.\r\n	vec4 a;\r\n	a.x = texture2D(weightMap, vOffset0).a;\r\n	a.y = texture2D(weightMap, vOffset1).g;\r\n	a.wz = texture2D(weightMap, uv).rb;\r\n\r\n	vec4 color = inputColor;\r\n\r\n	// Ignore tiny blending weights.\r\n	if(dot(a, vec4(1.0)) >= 1e-5) {\r\n\r\n		// max(horizontal) > max(vertical)\r\n		bool h = max(a.x, a.z) > max(a.y, a.w);\r\n\r\n		// Calculate the blending offsets.\r\n		vec4 blendingOffset = vec4(0.0, a.y, 0.0, a.w);\r\n		vec2 blendingWeight = a.yw;\r\n		movec(bvec4(h), blendingOffset, vec4(a.x, 0.0, a.z, 0.0));\r\n		movec(bvec2(h), blendingWeight, a.xz);\r\n		blendingWeight /= dot(blendingWeight, vec2(1.0));\r\n\r\n		// Calculate the texture coordinates.\r\n		vec4 blendingCoord = blendingOffset * vec4(texelSize, -texelSize) + uv.xyxy;\r\n\r\n		// Rely on bilinear filtering to mix the current pixel with the neighbor.\r\n		color = blendingWeight.x * texture2D(inputBuffer, blendingCoord.xy);\r\n		color += blendingWeight.y * texture2D(inputBuffer, blendingCoord.zw);\r\n\r\n	}\r\n\r\n	outputColor = color;\r\n\r\n}\r\n";

// src/effects/glsl/smaa/shader.vert
var shader_default70 = "varying vec2 vOffset0;\r\nvarying vec2 vOffset1;\r\n\r\nvoid mainSupport(const in vec2 uv) {\r\n\r\n	vOffset0 = uv + texelSize * vec2(1.0, 0.0);\r\n	vOffset1 = uv + texelSize * vec2(0.0, 1.0);\r\n\r\n}\r\n";

// src/effects/SMAAEffect.js
var SMAAEffect = class extends Effect {
  constructor(searchImage, areaImage, preset = SMAAPreset.HIGH, edgeDetectionMode = EdgeDetectionMode.COLOR) {
    super("SMAAEffect", shader_default69, {
      vertexShader: shader_default70,
      blendFunction: BlendFunction.NORMAL,
      attributes: EffectAttribute.CONVOLUTION | EffectAttribute.DEPTH,
      uniforms: new Map([
        ["weightMap", new Uniform(null)]
      ])
    });
    this.renderTargetEdges = new WebGLRenderTarget(1, 1, {
      minFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
      format: RGBFormat
    });
    this.renderTargetEdges.texture.name = "SMAA.Edges";
    this.renderTargetWeights = this.renderTargetEdges.clone();
    this.renderTargetWeights.texture.name = "SMAA.Weights";
    this.renderTargetWeights.texture.format = RGBAFormat;
    this.uniforms.get("weightMap").value = this.renderTargetWeights.texture;
    this.clearPass = new ClearPass(true, false, false);
    this.clearPass.overrideClearColor = new Color(0);
    this.clearPass.overrideClearAlpha = 1;
    this.edgeDetectionPass = new ShaderPass(new EdgeDetectionMaterial(new Vector2(), edgeDetectionMode));
    this.weightsPass = new ShaderPass(new SMAAWeightsMaterial());
    const searchTexture = new Texture(searchImage);
    searchTexture.name = "SMAA.Search";
    searchTexture.magFilter = NearestFilter;
    searchTexture.minFilter = NearestFilter;
    searchTexture.format = RGBAFormat;
    searchTexture.generateMipmaps = false;
    searchTexture.needsUpdate = true;
    searchTexture.flipY = true;
    const areaTexture = new Texture(areaImage);
    areaTexture.name = "SMAA.Area";
    areaTexture.minFilter = LinearFilter;
    areaTexture.format = RGBAFormat;
    areaTexture.generateMipmaps = false;
    areaTexture.needsUpdate = true;
    areaTexture.flipY = false;
    const weightsMaterial = this.weightsPass.getFullscreenMaterial();
    weightsMaterial.uniforms.searchTexture.value = searchTexture;
    weightsMaterial.uniforms.areaTexture.value = areaTexture;
    this.applyPreset(preset);
  }
  get edgeDetectionMaterial() {
    return this.edgeDetectionPass.getFullscreenMaterial();
  }
  get colorEdgesMaterial() {
    return this.edgeDetectionMaterial;
  }
  get weightsMaterial() {
    return this.weightsPass.getFullscreenMaterial();
  }
  setEdgeDetectionThreshold(threshold) {
    this.edgeDetectionPass.getFullscreenMaterial().setEdgeDetectionThreshold(threshold);
  }
  setOrthogonalSearchSteps(steps) {
    this.weightsPass.getFullscreenMaterial().setOrthogonalSearchSteps(steps);
  }
  applyPreset(preset) {
    const edgeDetectionMaterial = this.edgeDetectionMaterial;
    const weightsMaterial = this.weightsMaterial;
    switch (preset) {
      case SMAAPreset.LOW:
        edgeDetectionMaterial.setEdgeDetectionThreshold(0.15);
        weightsMaterial.setOrthogonalSearchSteps(4);
        weightsMaterial.diagonalDetection = false;
        weightsMaterial.cornerRounding = false;
        break;
      case SMAAPreset.MEDIUM:
        edgeDetectionMaterial.setEdgeDetectionThreshold(0.1);
        weightsMaterial.setOrthogonalSearchSteps(8);
        weightsMaterial.diagonalDetection = false;
        weightsMaterial.cornerRounding = false;
        break;
      case SMAAPreset.HIGH:
        edgeDetectionMaterial.setEdgeDetectionThreshold(0.1);
        weightsMaterial.setOrthogonalSearchSteps(16);
        weightsMaterial.setDiagonalSearchSteps(8);
        weightsMaterial.setCornerRounding(25);
        weightsMaterial.diagonalDetection = true;
        weightsMaterial.cornerRounding = true;
        break;
      case SMAAPreset.ULTRA:
        edgeDetectionMaterial.setEdgeDetectionThreshold(0.05);
        weightsMaterial.setOrthogonalSearchSteps(32);
        weightsMaterial.setDiagonalSearchSteps(16);
        weightsMaterial.setCornerRounding(25);
        weightsMaterial.diagonalDetection = true;
        weightsMaterial.cornerRounding = true;
        break;
    }
  }
  setDepthTexture(depthTexture, depthPacking = 0) {
    const material = this.edgeDetectionMaterial;
    material.uniforms.depthBuffer.value = depthTexture;
    material.depthPacking = depthPacking;
  }
  update(renderer, inputBuffer, deltaTime) {
    this.clearPass.render(renderer, this.renderTargetEdges);
    this.edgeDetectionPass.render(renderer, inputBuffer, this.renderTargetEdges);
    this.weightsPass.render(renderer, this.renderTargetEdges, this.renderTargetWeights);
  }
  setSize(width, height) {
    const edgeDetectionMaterial = this.edgeDetectionPass.getFullscreenMaterial();
    const weightsMaterial = this.weightsPass.getFullscreenMaterial();
    this.renderTargetEdges.setSize(width, height);
    this.renderTargetWeights.setSize(width, height);
    weightsMaterial.uniforms.resolution.value.set(width, height);
    weightsMaterial.uniforms.texelSize.value.set(1 / width, 1 / height);
    edgeDetectionMaterial.uniforms.texelSize.value.copy(weightsMaterial.uniforms.texelSize.value);
  }
  dispose() {
    const uniforms = this.weightsPass.getFullscreenMaterial().uniforms;
    uniforms.searchTexture.value.dispose();
    uniforms.areaTexture.value.dispose();
    super.dispose();
  }
  static get searchImageDataURL() {
    return searchImageDataURL_default;
  }
  static get areaImageDataURL() {
    return areaImageDataURL_default;
  }
};
var SMAAPreset = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  ULTRA: 3
};
var SMAAImageLoader = class extends Loader {
  load(onLoad = () => {
  }, onError = null) {
    if (arguments.length === 4) {
      onLoad = arguments[1];
      onError = arguments[3];
    } else if (arguments.length === 3 || typeof arguments[0] !== "function") {
      onLoad = arguments[1];
      onError = null;
    }
    const externalManager = this.manager;
    const internalManager = new LoadingManager();
    return new Promise((resolve, reject) => {
      const searchImage = new Image();
      const areaImage = new Image();
      internalManager.onError = (url) => {
        externalManager.itemError(url);
        if (onError !== null) {
          onError(`Failed to load ${url}`);
          resolve();
        } else {
          reject(`Failed to load ${url}`);
        }
      };
      internalManager.onLoad = () => {
        const result = [searchImage, areaImage];
        onLoad(result);
        resolve(result);
      };
      searchImage.addEventListener("error", (e) => {
        internalManager.itemError("smaa-search");
      });
      areaImage.addEventListener("error", (e) => {
        internalManager.itemError("smaa-area");
      });
      searchImage.addEventListener("load", () => {
        externalManager.itemEnd("smaa-search");
        internalManager.itemEnd("smaa-search");
      });
      areaImage.addEventListener("load", () => {
        externalManager.itemEnd("smaa-area");
        internalManager.itemEnd("smaa-area");
      });
      externalManager.itemStart("smaa-search");
      externalManager.itemStart("smaa-area");
      internalManager.itemStart("smaa-search");
      internalManager.itemStart("smaa-area");
      searchImage.src = searchImageDataURL_default;
      areaImage.src = areaImageDataURL_default;
    });
  }
};

export { BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass, SMAAEffect, SMAAImageLoader, SMAAPreset };
