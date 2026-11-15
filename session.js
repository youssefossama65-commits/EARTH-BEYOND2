const { MODELS, mat, M, mesh, box, cyl, sph, wheel } = window.SpaceModelLib;
const DATA = {
  lunar:{name:"Apollo Lunar Rover",sum:"A battery-powered electric moon buggy driven by astronauts and parked permanently in the lunar dust.",task:"Drive across the lunar surface and transmit scientific information.",parts:["Mesh wheels","Battery system","Communication antenna","TV camera","Control handle","Astronaut seats"]},
  perseverance:{name:"Perseverance Rover",sum:"A robotic rover designed to explore Mars and investigate its geology.",task:"Investigate rocks and the ancient environment of Jezero Crater.",parts:["Six-wheel mobility system","Navigation cameras","Robotic arm","Communication system"]},
  canadarm:{name:"Canadarm2",sum:"A large robotic arm used aboard the International Space Station.",task:"Move equipment and assist astronauts during station operations.",parts:["Robotic arm","Rotating joints","Camera system","End effector"]},
  suit:{name:"Space Suit",sum:"A protective suit that lets astronauts work outside their spacecraft.",task:"Support astronauts during spacewalks.",parts:["Helmet","Protective visor","Life support backpack","Gloves"]},
  dextre:{name:"Dextre Robot",sum:"A robotic maintenance system that works outside the space station.",task:"Assist with maintenance and equipment handling in orbit.",parts:["Robotic arms","Camera system","Tool platform"]},
  hubble:{name:"Hubble Space Telescope",sum:"A space telescope that observes planets, stars, galaxies and distant objects.",task:"Collect light from space to help scientists study the universe.",parts:["Primary mirror","Solar panels","Communication antennas","Scientific instruments"]},
  apollo_lm:{name:"Apollo Lunar Module",sum:"The gold-wrapped descent stage of the Lunar Module (like Apollo 11's Eagle) left behind on the Moon as a giant launch pad.",task:"Land astronauts safely on the lunar surface and serve as the ascent launch platform.",parts:["Octagonal descent stage","Kapton thermal foil","Four landing legs & footpads","Descent engine nozzle","Surface ladder"]},
  alsep:{name:"ALSEP Scientific Package",sum:"Apollo Lunar Surface Experiments Package left behind to measure moonquakes and bounce lasers back to Earth.",task:"Measure moonquakes, solar wind, and Earth-Moon distance via laser retroreflectors.",parts:["Central telemetry station","RTG nuclear power source","Passive seismometer","Laser retroreflector","S-band helical antenna"]},
  surveyor:{name:"Surveyor Lander",sum:"1960s robotic lunar scouts that proved soft Moon landings were possible before Apollo.",task:"Test lunar surface soil properties and demonstrate controlled soft-landing radar technology.",parts:["Triangular spaceframe","Three hinged landing legs","Solar panel mast","Planar high-gain antenna","Solid retro-rocket"]},
  sojourner:{name:"Sojourner Rover",sum:"The very first wheeled rover to ever roll across Mars in 1997, delivered by Mars Pathfinder.",task:"Analyze Martian rocks and soil composition in Ares Vallis.",parts:["Six-wheel rocker-bogie","Top solar array","Stereo front cameras","Alpha Proton X-ray Spectrometer"]},
  mer:{name:"Spirit & Opportunity Rovers",sum:"Twin Mars Exploration Rovers that explored Mars for years far beyond their planned 90-day mission.",task:"Search for geological evidence of past liquid water on opposite sides of Mars.",parts:["Bat-wing solar arrays","PanCam stereo mast","Six-wheel mobility system","High-gain dish antenna","Rock abrasion arm"]},
  viking:{name:"Viking 1 & 2 Landers",sum:"The first American landers to safely operate on Mars in 1976, remaining exactly where they touched down.",task:"Capture high-resolution surface images and conduct biological soil experiments.",parts:["Hexagonal lander body","Dual RTG power covers","Parabolic dish antenna","Surface sampler arm","Three landing legs"]},
  phoenix_insight:{name:"Phoenix & InSight Landers",sum:"Stationary Mars landers; Phoenix dug for Martian arctic water ice while InSight listened for deep marsquakes.",task:"Study Martian polar ice chemistry and monitor seismic activity in Mars' interior.",parts:["Twin circular solar arrays","Octagonal lander deck","Seismometer copper dome","Robotic grapple arm","Three shock-absorbing legs"]},
  dawn:{name:"Dawn Spacecraft",sum:"Orbiter that mapped giant asteroid-belt worlds Vesta and Ceres and now circles Ceres forever without fuel.",task:"Characterize giant protoplanets in the main asteroid belt using ion propulsion.",parts:["Twin massive solar wings","Xenon ion thrusters","High-gain dish antenna","Framing cameras"]},
  near:{name:"NEAR Shoemaker",sum:"First spaceship to ever orbit and gently land on an asteroid, resting on the surface of 433 Eros.",task:"Study the composition, density, and magnetic field of near-Earth asteroid 433 Eros.",parts:["Octagonal spacecraft bus","Fixed parabolic dish","Four cross-wing solar panels","X-ray/gamma-ray spectrometer"]},
  pioneer:{name:"Pioneer 10 & 11",sum:"Silent early deep-space probes that explored Jupiter and Saturn and are drifting right out of our solar system.",task:"Traverse the asteroid belt, study outer gas giants, and carry humanity's golden plaque.",parts:["Large parabolic dish","Hexagonal equipment bus","Extended RTG nuclear booms","Magnetometer boom"]},
  ingenuity:{name:"Ingenuity Helicopter",sum:"The first aircraft to fly on another planet, completing 72 flights on Mars before damaging its rotor blades.",task:"Demonstrate aerial scouting in Mars' thin atmosphere alongside Perseverance.",parts:["Coaxial carbon rotor blades","Top charging solar panel","Insulated fuselage box","Four carbon-fiber legs"]},
  kepler:{name:"Kepler Space Telescope",sum:"Revolutionary planet-hunting telescope that discovered thousands of exoplanets before running out of fuel.",task:"Monitor star brightness continuously to detect Earth-size exoplanets via transits.",parts:["0.95m Schmidt photometer","Angled sunshade hood","Hexagonal spacecraft bus","Four-panel solar array"]}
};

let scene,camera,renderer,hovered=null,isLocked=false,infoOpen=false,pitch=0,yaw=0,prev=performance.now();
const keys={f:0,b:0,l:0,r:0}, vel=new THREE.Vector3(), dir=new THREE.Vector3();
const hits=[], spinners=[], ray=new THREE.Raycaster();
const holoRings=[], cosmicBodies=[];
let ambientMotes=null;
const pedestals=[];
const rig={sprint:0,crouch:0,zoom:0,jump:0,playerY:1.7,vy:0,grounded:true,coyote:0,jumpBuf:0,landDip:0,
  bobPhase:0,stepSide:1,roll:0,smoothYaw:0,smoothPitch:0,dashX:0,dashZ:0,dashCd:0,dashFov:0,prevX:0,prevZ:12};
let audioCtx=null;
const $=id=>document.getElementById(id);

const exhibitMap={};
const session={started:false,active:false,completed:false,elapsed:0,stepIdx:-1,detailShown:false,
  camPos:new THREE.Vector3(0,1.7,12),camLook:new THREE.Vector3(0,1.7,0),camFov:70,
  touchLookId:null,touchLastX:0,touchLastY:0,touchMoveId:null,touchStartX:0,touchStartY:0};

