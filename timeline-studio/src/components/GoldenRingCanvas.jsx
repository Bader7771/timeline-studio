import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GoldenRingCanvas() {
  const mount = useRef(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true }); } catch { setFallback(true); return; }
    const initialWidth=host.clientWidth||86; const initialHeight=host.clientHeight||64;
    renderer.setClearColor(0x000000,0); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(initialWidth,initialHeight,false); renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.25; host.appendChild(renderer.domElement);
    const scene=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(35,initialWidth/initialHeight,.1,100); camera.position.set(0,1.6,5.5); camera.lookAt(0,0,0);
    const geometry=new THREE.TorusGeometry(1.35,.24,32,128);
    const material=new THREE.MeshPhysicalMaterial({color:0xd4a017,metalness:1,roughness:.16,clearcoat:1,clearcoatRoughness:.08});
    const ring=new THREE.Mesh(geometry,material); ring.position.set(0,0,0); ring.rotation.x=Math.PI*.63; ring.rotation.z=-.08; scene.add(ring);
    scene.add(new THREE.AmbientLight(0xffffff,1.8));
    const key=new THREE.DirectionalLight(0xffffff,4); key.position.set(3,4,5); scene.add(key);
    const fill=new THREE.DirectionalLight(0xffe4a3,2.5); fill.position.set(-4,1,3); scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,2); rim.position.set(0,-3,-4); scene.add(rim);
    const pointer={x:0,y:0,targetX:0,targetY:0}; let frame=0; let running=true;
    const resize=()=>{const width=host.clientWidth||86;const height=host.clientHeight||64;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height,false)};
    const move=event=>{if(matchMedia("(pointer: coarse)").matches)return;const box=host.getBoundingClientRect();const dx=event.clientX-(box.left+box.width/2);const dy=event.clientY-(box.top+box.height/2);const proximity=Math.max(0,1-Math.hypot(dx,dy)/180);pointer.targetX=dx/180*.12*proximity;pointer.targetY=dy/180*.08*proximity};
    const render=time=>{if(!running)return;pointer.x+=(pointer.targetX-pointer.x)*.045;pointer.y+=(pointer.targetY-pointer.y)*.045;ring.rotation.y=time*.00016+pointer.x;ring.rotation.x=Math.PI*.63+pointer.y;ring.position.y=Math.sin(time*.0015)*.05;renderer.render(scene,camera);frame=requestAnimationFrame(render)};
    const visibility=()=>{running=!document.hidden;if(running)frame=requestAnimationFrame(render);else cancelAnimationFrame(frame)};
    const observer=new ResizeObserver(resize);observer.observe(host);window.addEventListener("pointermove",move,{passive:true});document.addEventListener("visibilitychange",visibility);resize();frame=requestAnimationFrame(render);
    return()=>{running=false;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("pointermove",move);document.removeEventListener("visibilitychange",visibility);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
  },[]);
  return <div ref={mount} className="golden-ring-wrapper" aria-hidden="true">{fallback&&<svg className="golden-ring-fallback" viewBox="0 0 86 64"><ellipse cx="43" cy="32" rx="32" ry="12" fill="none" stroke="#d4a017" strokeWidth="8"/><ellipse cx="43" cy="29" rx="29" ry="8" fill="none" stroke="#ffe4a3" strokeWidth="2"/></svg>}</div>;
}
