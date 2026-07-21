import { useRef, useMemo, useEffect, useState } from "react";
import { useControls } from "leva";
import { debounce } from "lodash";

// 3D
import * as THREE from "three";
import { PointLightHelper } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useHelper, Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "../../assets/shaders/vertex.glsl?raw";
import vertexShaderMobile from "../../assets/shaders/vertex_mobile.glsl?raw";
import fragmentShader from "../../assets/shaders/fragment.glsl?raw";
import html2canvas from "html2canvas";



const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });
      setTexture(new THREE.CanvasTexture(canvas));
        hideCloned();
    };

    const hideCloned = () => {
      domEl.style.display = 'none';
    };

    convertDomToCanvas();
  

    const debouncedResize = debounce(() => {
      domEl.style.display = 'flex';
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);



  return texture;
};

function Lights() {
  const pointLightRef = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.7, "cyan");

  const config = useControls("Lights", {
    color: "#471f1f",
    intensity: { value: 1134, min: 0, max: 5000, step: 0.01 },
    distance: { value: 14.2, min: 0, max: 100, step: 0.1 },
    decay: { value: 1.8, min: 0, max: 5, step: 0.1 },
    position: { value: [1, 4, 6] },
  });
  return <pointLight ref={pointLightRef} {...config} />;
}

function Scene({isMobile}) {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);

  const materialRef = useRef();
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [textureDOM]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.mouse;
    mouseLerped.current.x = THREE.MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
    mouseLerped.current.y = THREE.MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="kvText inner">
          <div>
              <h1>TIMOTHY TAN</h1>
              <span className="text-subtitle"><span>FRONT-END</span><span>DEVELOPER</span><span>//</span></span>
          </div>
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 254, 254]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={isMobile?vertexShaderMobile:vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          silent
        />
        <Lights />
      </mesh>
    </>
  );
}

export default Scene;