// Speed changes take effect on the next short phrase, without rewinding the tour.
let tourSpeed=1;
let voiceGeneration=0;

const TOUR_TIMELINE=[
  {key:null,tag:"WELCOME · BEYOND EARTH",duration:31.2,zoomAt:1,
   line:"Welcome, space explorer! Have you ever wondered what happens to NASA’s greatest spaceships and robots after their big missions are over? They don’t come back home! Instead, they are left behind—resting on dusty moons, floating in the dark, or flying silently through deep space forever. Step inside this secret space room, where these legendary machines are waiting just for you. Let’s take a closer look!",
   path:[[0,2.3,13.5],[0,1.95,4.5],[0,1.75,-4.5]],
   lookAt:[[0,2.6,-14],[0,2.2,-14],[0,1.65,-14]]},

  {key:"apollo_lm",tag:"LUNAR ARCHIVE · 01 / 13",duration:16.0,zoomAt:.48,
   line:"First, the Apollo Lunar Modules—their gold-wrapped bottom halves stayed on the Moon as giant launch pads! Equipped with four shock-absorbing landing legs, a powerful descent engine nozzle, and the iconic surface ladder.",
   path:[[-2.2,-12.5],[-3.6,-15]],viewPos:[-3.6,1.65,-15],zoomPos:[-4.75,1.48,-15],target:[-7,1.28,-15],orbitAngle:.26},

  {key:"lunar",tag:"LUNAR ARCHIVE · 02 / 13",duration:14.6,zoomAt:.48,
   line:"Next, the Lunar Roving Vehicles—three electric moon buggies parked permanently in the lunar dust! Built with wire-mesh wheels, a dual-battery power system, astronaut seats, and a high-gain umbrella antenna.",
   path:[[-3.6,-12.5]],viewPos:[-3.6,1.6,-10],zoomPos:[-4.8,1.42,-10],target:[-7,1.22,-10],orbitAngle:-.26},

  {key:"alsep",tag:"LUNAR ARCHIVE · 03 / 13",duration:15.6,zoomAt:.59,
   line:"Here are the ALSEP Science Packages—smart stations left behind to measure moonquakes and bounce laser beams back to Earth! Powered by a nuclear RTG generator, passive seismometers, and a laser retroreflector.",
   path:[[-3.6,-2],[-3.6,6]],viewPos:[-3.6,1.6,11],zoomPos:[-4.8,1.42,11],target:[-7,1.2,11],orbitAngle:.25},

  {key:"surveyor",tag:"LUNAR ARCHIVE · 04 / 13",duration:15.1,zoomAt:.46,
   line:"Behold the Surveyor Landers—1960s robotic scouts that proved soft Moon landings were possible! Featuring a lightweight triangular frame, three hinged landing legs, a solar panel mast, and a planar antenna.",
   path:[[0,11],[0,-3],[1.8,-13.5]],viewPos:[3.6,1.65,-15],zoomPos:[4.8,1.48,-15],target:[7,1.32,-15],orbitAngle:-.25},

  {key:"sojourner",tag:"MARS ARCHIVE · 05 / 13",duration:14.6,zoomAt:.38,
   line:"Meet Sojourner—the very first rover to ever roll across Mars in 1997! This compact six-wheeled explorer carries a top solar array, stereo front cameras, and an X-ray rock spectrometer.",
   path:[[3.6,-5],[3.6,5]],viewPos:[3.6,1.58,11],zoomPos:[4.85,1.36,11],target:[7,1.16,11],orbitAngle:.26},

  {key:"mer",tag:"MARS ARCHIVE · 06 / 13",duration:15.6,zoomAt:.55,
   line:"Now look at Spirit and Opportunity—twin rovers that explored Mars for years far beyond their planned mission! Driven by bat-wing solar arrays, a panoramic stereo camera mast, and a rock-grinding arm.",
   path:[[-2,11],[-10.8,11],[-10.8,-3]],viewPos:[-10.8,1.62,-13],zoomPos:[-12.15,1.44,-13],target:[-14.5,1.25,-13],orbitAngle:-.24},

  {key:"viking",tag:"MARS ARCHIVE · 07 / 13",duration:16.5,zoomAt:.49,
   line:"Over here are Viking 1 and 2—the first American landers to safely operate on Mars in 1976! Built with a hexagonal body, dual nuclear power covers, a dish antenna, and a soil-sampling arm.",
   path:[[-10.8,-9]],viewPos:[-10.8,1.62,-5.5],zoomPos:[-12.15,1.44,-5.5],target:[-14.5,1.25,-5.5],orbitAngle:.24},

  {key:"phoenix_insight",tag:"MARS ARCHIVE · 08 / 13",duration:16.0,zoomAt:.55,
   line:"Next are Phoenix and InSight—stationary landers that dug for Martian arctic ice and listened for deep marsquakes! Powered by twin circular solar arrays, a robotic grapple arm, and a copper seismometer dome.",
   path:[[-10.8,-1.5]],viewPos:[-10.8,1.62,2],zoomPos:[-12.15,1.44,2],target:[-14.5,1.24,2],orbitAngle:-.24},

  {key:"dawn",tag:"DEEP SPACE · 09 / 13",duration:15.1,zoomAt:.57,
   line:"Look up at Dawn—it mapped giant asteroid-belt worlds Vesta and Ceres and now orbits Ceres forever without fuel! Equipped with massive solar wings, xenon ion thrusters, and precision framing cameras.",
   path:[[-10.8,-3],[0,-3],[10.8,-3],[10.8,-9]],viewPos:[10.8,1.65,-13],zoomPos:[12.15,1.5,-13],target:[14.5,1.35,-13],orbitAngle:.24},

  {key:"near",tag:"DEEP SPACE · 10 / 13",duration:15.6,zoomAt:.51,
   line:"Here is NEAR Shoemaker—the first spaceship to ever orbit and gently land on an asteroid, 433 Eros! Featuring an octagonal spacecraft bus, four cross-wing solar panels, and a fixed parabolic dish.",
   path:[[10.8,-9]],viewPos:[10.8,1.62,-5.5],zoomPos:[12.15,1.46,-5.5],target:[14.5,1.3,-5.5],orbitAngle:-.24},

  {key:"pioneer",tag:"DEEP SPACE · 11 / 13",duration:15.1,zoomAt:.44,
   line:"Behold Pioneer 10 and 11—silent deep-space probes drifting right out of our solar system! Carrying a massive dish antenna, extended nuclear power booms, a magnetometer, and humanity’s golden message plaque.",
   path:[[10.8,-1.5]],viewPos:[10.8,1.65,2],zoomPos:[12.15,1.5,2],target:[14.5,1.34,2],orbitAngle:.24},

  {key:"ingenuity",tag:"MARS AVIATION · 12 / 13",duration:15.6,zoomAt:.62,
   line:"Meet Ingenuity—the first aircraft to fly on another planet, completing seventy-two flights on Mars before damaging its blades! Built with coaxial carbon rotors, a top solar panel, and four lightweight legs.",
   path:[[10.8,11],[0,11],[-10.8,11]],viewPos:[-10.8,1.62,9.5],zoomPos:[-12.15,1.46,9.5],target:[-14.5,1.3,9.5],orbitAngle:-.24},

  {key:"kepler",tag:"EXOPLANET HUNTER · 13 / 13",duration:13.7,zoomAt:.53,
   line:"Finally, Kepler—a revolutionary planet-hunting telescope drifting through space after running out of fuel! Featuring an angled sunshade hood, a powerful photometer mirror, and a four-panel solar array.",
   path:[[-10.8,11],[0,11],[10.8,11]],viewPos:[10.8,1.68,9.5],zoomPos:[12.15,1.54,9.5],target:[14.5,1.38,9.5],orbitAngle:.24},

  {key:null,tag:"EXPLORE FREELY",duration:5.9,zoomAt:1,
   line:"Pick any machine in the room to explore its story!",
   path:[[10.8,11],[3.5,11],[0,9.5]],
   lookAt:[[0,1.9,-8],[0,2.0,-10],[0,2.1,-12]]}
];
const TOUR_TOTAL_SEC=TOUR_TIMELINE.reduce((s,t)=>s+t.duration,0);

