(function(){
"use strict";
var groups=[
  {
    "id": "moon",
    "title": "The Moon",
    "code": "A",
    "subtitle": "Landers, rovers and instruments left on the lunar surface.",
    "devices": [
      {
        "id": "apollo_lm",
        "model": "apollo_lm",
        "code": "01",
        "groupId": "moon",
        "name": "Apollo Lunar Module",
        "tagline": "The landing craft that brought astronauts to the Moon.",
        "summary": "Apollo lunar modules carried crews down to the Moon and back to lunar orbit.",
        "details": "The descent stage stayed on the Moon as the launch platform for the ascent stage. This photo shows Apollo 11 lunar module Eagle and astronaut Buzz Aldrin in 1969.",
        "thumbUrl": "photos/as11-40-5866.jpg",
        "image2DUrl": "photos/as11-40-5866.jpg",
        "photoCaption": "Apollo 11 Eagle on the Moon, photographed by Neil Armstrong, 1969.",
        "photoId": "as11-40-5866",
        "photoSource": "https://images.nasa.gov/details/as11-40-5866",
        "sourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
        "handoff3DUrl": "room.html?device=apollo_lm",
        "parts": [
          {
            "number": "01",
            "title": "Descent stage",
            "description": "A component of Apollo Lunar Module.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Landing legs",
            "description": "A component of Apollo Lunar Module.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Ladder",
            "description": "A component of Apollo Lunar Module.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Ascent stage",
            "description": "A component of Apollo Lunar Module.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "lunar",
        "model": "lunar",
        "code": "02",
        "groupId": "moon",
        "name": "Lunar Roving Vehicle",
        "tagline": "An electric vehicle built for exploring the Moon.",
        "summary": "Astronauts drove lunar rovers on Apollo 15, 16 and 17.",
        "details": "The rovers extended the distance astronauts could travel and carry tools on the lunar surface. All three remained on the Moon.",
        "thumbUrl": "photos/as15-88-11901.jpg",
        "image2DUrl": "photos/as15-88-11901.jpg",
        "photoCaption": "Apollo 15 lunar rover on the Moon, 1971.",
        "photoId": "as15-88-11901",
        "photoSource": "https://images.nasa.gov/details/as15-88-11901",
        "sourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
        "handoff3DUrl": "room.html?device=lunar",
        "parts": [
          {
            "number": "01",
            "title": "Wire-mesh wheels",
            "description": "A component of Lunar Roving Vehicle.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Batteries",
            "description": "A component of Lunar Roving Vehicle.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Control handle",
            "description": "A component of Lunar Roving Vehicle.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Communications antenna",
            "description": "A component of Lunar Roving Vehicle.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "alsep",
        "model": "alsep",
        "code": "03",
        "groupId": "moon",
        "name": "Apollo Surface Experiments",
        "tagline": "Science stations that worked after astronauts left.",
        "summary": "Apollo crews deployed packages of scientific experiments on the lunar surface.",
        "details": "The Apollo 12 station included a passive seismometer and a central station that relayed measurements to Earth. The photograph shows components of that station.",
        "thumbUrl": "photos/as12-47-6918.jpg",
        "image2DUrl": "photos/as12-47-6918.jpg",
        "photoCaption": "Apollo 12 experiments on the Moon, photographed by Alan Bean, 1969.",
        "photoId": "as12-47-6918",
        "photoSource": "https://images.nasa.gov/details/as12-47-6918",
        "sourceUrl": "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
        "handoff3DUrl": "room.html?device=alsep",
        "parts": [
          {
            "number": "01",
            "title": "Central station",
            "description": "A component of Apollo Surface Experiments.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Seismometer",
            "description": "A component of Apollo Surface Experiments.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Power source",
            "description": "A component of Apollo Surface Experiments.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Scientific instruments",
            "description": "A component of Apollo Surface Experiments.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "surveyor",
        "model": "surveyor",
        "code": "04",
        "groupId": "moon",
        "name": "Surveyor 3",
        "tagline": "A robotic scout visited by Apollo astronauts.",
        "summary": "Surveyor 3 landed on the Moon in 1967 and investigated its surface.",
        "details": "In 1969 Apollo 12 astronauts visited the lander and brought its camera and other pieces back to Earth. Most of the spacecraft remained on the Moon.",
        "thumbUrl": "photos/as12-48-7121.jpg",
        "image2DUrl": "photos/as12-48-7121.jpg",
        "photoCaption": "Surveyor 3 photographed on the Moon by the Apollo 12 crew, 1969.",
        "photoId": "as12-48-7121",
        "photoSource": "https://images.nasa.gov/details/as12-48-7121",
        "sourceUrl": "https://science.nasa.gov/mission/surveyor-3/",
        "handoff3DUrl": "room.html?device=surveyor",
        "parts": [
          {
            "number": "01",
            "title": "Landing legs",
            "description": "A component of Surveyor 3.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Television camera",
            "description": "A component of Surveyor 3.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Surface sampler",
            "description": "A component of Surveyor 3.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Antenna",
            "description": "A component of Surveyor 3.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      }
    ]
  },
  {
    "id": "mars",
    "title": "Mars",
    "code": "B",
    "subtitle": "Robotic explorers that studied the Red Planet.",
    "devices": [
      {
        "id": "sojourner",
        "model": "sojourner",
        "code": "01",
        "groupId": "mars",
        "name": "Sojourner Rover",
        "tagline": "The first rover to drive on Mars.",
        "summary": "Sojourner reached Mars with the Pathfinder lander in 1997.",
        "details": "The small rover studied rocks and soil near the lander, showing how a mobile robot could explore another planet. It remains on Mars.",
        "thumbUrl": "photos/PIA04318.jpg",
        "image2DUrl": "photos/PIA04318.jpg",
        "photoCaption": "Sojourner near the Rock Garden on Mars, photographed by Pathfinder.",
        "photoId": "PIA04318",
        "photoSource": "https://images.nasa.gov/details/PIA04318",
        "sourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
        "handoff3DUrl": "room.html?device=sojourner",
        "parts": [
          {
            "number": "01",
            "title": "Six wheels",
            "description": "A component of Sojourner Rover.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Solar panel",
            "description": "A component of Sojourner Rover.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Cameras",
            "description": "A component of Sojourner Rover.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "X-ray spectrometer",
            "description": "A component of Sojourner Rover.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "mer",
        "model": "mer",
        "code": "02",
        "groupId": "mars",
        "name": "Spirit & Opportunity",
        "tagline": "Twin rovers that followed the evidence of water.",
        "summary": "Spirit and Opportunity landed on opposite sides of Mars in 2004.",
        "details": "Designed for 90 Martian days, both rovers worked for years and gathered important evidence about past water on Mars. Both missions have ended.",
        "thumbUrl": "photos/PIA04422.jpg",
        "image2DUrl": "photos/PIA04422.jpg",
        "photoCaption": "The twin Mars Exploration Rovers with a Sojourner flight spare on Earth, before launch.",
        "photoId": "PIA04422",
        "photoSource": "https://images.nasa.gov/details/PIA04422",
        "sourceUrl": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
        "handoff3DUrl": "room.html?device=mer",
        "parts": [
          {
            "number": "01",
            "title": "Solar arrays",
            "description": "A component of Spirit & Opportunity.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Six wheels",
            "description": "A component of Spirit & Opportunity.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Camera mast",
            "description": "A component of Spirit & Opportunity.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Robotic arm",
            "description": "A component of Spirit & Opportunity.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "viking",
        "model": "viking",
        "code": "03",
        "groupId": "mars",
        "name": "Viking 1 & 2 Landers",
        "tagline": "Two pioneering robotic laboratories on Mars.",
        "summary": "In 1976 Viking 1 and 2 became the first U.S. landers to operate successfully on Mars.",
        "details": "Each stationary lander returned pictures and studied the Martian environment, including experiments on soil. They remain at their landing sites.",
        "thumbUrl": "photos/101-KSC-75P-110.jpg",
        "image2DUrl": "photos/101-KSC-75P-110.jpg",
        "photoCaption": "Viking Lander 2 being inspected on Earth before launch.",
        "photoId": "101-KSC-75P-110",
        "photoSource": "https://images.nasa.gov/details/101-KSC-75P-110",
        "sourceUrl": "https://science.nasa.gov/mission/viking-1/",
        "handoff3DUrl": "room.html?device=viking",
        "parts": [
          {
            "number": "01",
            "title": "Lander body",
            "description": "A component of Viking 1 & 2 Landers.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Sampling arm",
            "description": "A component of Viking 1 & 2 Landers.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Cameras",
            "description": "A component of Viking 1 & 2 Landers.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Communications antenna",
            "description": "A component of Viking 1 & 2 Landers.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "phoenix_insight",
        "model": "phoenix_insight",
        "code": "04",
        "groupId": "mars",
        "name": "Phoenix & InSight",
        "tagline": "Two landers explored ice and the interior of Mars.",
        "summary": "Phoenix studied Martian soil and ice; InSight investigated the planet’s interior.",
        "details": "Phoenix landed in 2008 near the Martian north pole. InSight landed in 2018 and used a seismometer to listen for marsquakes. Both missions have ended.",
        "thumbUrl": "photos/PIA19402.jpg",
        "image2DUrl": "photos/PIA19402.jpg",
        "photoCaption": "InSight lander during assembly on Earth, 2015; Phoenix is not pictured.",
        "photoId": "PIA19402",
        "photoSource": "https://images.nasa.gov/details/PIA19402",
        "sourceUrl": "https://science.nasa.gov/mission/insight/",
        "handoff3DUrl": "room.html?device=phoenix_insight",
        "parts": [
          {
            "number": "01",
            "title": "Solar arrays",
            "description": "A component of Phoenix & InSight.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Robotic arm",
            "description": "A component of Phoenix & InSight.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Science deck",
            "description": "A component of Phoenix & InSight.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Seismometer (InSight)",
            "description": "A component of Phoenix & InSight.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "ingenuity",
        "model": "ingenuity",
        "code": "05",
        "groupId": "mars",
        "name": "Ingenuity Helicopter",
        "tagline": "The first powered aircraft to fly on another planet.",
        "summary": "Ingenuity demonstrated flight in the thin Martian atmosphere.",
        "details": "The helicopter arrived with Perseverance in 2021 and completed 72 flights. Rotor damage ended its flying mission in 2024.",
        "thumbUrl": "photos/PIA23882.jpg",
        "image2DUrl": "photos/PIA23882.jpg",
        "photoCaption": "The Ingenuity flight model photographed on Earth before its Mars mission.",
        "photoId": "PIA23882",
        "photoSource": "https://images.nasa.gov/details/PIA23882",
        "sourceUrl": "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
        "handoff3DUrl": "room.html?device=ingenuity",
        "parts": [
          {
            "number": "01",
            "title": "Rotor blades",
            "description": "A component of Ingenuity Helicopter.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Solar panel",
            "description": "A component of Ingenuity Helicopter.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Flight computer",
            "description": "A component of Ingenuity Helicopter.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Landing legs",
            "description": "A component of Ingenuity Helicopter.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      }
    ]
  },
  {
    "id": "deep",
    "title": "Deep Space",
    "code": "C",
    "subtitle": "Spacecraft that explored asteroids, planets and distant stars.",
    "devices": [
      {
        "id": "dawn",
        "model": "dawn",
        "code": "01",
        "groupId": "deep",
        "name": "Dawn Spacecraft",
        "tagline": "An ion-powered explorer of Vesta and Ceres.",
        "summary": "Dawn studied two large bodies in the asteroid belt.",
        "details": "After orbiting Vesta, Dawn reached dwarf planet Ceres. Its mission ended in 2018 when it exhausted its maneuvering fuel; it remains in orbit around Ceres.",
        "thumbUrl": "photos/PIA12028.jpg",
        "image2DUrl": "photos/PIA12028.jpg",
        "photoCaption": "Dawn spacecraft during assembly on Earth.",
        "photoId": "PIA12028",
        "photoSource": "https://images.nasa.gov/details/PIA12028",
        "sourceUrl": "https://science.nasa.gov/mission/dawn/",
        "handoff3DUrl": "room.html?device=dawn",
        "parts": [
          {
            "number": "01",
            "title": "Ion engines",
            "description": "A component of Dawn Spacecraft.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Solar arrays",
            "description": "A component of Dawn Spacecraft.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Camera",
            "description": "A component of Dawn Spacecraft.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Communications antenna",
            "description": "A component of Dawn Spacecraft.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "near",
        "model": "near",
        "code": "02",
        "groupId": "deep",
        "name": "NEAR Shoemaker",
        "tagline": "An asteroid explorer that landed on Eros.",
        "summary": "NEAR Shoemaker became the first spacecraft to orbit an asteroid.",
        "details": "After studying asteroid 433 Eros from orbit, NEAR made a controlled landing on its surface in 2001, where it remains.",
        "thumbUrl": "photos/9701593.jpg",
        "image2DUrl": "photos/9701593.jpg",
        "photoCaption": "NEAR spacecraft during preflight preparations at Kennedy Space Center.",
        "photoId": "9701593",
        "photoSource": "https://images.nasa.gov/details/9701593",
        "sourceUrl": "https://science.nasa.gov/mission/near-shoemaker/",
        "handoff3DUrl": "room.html?device=near",
        "parts": [
          {
            "number": "01",
            "title": "Solar panels",
            "description": "A component of NEAR Shoemaker.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Camera",
            "description": "A component of NEAR Shoemaker.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Antenna",
            "description": "A component of NEAR Shoemaker.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Scientific instruments",
            "description": "A component of NEAR Shoemaker.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "pioneer",
        "model": "pioneer",
        "code": "03",
        "groupId": "deep",
        "name": "Pioneer 10 & 11",
        "tagline": "Early robotic pioneers of the outer solar system.",
        "summary": "Pioneer 10 and 11 explored the outer planets and carried plaques about humanity.",
        "details": "Pioneer 10 flew past Jupiter; Pioneer 11 visited Jupiter and Saturn. Their missions ended after contact was lost, and the spacecraft continue outward.",
        "thumbUrl": "photos/ARC-1972-AC72-2135.jpg",
        "image2DUrl": "photos/ARC-1972-AC72-2135.jpg",
        "photoCaption": "Pioneer 10 being prepared on Earth before launch; Pioneer 11 is not pictured.",
        "photoId": "ARC-1972-AC72-2135",
        "photoSource": "https://images.nasa.gov/details/ARC-1972-AC72-2135",
        "sourceUrl": "https://science.nasa.gov/mission/pioneer-10/",
        "handoff3DUrl": "room.html?device=pioneer",
        "parts": [
          {
            "number": "01",
            "title": "High-gain antenna",
            "description": "A component of Pioneer 10 & 11.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Power generators",
            "description": "A component of Pioneer 10 & 11.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Scientific instruments",
            "description": "A component of Pioneer 10 & 11.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Message plaque",
            "description": "A component of Pioneer 10 & 11.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      },
      {
        "id": "kepler",
        "model": "kepler",
        "code": "04",
        "groupId": "deep",
        "name": "Kepler Space Telescope",
        "tagline": "A telescope that revealed worlds beyond our solar system.",
        "summary": "Kepler searched for planets by monitoring changes in starlight.",
        "details": "The spacecraft helped scientists discover thousands of exoplanets. It retired in 2018 after running low on fuel and remains in an Earth-trailing orbit around the Sun.",
        "thumbUrl": "photos/PIA11733.jpg",
        "image2DUrl": "photos/PIA11733.jpg",
        "photoCaption": "Kepler spacecraft photographed on Earth before launch.",
        "photoId": "PIA11733",
        "photoSource": "https://images.nasa.gov/details/PIA11733",
        "sourceUrl": "https://science.nasa.gov/mission/kepler/",
        "handoff3DUrl": "room.html?device=kepler",
        "parts": [
          {
            "number": "01",
            "title": "Telescope",
            "description": "A component of Kepler Space Telescope.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "02",
            "title": "Photometer",
            "description": "A component of Kepler Space Telescope.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "03",
            "title": "Solar panels",
            "description": "A component of Kepler Space Telescope.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          },
          {
            "number": "04",
            "title": "Communications antenna",
            "description": "A component of Kepler Space Telescope.",
            "usage": "See the linked NASA mission source for more information about this equipment."
          }
        ]
      }
    ]
  }
];
// Simple descriptions explain the role of each component; mission sources are linked on each page.
var partFacts = {
"Descent stage":"The lower part carried the landing engine and stayed on the Moon.","Landing legs":"Legs supported the lander as it touched down.","Ladder":"The ladder allowed astronauts to climb between the cabin and the surface.","Ascent stage":"The upper crew cabin lifted astronauts back into lunar orbit.","Wire-mesh wheels":"Lightweight wheels helped the rover travel over lunar soil.","Batteries":"Stored electrical energy powered the lunar rover.","Control handle":"A hand controller let an astronaut drive and steer the rover.","Communications antenna":"An antenna sent information between the mission and Earth.","Central station":"The central station gathered experiment measurements and relayed them to Earth.","Seismometer":"This instrument detected ground vibrations, such as moonquakes or marsquakes.","Power source":"The power system supplied electricity to the instruments.","Scientific instruments":"Sensors collected measurements for scientists to study.","Television camera":"The camera returned pictures from the lunar surface.","Surface sampler":"The sampler disturbed lunar soil so its properties could be investigated.","Antenna":"The antenna transmitted information and received commands.","Six wheels":"Six wheels gave the rover mobility over uneven Martian ground.","Solar panel":"Solar cells convert sunlight into electrical energy.","Cameras":"Cameras record the surroundings for navigation or scientific study.","X-ray spectrometer":"The instrument measured the chemical makeup of rocks and soil.","Solar arrays":"Solar cells generate electricity from sunlight.","Camera mast":"The raised mast carries cameras for viewing the landscape.","Robotic arm":"A moving arm places tools or instruments where they are needed.","Lander body":"The body holds and supports the lander’s systems and instruments.","Sampling arm":"The arm gathered Martian soil for the lander’s experiments.","Science deck":"The deck supports the lander’s scientific and engineering systems.","Seismometer (InSight)":"InSight’s seismometer detected seismic waves traveling through Mars.","Rotor blades":"The rotating blades provide lift in the thin Martian atmosphere.","Flight computer":"Onboard computing controls the helicopter’s flight.","Landing legs":"The legs support the craft when it is on the ground.","Ion engines":"Ion propulsion uses electrically accelerated ions to produce a gentle thrust.","Camera":"A camera records images for observation and navigation.","Solar panels":"Solar cells convert sunlight into electrical energy.","High-gain antenna":"The large directional antenna sends and receives radio signals.","Power generators":"These generators supplied electricity for the long journey away from the Sun.","Message plaque":"The plaque carries a symbolic message about humanity and Earth.","Telescope":"The telescope gathers light from distant stars.","Photometer":"The photometer measures changes in the brightness of stars."
};
groups.forEach(function(g){g.devices.forEach(function(d){d.parts.forEach(function(p){p.description=partFacts[p.title]||'A component that supports this mission.';p.usage='Learn more from the NASA mission source linked above.';});});});
var devices=groups.flatMap(function(g){return g.devices;});
window.SpaceData={groups:groups,devices:devices,settings:{totalDevices:devices.length},getDevice:function(id){return devices.find(function(d){return d.id===id;})||null;},getGroup:function(id){return groups.find(function(g){return g.id===id;})||null;},getGroupOf:function(d){return d?this.getGroup(d.groupId):null;},firstDeviceId:devices[0].id};
})();
