/* Shared illustrative models for the museum and equipment rooms. */
window.SpaceModelLib = (() => {
/* Illustrative models reused by the museum and viewer. */
const mat=(c,m=.4,r=.5)=>new THREE.MeshStandardMaterial({color:c,metalness:m,roughness:r});
const M={white:mat(0xf1f5f9,.2,.55),grey:mat(0x94a3b8,.7,.35),dark:mat(0x1e293b,.35,.65),gold:mat(0xfbbf24,.85,.2),
  blue:mat(0x2563eb,.5,.35),red:mat(0xdc2626,.3,.55),orange:mat(0x38bdf8,.3,.5),silver:mat(0xe2e8f0,.9,.2)};
function mesh(g,m,x=0,y=0,z=0,rx=0,ry=0,rz=0,parent){
  const o=new THREE.Mesh(g,m); o.position.set(x,y,z); o.rotation.set(rx,ry,rz); o.castShadow=true;
  if(parent)parent.add(o); return o;
}
const box=(w,h,d)=>new THREE.BoxGeometry(w,h,d), cyl=(a,b,h,s=20)=>new THREE.CylinderGeometry(a,b,h,s), sph=r=>new THREE.SphereGeometry(r,24,24);
const wheel=(g,x,y,z,m=M.dark)=>mesh(cyl(.14,.14,.1,20),m,x,y,z,0,0,Math.PI/2,g);

const MODELS={
  lunar(){const g=new THREE.Group();
    mesh(box(.9,.08,.5),M.silver,0,.22,0,0,0,0,g);
    [[-.38,-.3],[-.38,.3],[.38,-.3],[.38,.3]].forEach(([x,z])=>{const w=mesh(cyl(.17,.17,.08,20),M.grey,x,.17,z,Math.PI/2,0,0,g);});
    mesh(box(.22,.2,.4),M.dark,.3,.35,0,0,0,0,g);
    [-.12,.08].forEach(x=>mesh(box(.14,.2,.34),M.white,x-.05,.4,0,0,0,0,g));
    mesh(cyl(.015,.015,.3,8),M.dark,-.15,.5,0,0,0,0,g);
    mesh(cyl(.015,.015,.45,8),M.silver,-.4,.5,.1,0,0,0,g);
    mesh(new THREE.ConeGeometry(.2,.12,20,1,true),M.gold,-.4,.75,.1,Math.PI,0,0,g);
    mesh(box(.12,.08,.1),M.dark,.45,.5,-.05,0,0,0,g);
    return g;},
  perseverance(){const g=new THREE.Group();
    mesh(box(.8,.22,.5),M.white,0,.38,0,0,0,0,g);
    [-.32,0,.32].forEach(x=>[-.3,.3].forEach(z=>mesh(cyl(.12,.12,.08,16),M.dark,x,.14,z,Math.PI/2,0,0,g)));
    mesh(cyl(.025,.025,.5,8),M.grey,-.25,.75,0,0,0,0,g);
    mesh(box(.22,.12,.14),M.dark,-.25,1.02,0,0,0,0,g);
    mesh(cyl(.04,.04,.4,8),M.silver,.45,.35,0,0,0,Math.PI/2.5,g);
    mesh(sph(.06),M.orange,.62,.28,0,0,0,0,g);
    mesh(cyl(.12,.12,.02,20),M.silver,.2,.52,0,0,0,0,g);
    return g;},
  canadarm(){const g=new THREE.Group();
    mesh(box(.5,.12,.5),M.grey,0,.06,0,0,0,0,g);
    mesh(sph(.1),M.white,0,.2,0,0,0,0,g);
    mesh(cyl(.07,.07,.55,16),M.white,-.1,.5,0,0,0,.35,g);
    mesh(sph(.1),M.blue,-.2,.78,0,0,0,0,g);
    mesh(cyl(.07,.07,.5,16),M.white,.02,.95,0,0,0,-.5,g);
    mesh(sph(.1),M.blue,.24,1.1,0,0,0,0,g);
    mesh(box(.1,.1,.1),M.dark,.2,1.22,.08,0,0,0,g);
    mesh(cyl(.06,.06,.2,12),M.silver,.4,1.0,0,0,0,-1.1,g);
    return g;},
  suit(){const g=new THREE.Group();
    mesh(box(.4,.45,.22),M.white,0,.62,0,0,0,0,g);
    mesh(box(.3,.4,.14),M.grey,0,.64,-.18,0,0,0,g);
    mesh(sph(.17),M.white,0,1.0,0,0,0,0,g);
    mesh(sph(.13),M.gold,0,1.0,.07,0,0,0,g);
    [-.28,.28].forEach(x=>{mesh(cyl(.06,.06,.4,12),M.white,x,.6,0,0,0,x>0?-.2:.2,g); mesh(sph(.07),M.dark,x*1.2,.4,0,0,0,0,g);});
    [-.1,.1].forEach(x=>mesh(cyl(.075,.075,.45,12),M.white,x,.2,0,0,0,0,g));
    return g;},
  dextre(){const g=new THREE.Group();
    mesh(box(.4,.3,.3),M.grey,0,.35,0,0,0,0,g);
    mesh(box(.5,.08,.4),M.dark,0,.16,0,0,0,0,g);
    mesh(sph(.1),M.white,0,.62,0,0,0,0,g);
    mesh(box(.08,.06,.06),M.dark,0,.62,.1,0,0,0,g);
    [-1,1].forEach(s=>{
      mesh(cyl(.045,.045,.4,10),M.white,s*.32,.58,0,0,0,s*-.5,g);
      mesh(sph(.06),M.blue,s*.42,.8,0,0,0,0,g);
      mesh(cyl(.04,.04,.3,10),M.white,s*.5,.95,0,0,0,s*.3,g);
    });
    return g;},
  hubble(){const g=new THREE.Group();
    const tube=mesh(cyl(.22,.22,.8,28),M.silver,0,.55,0,0,0,Math.PI/2,g);
    mesh(cyl(.25,.25,.15,28),M.dark,-.45,.55,0,0,0,Math.PI/2,g);
    mesh(cyl(.19,.19,.02,28),M.gold,.41,.55,0,0,0,Math.PI/2,g);
    mesh(cyl(.26,.26,.3,28),M.grey,.25,.55,0,0,0,Math.PI/2,g);
    [-1,1].forEach(s=>mesh(box(.04,.7,.35),M.blue,0,.55,s*.5,0,0,0,g));
    mesh(cyl(.01,.01,.35,8),M.silver,-.1,.85,0,0,0,0,g);
    mesh(new THREE.ConeGeometry(.1,.06,16,1,true),M.white,-.1,1.05,0,Math.PI,0,0,g);
    g.rotation.y=-.5; return g;},
  apollo_lm(){const g=new THREE.Group();
    mesh(cyl(.44,.44,.32,8),M.gold,0,.36,0,0,Math.PI/8,0,g);
    mesh(cyl(.22,.26,.1,8),M.dark,0,.56,0,0,0,0,g);
    mesh(cyl(.14,.18,.12,16),M.dark,0,.16,0,0,0,0,g);
    [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4].forEach(a=>{
      const cx=Math.cos(a), cz=Math.sin(a);
      mesh(cyl(.1,.11,.025,16),M.gold,cx*.64,.015,cz*.64,0,0,0,g);
      mesh(cyl(.022,.022,.44,10),M.gold,cx*.52,.22,cz*.52,cz*.48,0,-cx*.48,g);
      mesh(cyl(.015,.015,.26,8),M.silver,cx*.48,.34,cz*.48,-cz*.7,0,cx*.7,g);
    });
    mesh(box(.08,.36,.02),M.silver,.46,.26,.34,0,-.6,-.35,g);
    mesh(cyl(.012,.012,.22,8),M.silver,.2,.66,0,0,0,0,g);
    return g;},
  alsep(){const g=new THREE.Group();
    mesh(box(.28,.2,.22),M.white,-.16,.12,0,0,0,0,g);
    mesh(cyl(.015,.015,.48,8),M.silver,-.16,.44,0,0,0,0,g);
    mesh(cyl(.035,.035,.16,12),M.gold,-.16,.72,0,0,0,0,g);
    mesh(cyl(.07,.07,.26,12),M.dark,.22,.15,-.18,0,0,0,g);
    mesh(box(.2,.02,.2),M.grey,.22,.15,-.18,0,0,0,g);
    mesh(cyl(.1,.13,.16,16),M.gold,.2,.1,.2,0,0,0,g);
    mesh(box(.18,.04,.16),M.silver,-.18,.06,.26,.35,0,0,g);
    mesh(box(.32,.01,.03),M.gold,.02,.02,-.08,0,.4,0,g);
    mesh(box(.32,.01,.03),M.gold,.02,.02,.1,0,-.4,0,g);
    return g;},
  surveyor(){const g=new THREE.Group();
    mesh(cyl(.15,.15,.14,16),M.gold,0,.28,0,0,0,0,g);
    mesh(box(.16,.16,.14),M.white,-.12,.34,.1,0,.3,0,g);
    mesh(box(.16,.16,.14),M.white,.12,.34,-.1,0,.3,0,g);
    [0,2.094,4.188].forEach(a=>{
      const cx=Math.cos(a), cz=Math.sin(a);
      mesh(cyl(.085,.085,.025,14),M.grey,cx*.54,.015,cz*.54,0,0,0,g);
      mesh(cyl(.018,.018,.44,8),M.silver,cx*.34,.18,cz*.34,cz*.85,0,-cx*.85,g);
    });
    mesh(cyl(.02,.02,.65,8),M.silver,0,.62,0,0,0,0,g);
    mesh(box(.34,.02,.24),M.blue,0,.96,0,.35,.2,0,g);
    mesh(box(.22,.2,.02),M.white,.14,.8,0,0,0,-.3,g);
    return g;},
  sojourner(){const g=new THREE.Group();
    mesh(box(.46,.13,.32),M.gold,0,.2,0,0,0,0,g);
    mesh(box(.52,.02,.38),M.blue,0,.28,0,0,0,0,g);
    [-.2,0,.2].forEach(x=>[-.21,.21].forEach(z=>{
      mesh(cyl(.075,.075,.055,14),M.dark,x,.08,z,Math.PI/2,0,0,g);
      mesh(cyl(.012,.012,.14,8),M.silver,x,.14,z*.8,0,0,0,g);
    }));
    mesh(box(.04,.04,.14),M.dark,.24,.22,0,0,0,0,g);
    mesh(box(.08,.08,.08),M.grey,-.24,.18,.08,0,0,0,g);
    mesh(cyl(.006,.006,.34,6),M.silver,-.22,.45,-.12,0,0,0,g);
    return g;},
  mer(){const g=new THREE.Group();
    mesh(box(.34,.15,.34),M.gold,0,.25,0,0,0,0,g);
    mesh(box(.6,.025,.66),M.blue,0,.34,0,0,Math.PI/4,0,g);
    [-1,1].forEach(s=>mesh(box(.26,.025,.42),M.blue,0,.34,s*.42,s*.15,0,0,g));
    [-.25,0,.25].forEach(x=>[-.26,.26].forEach(z=>{
      mesh(cyl(.085,.085,.065,16),M.dark,x,.09,z,Math.PI/2,0,0,g);
      mesh(cyl(.014,.014,.16,8),M.silver,x,.16,z*.85,0,0,0,g);
    }));
    mesh(cyl(.02,.02,.44,8),M.white,.18,.56,.1,0,0,0,g);
    mesh(box(.07,.07,.22),M.white,.18,.8,.1,0,0,0,g);
    mesh(box(.02,.04,.18),M.dark,.22,.8,.1,0,0,0,g);
    mesh(cyl(.1,.1,.02,18),M.white,-.15,.39,-.12,0,0,0,g);
    mesh(cyl(.015,.015,.26,8),M.silver,.32,.26,-.08,0,0,1.2,g);
    return g;},
  viking(){const g=new THREE.Group();
    mesh(cyl(.36,.36,.2,6),M.white,0,.32,0,0,0,0,g);
    [0,2.094,4.188].forEach(a=>{
      const cx=Math.cos(a), cz=Math.sin(a);
      mesh(cyl(.08,.08,.025,14),M.grey,cx*.54,.015,cz*.54,0,0,0,g);
      mesh(cyl(.02,.02,.36,8),M.silver,cx*.42,.16,cz*.42,cz*.65,0,-cx*.65,g);
    });
    [-.2,.2].forEach(z=>mesh(cyl(.08,.08,.24,12),M.grey,-.04,.48,z,0,0,Math.PI/2,g));
    mesh(cyl(.015,.015,.32,8),M.silver,-.14,.56,0,0,0,0,g);
    mesh(new THREE.ConeGeometry(.18,.08,20,1,true),M.white,-.14,.74,0,Math.PI-.4,0,0,g);
    [-.13,.13].forEach(z=>mesh(cyl(.04,.04,.16,12),M.white,.16,.5,z,0,0,0,g));
    mesh(cyl(.014,.014,.4,8),M.silver,.38,.28,0,0,0,Math.PI/2.3,g);
    return g;},
  phoenix_insight(){const g=new THREE.Group();
    mesh(cyl(.32,.32,.15,8),M.gold,0,.32,0,0,Math.PI/8,0,g);
    [0,2.094,4.188].forEach(a=>{
      const cx=Math.cos(a), cz=Math.sin(a);
      mesh(cyl(.075,.075,.025,14),M.grey,cx*.48,.015,cz*.48,0,0,0,g);
      mesh(cyl(.018,.018,.34,8),M.silver,cx*.36,.16,cz*.36,cz*.65,0,-cx*.65,g);
    });
    [-1,1].forEach(s=>mesh(cyl(.3,.3,.02,24),M.blue,0,.36,s*.5,0,0,0,g));
    mesh(cyl(.085,.1,.11,6),M.gold,.12,.44,-.08,0,0,0,g);
    mesh(cyl(.016,.016,.34,8),M.orange,.16,.46,.14,0,.4,.9,g);
    return g;},
  dawn(){const g=new THREE.Group();
    mesh(cyl(.03,.16,.34,12),M.dark,0,.17,0,0,0,0,g);
    mesh(box(.3,.36,.3),M.gold,0,.54,0,0,0,0,g);
    mesh(new THREE.ConeGeometry(.18,.08,20,1,true),M.white,0,.82,0,Math.PI,0,0,g);
    mesh(new THREE.ConeGeometry(.07,.1,14),M.blue,0,.32,0,Math.PI,0,0,g);
    [-1,1].forEach(s=>{
      mesh(cyl(.015,.015,.16,8),M.silver,0,.54,s*.22,Math.PI/2,0,0,g);
      mesh(box(.02,.24,.64),M.blue,0,.54,s*.58,0,0,0,g);
    });
    return g;},
  near(){const g=new THREE.Group();
    mesh(cyl(.03,.16,.28,12),M.dark,0,.14,0,0,0,0,g);
    mesh(cyl(.26,.26,.36,8),M.gold,0,.44,0,0,Math.PI/8,0,g);
    mesh(new THREE.ConeGeometry(.25,.09,24,1,true),M.white,0,.68,0,Math.PI,0,0,g);
    [-1,1].forEach(s=>{
      mesh(box(.34,.02,.18),M.blue,s*.42,.46,0,0,0,0,g);
      mesh(box(.18,.02,.34),M.blue,0,.46,s*.42,0,0,0,g);
    });
    return g;},
  pioneer(){const g=new THREE.Group();
    mesh(cyl(.03,.16,.4,12),M.dark,0,.2,0,0,0,0,g);
    mesh(cyl(.17,.17,.14,6),M.gold,0,.56,-.1,0,0,0,g);
    mesh(new THREE.ConeGeometry(.42,.14,28,1,true),M.white,0,.64,.04,Math.PI/2.4,0,0,g);
    mesh(cyl(.01,.01,.24,8),M.silver,0,.7,.2,Math.PI/2.4,0,0,g);
    mesh(sph(.035),M.gold,0,.76,.3,0,0,0,g);
    [-1,1].forEach(s=>{
      mesh(cyl(.01,.01,.44,8),M.silver,s*.34,.56,-.1,0,0,Math.PI/2,g);
      mesh(cyl(.035,.035,.12,10),M.dark,s*.58,.56,-.1,0,0,Math.PI/2,g);
    });
    return g;},
  ingenuity(){const g=new THREE.Group();
    mesh(box(.15,.13,.15),M.gold,0,.32,0,0,0,0,g);
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([sx,sz])=>{
      mesh(cyl(.008,.008,.34,6),M.dark,sx*.14,.16,sz*.14,sz*.42,0,-sx*.42,g);
    });
    mesh(cyl(.014,.014,.34,8),M.silver,0,.54,0,0,0,0,g);
    mesh(box(.8,.01,.055),M.dark,0,.58,0,0,.3,0,g);
    mesh(box(.055,.01,.8),M.dark,0,.65,0,0,.3,0,g);
    mesh(box(.26,.015,.14),M.blue,0,.72,0,0,0,0,g);
    return g;},
  kepler(){const g=new THREE.Group();
    mesh(cyl(.03,.16,.24,12),M.dark,0,.12,0,0,0,0,g);
    mesh(cyl(.25,.25,.2,6),M.gold,0,.32,0,0,0,0,g);
    mesh(cyl(.2,.2,.6,24),M.silver,0,.7,0,0,0,0,g);
    mesh(cyl(.21,.21,.16,24),M.dark,0,1.04,0,.22,0,0,g);
    mesh(cyl(.18,.18,.02,24),M.gold,0,1.0,0,0,0,0,g);
    [0,1.57,3.14,4.71].forEach(a=>{
      const cx=Math.cos(a), cz=Math.sin(a);
      mesh(box(.24,.32,.02),M.blue,cx*.32,.52,cz*.32,cz*.28,-a+Math.PI/2,-cx*.28,g);
    });
    return g;}
};


return { MODELS, mat, M, mesh, box, cyl, sph, wheel };
})();