function init(){
  scene=new THREE.Scene(); scene.background=new THREE.Color(0x02030a); scene.fog=new THREE.FogExp2(0x060b1c,.0035);
  camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,1000); camera.position.set(0,1.7,12); camera.rotation.order='YXZ';
  renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.shadowMap.enabled=true;
  renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.15; space();
  $('cc').appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x93c5fd,1.15));
  [[-7,8,-6],[7,8,-6],[-7,8,4],[7,8,4]].forEach(p=>{const l=new THREE.PointLight(0x38bdf8,2.6,28);l.position.set(...p);scene.add(l);});
  const warmCore=new THREE.PointLight(0xf59e0b,1.8,22); warmCore.position.set(0,5,-2); scene.add(warmCore);
  const frontRim=new THREE.PointLight(0x7dd3fc,2.2,30); frontRim.position.set(0,4.5,-16); scene.add(frontRim);

  hall(); 
  const spots=[['lunar',-7,-10],['perseverance',-7,-3],['canadarm',-7,4],['suit',7,-10],['dextre',7,-3],['hubble',7,4],
    ['apollo_lm',-7,-15],['alsep',-7,11],['surveyor',7,-15],['sojourner',7,11],
    ['mer',-14.5,-13],['viking',-14.5,-5.5],['phoenix_insight',-14.5,2],['ingenuity',-14.5,9.5],
    ['dawn',14.5,-13],['near',14.5,-5.5],['pioneer',14.5,2],['kepler',14.5,9.5]];
  spots.forEach(([k,x,z])=>exhibit(k,x,z));
  bind(); loop();
}

