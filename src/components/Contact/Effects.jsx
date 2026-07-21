import * as THREE from 'three'
import { useMemo, useEffect, useRef } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
// FIX 1: Updated import paths to standard Three.js addons syntax
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { SavePass } from 'three/addons/postprocessing/SavePass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { CopyShader } from 'three/addons/shaders/CopyShader.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

extend({ EffectComposer, ShaderPass, SavePass, RenderPass })

// Shader that composites the r,g,b channels of 3 textures, respectively
const triColorMix = {
  uniforms: {
    tDiffuse1: { value: null },
    tDiffuse2: { value: null },
    tDiffuse3: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse1;
    uniform sampler2D tDiffuse2;
    uniform sampler2D tDiffuse3;
    
    void main() {
      vec4 del0 = texture2D(tDiffuse1, vUv);
      vec4 del1 = texture2D(tDiffuse2, vUv);
      vec4 del2 = texture2D(tDiffuse3, vUv);
      float alpha = min(min(del0.a, del1.a), del2.a);
      gl_FragColor = vec4(del0.r, del1.g, del2.b, alpha);
    }
  `
}

export function Effects() {
  const composer = useRef()
  const savePass = useRef()
  const blendPass = useRef()
  const swap = useRef(false) 
  const { scene, gl, size, camera } = useThree()
  
  const { rtA, rtB } = useMemo(() => {
    const rtA = new THREE.WebGLRenderTarget(size.width, size.height)
    const rtB = new THREE.WebGLRenderTarget(size.width, size.height)
    return { rtA, rtB }
  }, [size])
  
  const pixelRatio = gl.getPixelRatio() 

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height)
    }
  }, [size])

  useFrame(() => {
    if (!composer.current || !savePass.current || !blendPass.current) return

    composer.current.render()
    
    let delay1 = swap.current ? rtB : rtA
    let delay2 = swap.current ? rtA : rtB
    
    savePass.current.renderTarget = delay2
    blendPass.current.uniforms['tDiffuse2'].value = delay1.texture
    blendPass.current.uniforms['tDiffuse3'].value = delay2.texture
    swap.current = !swap.current
  }, 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      {/* FIX 2: Changed attachArray="passes" to attach="passes" */}
      <renderPass attach="passes" scene={scene} camera={camera} />
      <shaderPass attach="passes" ref={blendPass} args={[triColorMix, 'tDiffuse1']} needsSwap={false} />
      <savePass attach="passes" ref={savePass} needsSwap={true} />
      <shaderPass
        attach="passes"
        args={[FXAAShader]}
        uniforms-resolution-value-x={1 / (size.width * pixelRatio)}
        uniforms-resolution-value-y={1 / (size.height * pixelRatio)}
      />
      <shaderPass attach="passes" args={[CopyShader]} />
    </effectComposer>
  )
}
