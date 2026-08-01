import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HaloFallback from "./HaloFallback";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ease = value => 1 - Math.pow(1 - value, 3);

export default function EditingHalo({ onInteract }) {
  const mount = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false, powerPreference:"high-performance" });
    } catch { setFallback(true); return; }
    if (!renderer.getContext()) { renderer.dispose(); setFallback(true); return; }

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = innerWidth < 700;
    const count = mobile ? 34 : 58;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    camera.position.set(0, .15, mobile ? 13.5 : 11.2);
    const group = new THREE.Group();
    scene.add(group);

    const shape = new THREE.Shape();
    shape.moveTo(-.38,-.25); shape.lineTo(.38,-.25); shape.lineTo(.38,.25); shape.lineTo(-.38,.25); shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-.28,-.15); hole.lineTo(-.28,.15); hole.lineTo(.28,.15); hole.lineTo(.28,-.15); hole.closePath(); shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:1});
    geometry.center();
    const material = new THREE.MeshStandardMaterial({color:0x111111,roughness:.4,metalness:.28});
    const mesh = new THREE.InstancedMesh(geometry,material,count);
    mesh.castShadow=true; mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); group.add(mesh);

    scene.add(new THREE.HemisphereLight(0xffffff,0xe8e8e8,2.2));
    const key = new THREE.DirectionalLight(0xffffff,4); key.position.set(-4,6,7); key.castShadow=true; key.shadow.mapSize.set(512,512); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff,2); rim.position.set(6,-2,4); scene.add(rim);
    const floorMaterial = new THREE.ShadowMaterial({color:0x000000,opacity:.075});
    const floorGeometry = new THREE.PlaneGeometry(12,8); const floor = new THREE.Mesh(floorGeometry,floorMaterial); floor.rotation.x=-Math.PI/2; floor.position.y=-3.15; floor.receiveShadow=true; scene.add(floor);

    renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.35:1.75)); host.appendChild(renderer.domElement);
    const canvas=renderer.domElement; canvas.setAttribute("aria-hidden","true");

    const dummy=new THREE.Object3D(); const position=new THREE.Vector3(); const next=new THREE.Vector3();
    const pointer={x:0,y:0,tx:0,ty:0}; const drag={active:false,moved:false,x:0,y:0,startX:0,startY:0,vx:0,vy:0};
    let userYaw=0,userTilt=0,velocityYaw=0,velocityTilt=0,explosionStart=-1,frame=0,running=true,start=performance.now();
    const pointAt=(index,time,out)=>{
      const angle=index/count*Math.PI*2;
      const irregular=1+.065*Math.sin(angle*3+.4)+.035*Math.cos(angle*5);
      const breathe=reduced?0:Math.sin(time*.00055+angle*2)*.055;
      const radius=3.05*irregular+breathe;
      out.set(Math.cos(angle)*radius,Math.sin(angle)*radius*.77+.12*Math.sin(angle*3),.48*Math.sin(angle*2.05)+.18*Math.cos(angle*3));
      return angle;
    };
    const render=time=>{
      if(!running)return;
      const elapsed=time-start; let burst=0;
      if(explosionStart>=0){const p=Math.min(1,(time-explosionStart)/(reduced?550:1500));burst=Math.sin(p*Math.PI)*ease(Math.min(1,p*2));if(p===1)explosionStart=-1;}
      pointer.x+=(pointer.tx-pointer.x)*.045;pointer.y+=(pointer.ty-pointer.y)*.045;
      if(!drag.active){userYaw+=velocityYaw;userTilt+=velocityTilt;velocityYaw*=.94;velocityTilt*=.9;userYaw*=.999;userTilt*=.985;}
      userYaw=clamp(userYaw,-1.35,1.35);userTilt=clamp(userTilt,-.48,.48);
      group.rotation.y=(reduced?0:elapsed*.000045)+pointer.x*.16+userYaw;
      group.rotation.x=-.12+pointer.y*.11+userTilt;
      group.rotation.z=.08*Math.sin(elapsed*.00018);
      camera.position.x=pointer.x*.16;camera.position.y=.15+pointer.y*.1;camera.lookAt(0,0,0);
      for(let i=0;i<count;i++){
        const angle=pointAt(i,elapsed,position);pointAt((i+1)%count,elapsed,next);
        const localWave=reduced?0:Math.sin(elapsed*.0011-i*.32)*.055;
        position.multiplyScalar(1+burst*(.2+.12*Math.sin(i*1.7)));
        dummy.position.copy(position);dummy.lookAt(next);dummy.rotateY(Math.PI/2);dummy.rotateZ(angle*.08+localWave+burst*Math.sin(i*2.1)*.5);
        const spacing=1+pointer.x*.015*Math.sin(angle)+burst*.15;dummy.scale.set(spacing,.88+localWave*.6,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;renderer.render(scene,camera);frame=requestAnimationFrame(render);
    };
    const resize=()=>{const {width,height}=host.getBoundingClientRect();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height,false);};
    const pointerMove=event=>{const box=host.getBoundingClientRect();pointer.tx=(event.clientX-box.left)/box.width*2-1;pointer.ty=-((event.clientY-box.top)/box.height*2-1);if(drag.active){const dx=event.clientX-drag.x,dy=event.clientY-drag.y;drag.moved ||= Math.abs(event.clientX-drag.startX)+Math.abs(event.clientY-drag.startY)>7;userYaw+=dx*.006;userTilt+=dy*.003;drag.vx=dx*.006;drag.vy=dy*.003;drag.x=event.clientX;drag.y=event.clientY;}};
    const pointerDown=event=>{drag.active=true;drag.moved=false;drag.x=drag.startX=event.clientX;drag.y=drag.startY=event.clientY;canvas.setPointerCapture(event.pointerId);onInteract();};
    const explode=()=>{if(explosionStart<0){explosionStart=performance.now();onInteract();}};
    const pointerUp=event=>{if(!drag.active)return;drag.active=false;velocityYaw=clamp(drag.vx,-.055,.055);velocityTilt=clamp(drag.vy,-.025,.025);if(!drag.moved)explode();canvas.releasePointerCapture(event.pointerId);};
    const keyDown=event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();explode();}};
    const visibility=()=>{running=!document.hidden;if(running){start=performance.now();frame=requestAnimationFrame(render)}else cancelAnimationFrame(frame);};
    resize();addEventListener("resize",resize);host.addEventListener("pointermove",pointerMove);host.addEventListener("pointerdown",pointerDown);host.addEventListener("pointerup",pointerUp);host.addEventListener("pointercancel",pointerUp);host.addEventListener("keydown",keyDown);document.addEventListener("visibilitychange",visibility);frame=requestAnimationFrame(render);
    return()=>{running=false;cancelAnimationFrame(frame);removeEventListener("resize",resize);host.removeEventListener("pointermove",pointerMove);host.removeEventListener("pointerdown",pointerDown);host.removeEventListener("pointerup",pointerUp);host.removeEventListener("pointercancel",pointerUp);host.removeEventListener("keydown",keyDown);document.removeEventListener("visibilitychange",visibility);geometry.dispose();material.dispose();floorGeometry.dispose();floorMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
  },[onInteract]);

  return <div ref={mount} className="threejs-wrapper" tabIndex="0" role="button" aria-label="Interactive twisted film-loop sculpture. Drag to rotate or press Enter to expand it.">{fallback&&<HaloFallback/>}</div>;
}