const glow=(c=0x38bdf8,i=1.5)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:i});
function space(){
  const n=6000,p=new Float32Array(n*3);
  for(let i=0;i<n;i++){const r=160+Math.random()*90,t=Math.random()*6.283,u=Math.acos(2*Math.random()-1);
    p.set([r*Math.sin(u)*Math.cos(t),r*Math.cos(u),r*Math.sin(u)*Math.sin(t)],i*3);}
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(p,3));
  scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xe0f2fe,size:1.7,sizeAttenuation:false,fog:false})));
  const pl=mesh(sph(42),new THREE.MeshBasicMaterial({color:0x1d4ed8,fog:false}),-105,-15,-35,0,0,0,scene);
  mesh(sph(45.5),new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,opacity:.24,fog:false}),-105,-15,-35,0,0,0,scene);
  mesh(sph(8),new THREE.MeshBasicMaterial({color:0xfef9c3,fog:false}),95,48,-125,0,0,0,scene);
  const saturn=mesh(sph(24),new THREE.MeshBasicMaterial({color:0x6d28d9,fog:false}),115,12,-40,0,0,0,scene);
  mesh(new THREE.RingGeometry(30,44,48),new THREE.MeshBasicMaterial({color:0xa78bfa,side:THREE.DoubleSide,transparent:true,opacity:.45,fog:false}),115,12,-40,1.2,.3,0,scene);
  mesh(sph(90),new THREE.MeshBasicMaterial({color:0x312e81,transparent:true,opacity:.14,fog:false}),0,55,-160,0,0,0,scene);

  cosmicBodies.push(pl,saturn);
  mesh(sph(48.5),new THREE.MeshBasicMaterial({color:0x7dd3fc,transparent:true,opacity:.1,fog:false}),-105,-15,-35,0,0,0,scene);
  mesh(new THREE.RingGeometry(46,53,64),new THREE.MeshBasicMaterial({color:0x38bdf8,side:THREE.DoubleSide,transparent:true,opacity:.22,fog:false}),115,12,-40,1.2,.3,0,scene);
  mesh(sph(120),new THREE.MeshBasicMaterial({color:0x0c4a6e,transparent:true,opacity:.12,fog:false}),-60,-40,-150,0,0,0,scene);
  const g2=new THREE.BufferGeometry(), p2=new Float32Array(2500*3);
  for(let i=0;i<2500;i++){const r=170+Math.random()*110,t=Math.random()*6.283,u=Math.acos(2*Math.random()-1);
    p2.set([r*Math.sin(u)*Math.cos(t),r*Math.cos(u),r*Math.sin(u)*Math.sin(t)],i*3);}
  g2.setAttribute('position',new THREE.BufferAttribute(p2,3));
  scene.add(new THREE.Points(g2,new THREE.PointsMaterial({color:0xfde68a,size:2.1,sizeAttenuation:false,fog:false})));
  const mg=new THREE.BufferGeometry(), mp=new Float32Array(240*3);
  for(let i=0;i<240;i++) mp.set([(Math.random()-.5)*35,.3+Math.random()*10.5,(Math.random()-.5)*35],i*3);
  mg.setAttribute('position',new THREE.BufferAttribute(mp,3));
  ambientMotes=new THREE.Points(mg,new THREE.PointsMaterial({color:0x7dd3fc,size:.06,transparent:true,opacity:.55}));
  scene.add(ambientMotes);
}
function hall(){
  const hull=mat(0x0b1528,.7,.2), hull2=mat(0x162744,.6,.25), dark=mat(0x040814,.8,.2);
  hull.transparent=true; hull.opacity=.1; hull2.transparent=true; hull2.opacity=.55; dark.transparent=true; dark.opacity=.05;
  const f=mesh(new THREE.PlaneGeometry(38,38),mat(0x071021,.8,.25),0,0,0,-Math.PI/2,0,0,scene); f.receiveShadow=true; f.material.transparent=true; f.material.opacity=.28;
  const grid=new THREE.GridHelper(38,19,0x38bdf8,0x1e3a8a); grid.position.y=.012; scene.add(grid);
  mesh(new THREE.PlaneGeometry(.35,36),glow(0x38bdf8,1.5),-3.9,.02,-1,-Math.PI/2,0,0,scene);
  mesh(new THREE.PlaneGeometry(.35,36),glow(0x38bdf8,1.5),3.9,.02,-1,-Math.PI/2,0,0,scene);
  [-19,19].forEach(x=>{
    mesh(box(.5,2.2,38),hull,x,1.1,0,0,0,0,scene);
    mesh(box(.5,5.8,38),hull,x,9.1,0,0,0,0,scene);
    for(let z=-18;z<=18;z+=6){
      mesh(box(.6,4,2),hull2,x,4.2,z,0,0,0,scene);
      mesh(box(.1,4,.12),glow(),x+(x<0?.35:-.35),4.2,z,0,0,0,scene);
    }
    [2.2,6.2].forEach(y=>mesh(box(.4,.12,38),glow(0x38bdf8,1.7),x+(x<0?.3:-.3),y,0,0,0,0,scene));
  });
  mesh(box(38,2.2,.5),hull,0,1.1,-19,0,0,0,scene);
  mesh(box(38,5.8,.5),hull,0,9.1,-19,0,0,0,scene);
  [-14,14].forEach(x=>mesh(box(10,4,.5),hull2,x,4.2,-19,0,0,0,scene));
  mesh(box(18,.12,.4),glow(0x38bdf8,1.7),0,2.2,-18.7,0,0,0,scene);
  mesh(box(18,.12,.4),glow(0x38bdf8,1.7),0,6.2,-18.7,0,0,0,scene);
  mesh(box(38,12,.5),hull,0,6,19,0,0,0,scene);
  mesh(new THREE.PlaneGeometry(38,38),dark,0,12,0,Math.PI/2,0,0,scene);
  [-6,0,6].forEach(x=>mesh(new THREE.PlaneGeometry(.45,34),glow(0xbae6fd,1.8),x,11.95,0,Math.PI/2,0,0,scene));
  for(let z=-16;z<=16;z+=8)mesh(box(38,.4,.5),hull2,0,11.8,z,0,0,0,scene);

  grid.material.transparent=true; grid.material.opacity=.16;
  const deckMetal=mat(0x0d172a,.86,.22), trimMetal=mat(0x1e293b,.9,.18), armor=mat(0x091122,.82,.28);
  const cyanGlow=glow(0x38bdf8,1.9), amberGlow=glow(0xf59e0b,1.7), softCyan=glow(0x0284c7,1.1);

  const mainWalk=mesh(box(5.4,.04,36.4),deckMetal,0,.018,0,0,0,0,scene); mainWalk.receiveShadow=true;
  [-2.75,2.75].forEach(x=>{
    mesh(box(.14,.055,36.4),trimMetal,x,.022,0,0,0,0,scene);
    mesh(box(.05,.06,36.2),cyanGlow,x+(x<0?.08:-.08),.025,0,0,0,0,scene);
  });
  for(let z=-17;z<=17;z+=2){
    mesh(box(5.1,.045,.06),trimMetal,0,.02,z,0,0,0,scene);
    if(Math.abs(z)%4===1) mesh(box(1.4,.05,.04),softCyan,0,.022,z,0,0,0,scene);
  }
  [-10.75,10.75].forEach(wx=>{
    const sw=mesh(box(3.1,.04,35),deckMetal,wx,.018,0,0,0,0,scene); sw.receiveShadow=true;
    [-1.55,1.55].forEach(dx=>{
      mesh(box(.1,.05,35),trimMetal,wx+dx,.02,0,0,0,0,scene);
      mesh(box(.04,.055,34.8),softCyan,wx+dx*.95,.022,0,0,0,0,scene);
    });
  });
  [-15,-10,-3,4,11].forEach(cz=>{
    mesh(box(33,.036,1.3),deckMetal,0,.016,cz,0,0,0,scene);
    mesh(box(33,.042,.05),cyanGlow,0,.019,cz-.62,0,0,0,scene);
    mesh(box(33,.042,.05),cyanGlow,0,.019,cz+.62,0,0,0,scene);
  });

  [-15,-9,-3,3,9,15].forEach(ux=>{
    mesh(box(.24,.36,37),trimMetal,ux,-.26,0,0,0,0,scene);
    mesh(box(.05,.05,36.6),softCyan,ux,-.45,0,0,0,0,scene);
  });
  [-15,-9,-3,3,9,15].forEach(uz=>{
    mesh(box(37,.32,.24),trimMetal,0,-.28,uz,0,0,0,scene);
    mesh(box(36.6,.04,.05),amberGlow,0,-.45,uz,0,0,0,scene);
  });

  const r1=mesh(new THREE.RingGeometry(1.75,1.88,48),cyanGlow,0,.045,-2,-Math.PI/2,0,0,scene);
  const r2=mesh(new THREE.RingGeometry(1.25,1.33,32),amberGlow,0,.047,-2,-Math.PI/2,0,0,scene);
  const r3=mesh(new THREE.RingGeometry(.65,.74,6),cyanGlow,0,.049,-2,-Math.PI/2,0,0,scene);
  holoRings.push(r1,r2,r3);

  [-18.85,18.85].forEach(wx=>{
    const s=wx<0?1:-1;
    mesh(box(.55,2.15,38),armor,wx,1.075,0,0,0,0,scene);
    mesh(box(.65,.22,38),trimMetal,wx+s*.06,2.18,0,0,0,0,scene);
    mesh(box(.55,5.5,38),armor,wx,9.25,0,0,0,0,scene);
    mesh(box(.65,.22,38),trimMetal,wx+s*.06,6.42,0,0,0,0,scene);
    for(let z=-15;z<=15;z+=6){
      mesh(box(.12,.22,3.4),amberGlow,wx+s*.28,1.1,z,0,0,0,scene);
      mesh(box(.12,.14,3.4),cyanGlow,wx+s*.28,.45,z,0,0,0,scene);
    }
    for(let z=-19;z<=19;z+=4.75){
      mesh(box(.85,11.9,.65),trimMetal,wx+s*.15,5.95,z,0,0,0,scene);
      mesh(box(.95,2.4,.85),armor,wx+s*.22,1.2,z,0,0,0,scene);
      mesh(box(.12,11.2,.08),cyanGlow,wx+s*.58,5.8,z,0,0,0,scene);
      mesh(box(.45,1.6,.35),trimMetal,wx+s*.45,6.8,z,.35,0,0,scene);
      if(Math.abs(z)<16){
        const scr=mesh(new THREE.PlaneGeometry(1.5,.85),new THREE.MeshBasicMaterial({color:0x0ea5e9,transparent:true,opacity:.22,side:THREE.DoubleSide}),wx+s*.65,3.5,z+2.375,0,s*Math.PI/2,0,scene);
        mesh(box(.04,.9,1.56),cyanGlow,wx+s*.64,3.5,z+2.375,0,0,0,scene);
      }
    }
  });

  [-18.85,18.85].forEach(wz=>{
    const s=wz<0?1:-1;
    mesh(box(38,2.15,.55),armor,0,1.075,wz,0,0,0,scene);
    mesh(box(38,.22,.65),trimMetal,0,2.18,wz+s*.06,0,0,0,scene);
    mesh(box(38,5.5,.55),armor,0,9.25,wz,0,0,0,scene);
    mesh(box(38,.22,.65),trimMetal,0,6.42,wz+s*.06,0,0,0,scene);
    for(let x=-14.25;x<=14.25;x+=4.75){
      mesh(box(.65,11.9,.85),trimMetal,x,5.95,wz+s*.15,0,0,0,scene);
      mesh(box(.85,2.4,.95),armor,x,1.2,wz+s*.22,0,0,0,scene);
      mesh(box(.08,11.2,.12),cyanGlow,x,5.8,wz+s*.58,0,0,0,scene);
    }
    for(let x=-12;x<=12;x+=6){
      mesh(box(3.2,.2,.12),amberGlow,x,1.1,wz+s*.28,0,0,0,scene);
    }
  });

  [[-18.3,-18.3],[18.3,-18.3],[-18.3,18.3],[18.3,18.3]].forEach(([cx,cz])=>{
    mesh(cyl(1.1,1.2,12,8),armor,cx,6,cz,0,Math.PI/8,0,scene);
    mesh(cyl(1.18,1.18,.28,8),cyanGlow,cx,2.2,cz,0,Math.PI/8,0,scene);
    mesh(cyl(1.18,1.18,.28,8),cyanGlow,cx,6.4,cz,0,Math.PI/8,0,scene);
  });

  for(let z=-16;z<=16;z+=4){
    mesh(box(37,.48,.48),trimMetal,0,11.65,z,0,0,0,scene);
    mesh(box(14,.14,.14),cyanGlow,0,11.38,z,0,0,0,scene);
    [-1,1].forEach(s=>{
      mesh(box(7.2,.42,.42),trimMetal,s*15.4,10.2,z,0,0,s*-.42,scene);
      mesh(box(6.8,.1,.1),amberGlow,s*15.2,9.98,z,0,0,s*-.42,scene);
    });
  }
  [-9.5,9.5].forEach(lx=>{
    mesh(box(.45,.32,36),trimMetal,lx,11.75,0,0,0,0,scene);
    mesh(box(.14,.08,35.6),cyanGlow,lx,11.58,0,0,0,0,scene);
  });
}
function exhibit(key,x,z){
  const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=x<0?Math.PI/2:-Math.PI/2;
  mesh(cyl(.9,1.0,.9,32),mat(0x0b1528,.7,.25),0,.45,0,0,0,0,g);
  mesh(cyl(.95,.95,.06,32),new THREE.MeshStandardMaterial({color:0x38bdf8,emissive:0x0284c7,emissiveIntensity:1.3}),0,.93,0,0,0,0,g);
  mesh(cyl(1.12,1.18,.14,32),mat(0x1e293b,.9,.2),0,.07,0,0,0,0,g);
  mesh(new THREE.RingGeometry(1.18,1.26,32),glow(0x38bdf8,1.6),0,.02,0,-Math.PI/2,0,0,g);
  mesh(new THREE.RingGeometry(.98,1.03,32),glow(0xf59e0b,1.5),0,.97,0,-Math.PI/2,0,0,g);
  const beam=mesh(cyl(.78,.92,2.1,24,1,true),new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,opacity:.055,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}),0,2.02,0,0,0,0,g);
  const model=MODELS[key](); model.position.y=.96; g.add(model); spinners.push(model);
  const hit=new THREE.Mesh(cyl(1,1,2.2,16),new THREE.MeshBasicMaterial({visible:false}));
  hit.position.y=1.1; hit.userData={key}; g.add(hit); hits.push(hit);
  scene.add(g);
  pedestals.push({x,z,r:1.42});
  exhibitMap[key]={group:g,model,beam,x,z};
}

function playSfx(type,val=1){
  try{
    if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended') audioCtx.resume();
    const t=audioCtx.currentTime, osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if(type==='step'){
      osc.type='triangle'; osc.frequency.setValueAtTime(92+(rig.stepSide>0?8:0),t);
      osc.frequency.exponentialRampToValueAtTime(34,t+.065);
      gain.gain.setValueAtTime(.035*Math.min(1.4,val),t); gain.gain.exponentialRampToValueAtTime(.0008,t+.07);
      osc.start(t); osc.stop(t+.075);
    } else if(type==='jump'||type==='dash'){
      osc.type='sine'; osc.frequency.setValueAtTime(type==='dash'?220:145,t);
      osc.frequency.exponentialRampToValueAtTime(type==='dash'?440:310,t+.16);
      gain.gain.setValueAtTime(.055,t); gain.gain.exponentialRampToValueAtTime(.0008,t+.18);
      osc.start(t); osc.stop(t+.19);
    } else if(type==='land'){
      osc.type='sine'; osc.frequency.setValueAtTime(75,t);
      osc.frequency.exponentialRampToValueAtTime(28,t+.12);
      gain.gain.setValueAtTime(Math.min(.09,.02*val),t); gain.gain.exponentialRampToValueAtTime(.0008,t+.13);
      osc.start(t); osc.stop(t+.14);
    }
  }catch(e){}
}

function stopAllVoicePlayback(){
  // Ignore completion events from any phrase canceled during a scene change.
  voiceGeneration++;
  try { if('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch(e) {}
}

function triggerStepVoice(idx){
  if(!('speechSynthesis' in window) || !TOUR_TIMELINE[idx]) return;
  stopAllVoicePlayback();
  const generation=voiceGeneration;
  // Browser speech APIs cannot change the rate of an utterance already in
  // progress. Short phrases let a new speed take effect at the next phrase
  // without restarting or skipping the current guided scene.
  const phrases=TOUR_TIMELINE[idx].line.match(/(?:\S+\s*){1,8}/g) || [];
  let next=0;
  function speakNext(){
    if(generation!==voiceGeneration || !session.active || session.stepIdx!==idx || next>=phrases.length) return;
    try {
      const u=new SpeechSynthesisUtterance(phrases[next++].trim());
      const voices=window.speechSynthesis.getVoices();
      const pref=voices.find(v=>/en(-|_)(US|GB)/i.test(v.lang) && /(Guy|Daniel|Matthew|Arthur|Brian|Christopher|Google UK English Male|Microsoft David)/i.test(v.name))
        || voices.find(v=>/en/i.test(v.lang));
      if(pref) u.voice=pref;
      u.rate=.92*tourSpeed; u.pitch=.95;
      u.onend=speakNext;
      u.onerror=e=>{ if(e.error!=='canceled' && e.error!=='interrupted') speakNext(); };
      window.speechSynthesis.speak(u);
    } catch(e) {}
  }
  speakNext();
}

function showTourCard(key,tag){
  const card=$('tourCard');
  if(!key||!DATA[key]){ card.classList.remove('visible'); return; }
  const d=DATA[key];
  $('tcTag').textContent=tag||'SPACE ARCHIVE';
  $('tcName').textContent=d.name;
  $('tcSum').textContent=d.sum;
  $('tcTask').textContent=d.task;
  const ul=$('tcParts');
  ul.innerHTML=d.parts.map(p=>`<li>${p}</li>`).join('');
  card.classList.add('visible');
  Array.from(ul.children).forEach((li,idx)=>setTimeout(()=>li.classList.add('show'),90*(idx+1)));
  playSfx('dash');
}

function highlightExhibit(activeKey){
  Object.entries(exhibitMap).forEach(([k,obj])=>{
    const on=k===activeKey;
    obj.beam.material.opacity=on?.16:.055;
    obj.beam.material.color.setHex(on?0xfbbf24:0x38bdf8);
  });
}

function startGuidedSession(){
  stopAllVoicePlayback();
  session.started=true;
  session.active=true;
  session.completed=false;
  session.elapsed=0;
  session.stepIdx=-1;
  session.detailShown=false;
  session.camPos.set(0,2.3,13.5);
  session.camLook.set(0,2.6,-14);
  session.camFov=72;
  keys.f=keys.b=keys.l=keys.r=0;
  rig.sprint=rig.crouch=rig.zoom=rig.jump=0;
  if(document.pointerLockElement) document.exitPointerLock();
  $('overlay').classList.add('hidden');
  $('info').classList.add('hidden');
  $('prompt').classList.add('hidden');
  $('cross').classList.add('hidden');
  $('hint').classList.add('hidden');
  $('suitHud').classList.add('hidden');
  $('tourProgressWrap').classList.remove('hidden');
  $('tourTop').classList.remove('hidden');
  $('tourSub').classList.remove('hidden');
  $('replayBtn').classList.add('hidden');
  $('tourPhaseLabel').textContent='GUIDED SESSION · AUTOPILOT';
  playSfx('jump');
}

function finishGuidedSession(){
  stopAllVoicePlayback();
  session.active=false;
  session.completed=true;
  showTourCard(null);
  highlightExhibit(null);
  $('tourSub').classList.add('hidden');
  $('tourProgress').style.width='100%';
  $('tourPhaseLabel').textContent='FREE EXPLORATION UNLOCKED';
  $('replayBtn').classList.remove('hidden');
  $('cross').classList.remove('hidden');
  $('hint').classList.remove('hidden');
  $('suitHud').classList.remove('hidden');
  const e=new THREE.Euler().setFromQuaternion(camera.quaternion,'YXZ');
  pitch=Math.max(-1.4,Math.min(1.4,e.x));
  yaw=e.y;
  rig.smoothYaw=yaw; rig.smoothPitch=pitch;
  rig.playerY=1.7; camera.position.y=1.7; camera.rotation.z=0;
  if(camera.fov!==70){ camera.fov=70; camera.updateProjectionMatrix(); }
}

function evalPolyPath(pts,u){
  if(pts.length===1) return pts[0].slice();
  const segs=pts.length-1, f=Math.max(0,Math.min(.9999,u))*segs, idx=Math.floor(f), t=f-idx;
  const s=t*t*(3-2*t), a=pts[idx], b=pts[idx+1];
  return a.map((v,i)=>v+(b[i]-v)*s);
}

function updateGuidedSession(dt){
  if(!session.active) return;

  // Speed adjusts playback from the current position; nothing is rewound.
  session.elapsed+=dt*tourSpeed;
  const fmt=sec=>{const m=Math.floor(sec/60),s=Math.floor(sec%60);return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');};
  const dispElapsed=session.elapsed;
  const dispTotal=TOUR_TOTAL_SEC;
  $('tourClock').textContent=fmt(Math.min(dispElapsed,dispTotal))+' / '+fmt(dispTotal);
  $('tourProgress').style.width=Math.min(100,(session.elapsed/TOUR_TOTAL_SEC)*100)+'%';

  if(session.elapsed>=TOUR_TOTAL_SEC){ finishGuidedSession(); return; }

  let acc=0, idx=0;
  for(let i=0;i<TOUR_TIMELINE.length;i++){
    if(session.elapsed<acc+TOUR_TIMELINE[i].duration){ idx=i; break; }
    acc+=TOUR_TIMELINE[i].duration;
  }
  const step=TOUR_TIMELINE[idx];
  const localT=(session.elapsed-acc)/step.duration;

  if(idx!==session.stepIdx){
    session.stepIdx=idx;
    session.detailShown=false;
    $('tourSub').textContent=step.line;
    highlightExhibit(step.key);
    if(!step.key) showTourCard(null);
    triggerStepVoice(idx);
  }

  let desiredPos=new THREE.Vector3(), desiredLook=new THREE.Vector3(), desiredFov=70;
  if(!step.key){
    const p=evalPolyPath(step.path,localT), l=evalPolyPath(step.lookAt,localT);
    desiredPos.set(p[0],p[1],p[2]);
    desiredLook.set(l[0],l[1],l[2]);
    desiredFov=idx===0?(72-localT*4):(66+localT*4);
  } else {
    const zStart=step.zoomAt;
    if(localT<zStart){
      const u=localT/zStart;
      const waypoints=[...step.path.map(xz=>[xz[0],1.66,xz[1]]),step.viewPos];
      const p=evalPolyPath(waypoints,u);
      desiredPos.set(p[0],p[1],p[2]);
      desiredLook.set(step.target[0],step.target[1]+.08,step.target[2]);
      desiredFov=70-u*6;
    } else {
      if(!session.detailShown){
        session.detailShown=true;
        showTourCard(step.key,step.tag);
      }
      const zu=(localT-zStart)/(1-zStart);
      const ease=zu*zu*(3-2*zu);
      const base=new THREE.Vector3(...step.viewPos).lerp(new THREE.Vector3(...step.zoomPos),Math.min(1,zu*2.2));
      const tgt=new THREE.Vector3(...step.target);
      const off=base.clone().sub(tgt);
      const ang=(step.orbitAngle||.24)*Math.sin(ease*Math.PI*.85);
      const ca=Math.cos(ang), sa=Math.sin(ang);
      const rx=off.x*ca-off.z*sa, rz=off.x*sa+off.z*ca;
      desiredPos.set(tgt.x+rx,base.y+Math.sin(ease*Math.PI)*.06,tgt.z+rz);
      desiredLook.copy(tgt);
      desiredFov=64-Math.min(1,zu*2.2)*19;
    }
  }

  const kCam=1-Math.exp(-3.4*dt);
  const kLook=1-Math.exp(-4.6*dt);
  session.camPos.lerp(desiredPos,kCam);
  session.camLook.lerp(desiredLook,kLook);
  session.camFov+=(desiredFov-session.camFov)*kCam;

  camera.position.copy(session.camPos);
  camera.lookAt(session.camLook);
  if(Math.abs(camera.fov-session.camFov)>.02){
    camera.fov=session.camFov;
    camera.updateProjectionMatrix();
  }
}

function openInfo(key){
  const d=DATA[key]; if(!d)return;
  if(document.pointerLockElement) document.exitPointerLock();
  infoOpen=true;
  $('iName').textContent=d.name; $('iSum').textContent=d.sum; $('iTask').textContent=d.task;
  $('iParts').innerHTML=d.parts.map(p=>`<li>${p}</li>`).join('');
  $('info').classList.remove('hidden'); $('overlay').classList.add('hidden');
}
function closeInfo(){ infoOpen=false; $('info').classList.add('hidden'); if(!session.started)$('overlay').classList.remove('hidden'); }

function bind(){
  if('speechSynthesis' in window) window.speechSynthesis.getVoices();
  const refreshPace=()=>{
    document.querySelectorAll('.pace-value').forEach(el=>el.textContent=tourSpeed.toFixed(2)+'×');
    document.querySelectorAll('.pace-down').forEach(el=>el.disabled=tourSpeed<=.5);
    document.querySelectorAll('.pace-up').forEach(el=>el.disabled=tourSpeed>=2);
  };
  const changePace=delta=>{
    const next=Math.max(.5,Math.min(2,Math.round((tourSpeed+delta)*4)/4));
    if(next===tourSpeed) return;
    tourSpeed=next; refreshPace();

  };
  document.querySelectorAll('.pace-down').forEach(el=>el.addEventListener('click',()=>changePace(-.25)));
  document.querySelectorAll('.pace-up').forEach(el=>el.addEventListener('click',()=>changePace(.25)));
  refreshPace();
  $('startSessionBtn').addEventListener('click', startGuidedSession);
  $('iClose').addEventListener('click',()=>{
    closeInfo();
    if(session.completed && !('ontouchstart' in window) && document.body.requestPointerLock) document.body.requestPointerLock();
  });
  $('replayBtn').addEventListener('click',e=>{ e.stopPropagation(); startGuidedSession(); });
  document.addEventListener('pointerlockchange',()=>{
    isLocked=document.pointerLockElement===document.body;
    if(!infoOpen && !session.started) $('overlay').classList.toggle('hidden',isLocked);
  });
  document.addEventListener('mousemove',e=>{
    if(!isLocked || session.active)return;
    yaw-=e.movementX*.002; pitch=Math.max(-1.4,Math.min(1.4,pitch-e.movementY*.002));
    camera.rotation.x=pitch; camera.rotation.y=yaw;
  });
  const set=(c,v)=>{ if(c=='KeyW'||c=='ArrowUp')keys.f=v; else if(c=='KeyS'||c=='ArrowDown')keys.b=v;
    else if(c=='KeyA'||c=='ArrowLeft')keys.l=v; else if(c=='KeyD'||c=='ArrowRight')keys.r=v; };
  document.addEventListener('keydown',e=>{
    if(!session.completed || session.active) return;
    set(e.code,1); if(e.code=='KeyE'&&(isLocked||session.completed)&&hovered)openInfo(hovered.userData.key);
  });
  document.addEventListener('keyup',e=>set(e.code,0));
  document.addEventListener('click',e=>{
    if(session.active || !session.completed || infoOpen) return;
    if(e.target && e.target.closest('a, button, input, details')) return;
    if(!isLocked && !('ontouchstart' in window) && document.body.requestPointerLock) document.body.requestPointerLock();
    if((isLocked || 'ontouchstart' in window) && hovered) openInfo(hovered.userData.key);
  });
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

  // Mobile touch look & walk ONLY after the guided session finishes
  renderer.domElement.addEventListener('touchstart',e=>{
    if(session.active || !session.completed || infoOpen) return;
    for(const t of e.changedTouches){
      if(t.clientX<innerWidth*.42 && session.touchMoveId===null){
        session.touchMoveId=t.identifier; session.touchStartX=t.clientX; session.touchStartY=t.clientY;
      } else if(session.touchLookId===null){
        session.touchLookId=t.identifier; session.touchLastX=t.clientX; session.touchLastY=t.clientY;
      }
    }
  },{passive:true});
  renderer.domElement.addEventListener('touchmove',e=>{
    if(session.active || !session.completed || infoOpen) return;
    for(const t of e.changedTouches){
      if(t.identifier===session.touchLookId){
        yaw-=(t.clientX-session.touchLastX)*.004;
        pitch=Math.max(-1.4,Math.min(1.4,pitch-(t.clientY-session.touchLastY)*.004));
        session.touchLastX=t.clientX; session.touchLastY=t.clientY;
      } else if(t.identifier===session.touchMoveId){
        const dx=t.clientX-session.touchStartX, dy=t.clientY-session.touchStartY;
        keys.f=dy<-18?1:0; keys.b=dy>18?1:0; keys.l=dx<-18?1:0; keys.r=dx>18?1:0;
      }
    }
  },{passive:true});
  const endTouch=e=>{
    for(const t of e.changedTouches){
      if(t.identifier===session.touchLookId) session.touchLookId=null;
      if(t.identifier===session.touchMoveId){ session.touchMoveId=null; keys.f=keys.b=keys.l=keys.r=0; }
    }
  };
  renderer.domElement.addEventListener('touchend',endTouch,{passive:true});
  renderer.domElement.addEventListener('touchcancel',endTouch,{passive:true});

  document.addEventListener('pointerlockchange',()=>{
    rig.smoothYaw=yaw; rig.smoothPitch=pitch;
    rig.prevX=camera.position.x; rig.prevZ=camera.position.z;
    if(!isLocked){ rig.sprint=0; rig.crouch=0; rig.zoom=0; rig.jump=0; }
  });
  document.addEventListener('keydown',e=>{
    if(!session.completed || session.active) return;
    if(e.code==='ShiftLeft'||e.code==='ShiftRight') rig.sprint=1;
    if(e.code==='KeyC'||e.code==='ControlLeft') rig.crouch=1;
    if(e.code==='KeyZ') rig.zoom=1;
    if(e.code==='Space'){
      if(isLocked) e.preventDefault();
      if(!e.repeat && isLocked) rig.jumpBuf=.15;
      rig.jump=1;
    }
    if(e.code==='KeyQ' && !e.repeat && isLocked && rig.dashCd<=0){
      const fwdX=-Math.sin(yaw), fwdZ=-Math.cos(yaw), rgtX=Math.cos(yaw), rgtZ=-Math.sin(yaw);
      let mx=(keys.r-keys.l)*rgtX+(keys.f-keys.b)*fwdX;
      let mz=(keys.r-keys.l)*rgtZ+(keys.f-keys.b)*fwdZ;
      const len=Math.hypot(mx,mz);
      if(len>.01){ mx/=len; mz/=len; } else { mx=fwdX; mz=fwdZ; }
      rig.dashX=mx*15; rig.dashZ=mz*15; rig.dashCd=.85; rig.dashFov=5.5;
      playSfx('dash');
    }
  });
  document.addEventListener('keyup',e=>{
    if(e.code==='ShiftLeft'||e.code==='ShiftRight') rig.sprint=0;
    if(e.code==='KeyC'||e.code==='ControlLeft') rig.crouch=0;
    if(e.code==='KeyZ') rig.zoom=0;
    if(e.code==='Space') rig.jump=0;
  });
  document.addEventListener('mousedown',e=>{ if(isLocked && session.completed && !session.active && e.button===2) rig.zoom=1; });
  document.addEventListener('mouseup',e=>{ if(e.button===2) rig.zoom=0; });
  document.addEventListener('contextmenu',e=>{ if(isLocked) e.preventDefault(); });
}

function updateCharacterRig(dt){
  if(!session.completed || session.active) return;
  const freeControl=(isLocked || ('ontouchstart' in window && !infoOpen));
  const kLook=1-Math.exp(-26*dt);
  const kBlend=1-Math.exp(-9*dt);
  if(freeControl){
    const prevSYaw=rig.smoothYaw;
    rig.smoothYaw+=(yaw-rig.smoothYaw)*kLook;
    rig.smoothPitch+=(pitch-rig.smoothPitch)*kLook;
    const turnRate=(rig.smoothYaw-prevSYaw)/Math.max(dt,.001);

    const targetCrouch=rig.crouch?1:0;
    rig.crouchMix=(rig.crouchMix||0)+(targetCrouch-(rig.crouchMix||0))*kBlend;
    const isMoving=(keys.f||keys.b||keys.l||keys.r);
    const targetSprint=(rig.sprint && isMoving && rig.crouchMix<.35)?1:0;
    rig.sprintMix=(rig.sprintMix||0)+(targetSprint-(rig.sprintMix||0))*kBlend;
    const targetZoom=rig.zoom?1:0;
    rig.zoomMix=(rig.zoomMix||0)+(targetZoom-(rig.zoomMix||0))*kBlend;

    const fwdX=-Math.sin(rig.smoothYaw), fwdZ=-Math.cos(rig.smoothYaw);
    const rgtX=Math.cos(rig.smoothYaw), rgtZ=-Math.sin(rig.smoothYaw);
    const forwardInput=keys.f-keys.b, strafeInput=keys.r-keys.l;
    const norm=Math.hypot(forwardInput,strafeInput)||1;
    const nFwd=forwardInput/norm, nStr=strafeInput/norm;

    const pitchLoss=1-Math.cos(rig.smoothPitch);
    const speedBoost=(1.85*rig.sprintMix - 1.05*rig.crouchMix + pitchLoss*2.2);
    camera.position.x+=(fwdX*nFwd+rgtX*nStr)*speedBoost*dt;
    camera.position.z+=(fwdZ*nFwd+rgtZ*nStr)*speedBoost*dt;

    if(rig.dashCd>0) rig.dashCd=Math.max(0,rig.dashCd-dt);
    rig.dashFov*=Math.exp(-7*dt);
    camera.position.x+=rig.dashX*dt;
    camera.position.z+=rig.dashZ*dt;
    rig.dashX*=Math.exp(-9*dt);
    rig.dashZ*=Math.exp(-9*dt);

    for(let i=0;i<pedestals.length;i++){
      const p=pedestals[i];
      const dx=camera.position.x-p.x, dz=camera.position.z-p.z;
      const d=Math.hypot(dx,dz);
      if(d>0 && d<p.r && rig.playerY<2.5){
        const push=(p.r-d)/d;
        camera.position.x+=dx*push;
        camera.position.z+=dz*push;
      }
    }

    camera.position.x=Math.max(-17.4,Math.min(17.4,camera.position.x));
    camera.position.z=Math.max(-17.4,Math.min(17.4,camera.position.z));

    const standH=1.7-rig.crouchMix*.68;
    if(rig.grounded){ rig.coyote=.13; } else { rig.coyote=Math.max(0,rig.coyote-dt); }
    if(rig.jumpBuf>0) rig.jumpBuf=Math.max(0,rig.jumpBuf-dt);

    if(rig.jumpBuf>0 && rig.coyote>0){
      rig.vy=5.35; rig.grounded=false; rig.coyote=0; rig.jumpBuf=0;
      playSfx('jump');
    }

    if(!rig.grounded){
      const grav=(rig.jump && rig.vy<.6)?4.4:11.2;
      rig.vy-=grav*dt;
      rig.playerY+=rig.vy*dt;
      if(rig.playerY<=standH){
        const impact=Math.abs(rig.vy);
        rig.landDip=Math.min(.22,impact*.03);
        if(impact>1.4) playSfx('land',impact);
        rig.playerY=standH; rig.vy=0; rig.grounded=true;
      }
    } else {
      rig.playerY+=(standH-rig.playerY)*kBlend;
    }
    rig.landDip*=Math.exp(-12*dt);

    const horizSpeed=Math.hypot(camera.position.x-rig.prevX,camera.position.z-rig.prevZ)/Math.max(dt,.001);
    rig.prevX=camera.position.x; rig.prevZ=camera.position.z;
    let bobY=0, bobX=0;
    if(rig.grounded && horizSpeed>.35){
      const spdFactor=Math.min(1.5,horizSpeed/2.8);
      rig.bobPhase+=dt*(5.4+horizSpeed*.9);
      const s=Math.sin(rig.bobPhase*2);
      bobY=s*(.028+rig.sprintMix*.02)*spdFactor;
      bobX=Math.cos(rig.bobPhase)*.016*spdFactor;
      if(s<-.88 && rig.stepSide>0){ rig.stepSide=-1; playSfx('step',spdFactor); }
      else if(s>.2){ rig.stepSide=1; }
    } else {
      rig.bobPhase=0;
    }

    camera.position.x+=rgtX*bobX;
    camera.position.z+=rgtZ*bobX;
    camera.position.y=rig.playerY-rig.landDip+bobY;

    const targetRoll=-strafeInput*(.026+rig.sprintMix*.016)-Math.max(-.035,Math.min(.035,turnRate*.01));
    rig.roll+=(targetRoll-rig.roll)*kBlend;
    camera.rotation.x=rig.smoothPitch;
    camera.rotation.y=rig.smoothYaw;
    camera.rotation.z=rig.roll;

    const targetFov=70+rig.sprintMix*11+rig.dashFov-rig.zoomMix*28;
    if(Math.abs(camera.fov-targetFov)>.02){
      camera.fov+=(targetFov-camera.fov)*kBlend;
      camera.updateProjectionMatrix();
    }

    const st=$('suitState');
    if(st){
      st.textContent=!rig.grounded?(rig.jump&&rig.vy<.6?'THRUST-GLIDE':'LOW-G JUMP')
        :rig.zoomMix>.4?'OPTIC ZOOM':rig.sprintMix>.4?'THRUST BOOST':rig.crouchMix>.4?'LOW-ANGLE':'MAG-WALK';
    }
  } else {
    rig.prevX=camera.position.x; rig.prevZ=camera.position.z;
  }

  const cr=$('cross');
  if(cr){
    cr.classList.toggle('active',Boolean(hovered&&freeControl));
    cr.classList.toggle('zoomed',Boolean(freeControl&&(rig.zoomMix||0)>.4));
  }
}

function loop(){
  requestAnimationFrame(loop);
  const now=performance.now(), dt=Math.min((now-prev)/1000,.1); prev=now;
  spinners.forEach(s=>s.rotation.y+=dt*.5);
  holoRings.forEach((r,i)=>r.rotation.z+=dt*(i%2===0?.35:-.5));
  cosmicBodies.forEach((b,i)=>b.rotation.y+=dt*(i===0?.02:-.03));
  if(ambientMotes) ambientMotes.rotation.y+=dt*.025;
  if(session.active){
    updateGuidedSession(dt);
  } else if(!session.started){
    const t=now*.00022;
    camera.position.set(Math.sin(t)*3.2,2.1,12.5+Math.cos(t)*1.2);
    camera.lookAt(0,1.75,-8);
  } else {
    if(isLocked || ('ontouchstart' in window && !infoOpen)){
      vel.x-=vel.x*10*dt; vel.z-=vel.z*10*dt;
      dir.z=keys.f-keys.b; dir.x=keys.r-keys.l; dir.normalize();
      if(keys.f||keys.b)vel.z-=dir.z*25*dt; if(keys.l||keys.r)vel.x-=dir.x*25*dt;
      camera.translateX(-vel.x*dt); camera.translateZ(vel.z*dt);
      camera.position.x=Math.max(-17.5,Math.min(17.5,camera.position.x));
      camera.position.z=Math.max(-17.5,Math.min(17.5,camera.position.z)); camera.position.y=1.7;
    }
    updateCharacterRig(dt);
  }
  ray.setFromCamera(new THREE.Vector2(0,0),camera);
  const h=ray.intersectObjects(hits)[0];
  hovered=(h&&h.distance<5)?h.object:null;
  const p=$('prompt');
  if(!session.active && session.completed && hovered && (isLocked || ('ontouchstart' in window && !infoOpen))){
    p.textContent='Inspect: '+DATA[hovered.userData.key].name;p.classList.remove('hidden');
  }
  else p.classList.add('hidden');
  renderer.render(scene,camera);
}
try { init(); } catch (error) {
  console.error('Could not initialize the 3D session:', error);
  document.getElementById('startSessionBtn').disabled = true;
  const errorMessage=document.getElementById('sessionError');
  errorMessage.hidden=false;
  errorMessage.textContent='The 3D session could not start. Please use a browser with WebGL enabled.';
}