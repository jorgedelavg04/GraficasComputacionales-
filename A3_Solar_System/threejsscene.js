var renderer = null, 
scene = null, 
camera = null,
cubeGroup = null,
cube = null,
sphere = null,
radiusOrbit = null;
size = null;
x = null;
orbitControls = null;
var texture = null;
var materials = {};
var mapUrl = null;
var textureMap = null;
var bumpMapUrl = null;
var bumpMap = null;
var duration = 5000; // ms
var currentTime = Date.now();
moon1 = null;
var group = null;
var moonSize = null;
var moonX = null;
var moonY = null;

function animate() 
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    //PLANETS ROTATION IN Y
    
    sphereNormalMapped1.rotation.y += angle + 0.035;
    sphereNormalMapped2.rotation.y += angle + 0.03;
    sphereNormalMapped3.rotation.y += angle + 0.009;
    sphereNormalMapped4.rotation.y += angle + 0.004;
    sphereNormalMapped5.rotation.y += angle + 0.0045;
    sphereNormalMapped6.rotation.y += angle + 0.003;
    sphereNormalMapped7.rotation.y += angle + 0.0035;
    sphereNormalMapped8.rotation.y += angle + 0.0025;
    sphereNormalMapped9.rotation.y += angle + 0.0020;
    sphereNormalMapped10.rotation.y += angle + 0.006;
    sunNormalMapped1.rotation.y += 0;
    //moon1.rotation.y += 1;
    
    //PLANET GROUPS ROTATION IN Z (CIRCLE)
    mercuryGroup.rotation.z += 0.05;
    venusGroup.rotation.z += 0.025;
    earthGroup.rotation.z += 0.01;
    marsGroup.rotation.z += 0.009;
    asteroidGroup.rotation.z += 0.004;
    jupiterGroup.rotation.z += 0.005;;
    saturnGroup.rotation.z += 0.004;
    uranoGroup.rotation.z += 0.003;
    neptunoGroup.rotation.z += 0.002;
    plutonGroup.rotation.z += 0.001;



    //MOONS ROTATION ON X AXIS OF THEIR PLANET GROUPS
    moonGroup.rotation.x += angle;
    marsMoonGroup.rotation.x += angle;
    jupiterMoonGroup.rotation.x += angle;
    saturnMoonGroup.rotation.x += angle;
    uranoMoonGroup.rotation.x += angle;
    neptuneMoonGroup.rotation.x += angle;
    plutonMoonGroup.rotation.x +=angle;


}

function run() {
    requestAnimationFrame(function() { run(); });
    renderer.render( scene, camera );
    //orbitControls.update();
    controls.update();
    animate();
    //orbitControls.update();
}

function createMaterials(mapUrl, bumpMapUrl){

    textureMap = new THREE.TextureLoader().load(mapUrl);
    bumpMap = new THREE.TextureLoader().load(bumpMapUrl);
    materials["phong"] = new THREE.MeshPhongMaterial({ bumpMap: bumpMap, bumpScale: 0.06});
    materials["phong-textured"] = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 0.06 });
}


function setMaterialColor(r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    materials["phong"].color.setRGB(r, g, b);
    materials["phong-normal"].color.setRGB(r, g, b);
}

function setMaterialSpecular(r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    materials["phong"].specular.setRGB(r, g, b);
    materials["phong-normal"].specular.setRGB(r, g, b);
}

var materialName = "phong-normal";  
var normalMapOn = true;

function setMaterial(name)
{
    materialName = name;
    if (normalMapOn)
    {
        sphere.visible = false;
        sphereNormalMapped.visible = true;
        sphereNormalMapped.material = materials[name];
    }
    else
    {
        sphere.visible = true;
        sphereNormalMapped.visible = false;
        sphere.material = materials[name];
    }
}

function toggleNormalMap()
{
    normalMapOn = !normalMapOn;
    var names = materialName.split("-");
    if (!normalMapOn)
    {
        setMaterial(names[0]);
    }
    else
    {
        setMaterial(names[0] + "-normal");
    }
}

function onKeyDown ( event )
{
    switch ( event.keyCode ) {

        case 32:
            animating = !animating;
            break;
    }

}



function createScene(canvas)
{    
    
    document.addEventListener( 'keydown', onKeyDown, false );
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color 
    //scene.background = new THREE.Color( 0.2, 0.2, 0.2 );
    scene.background = new THREE.Color( "rgb(0, 0, 0)" );
    scene.background = new THREE.TextureLoader().load("../images/starmap_4k.jpg");

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 5000 );
    camera.position.z = 10;
    controls = new THREE.OrbitControls( camera, renderer.domElement);
    scene.add(camera, renderer.domElement);
    controls.update();


    // Create a group to hold all the objects
    cubeGroup = new THREE.Object3D;
    
    //Light that will light up just the middle of the planets facing the sun
    var light = new THREE.SpotLight(0xfff8d4, 2, 0, 2);
    light.position.set(0, 0, 0);
    cubeGroup.add(light);

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(1, 20, 20);
    createMaterials("../images/2k_sun.jpg","../images/sunmap.jpg");
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh( geometry, materials["phong"]);
    //setMaterial("phong-normal");
    sphere.visible = false;

    sphereNormalMapped = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped.visible = true;
    setMaterial("phong-textured");
    

    //SUN GROUP CONTAINING SUN
    sunGroup = new THREE.Object3D;
    cubeGroup.add(sunGroup)

    //MERCURY GROUP CONTAINING MERCURY
    mercuryGroup = new THREE.Object3D;
    cubeGroup.add(mercuryGroup);

    //VENUS GROUP CONTAINING VENUS
    venusGroup = new THREE.Object3D;
    cubeGroup.add(venusGroup);

    //EARTH GROUP CONTAINING PLANET AND GROUP OF MOON
    earthGroup = new THREE.Object3D;
    cubeGroup.add(earthGroup);

    moonGroup = new THREE.Object3D;
    earthGroup.add(moonGroup);

    //MARS GROUP CONTAINING PLANET AND GROUP OF MOONS
    marsGroup = new THREE.Object3D;
    cubeGroup.add(marsGroup);
    
    marsMoonGroup = new THREE.Object3D;
    marsGroup.add(marsMoonGroup);
    
    //ASTEROID GROUP
    asteroidGroup = new THREE.Object3D;
    cubeGroup.add(asteroidGroup);

    //JUPITER GROUP CONTAINING PLANET AND GROUP OF MOONS
    jupiterGroup = new THREE.Object3D;
    cubeGroup.add(jupiterGroup);

    jupiterMoonGroup = new THREE.Object3D;
    jupiterGroup.add(jupiterMoonGroup);

    //ASTEROIDS
    meteoritoGroup = new THREE.Object3D;
    cubeGroup.add(meteoritoGroup);

    //SATURN GROUP CONTAINING PLANETS AND GROUP OF MOONS  
    saturnGroup = new THREE.Object3D;
    cubeGroup.add(saturnGroup);

    saturnMoonGroup = new THREE.Object3D;
    saturnGroup.add(saturnMoonGroup);

    //URANUS GROUP CONTAINING PLANETS AND GROUP OF MOONS
    uranoGroup = new THREE.Object3D;
    cubeGroup.add(uranoGroup);

    uranoMoonGroup = new THREE.Object3D;
    uranoGroup.add(uranoMoonGroup);

    //NEPTUNE GROUP CONTAINING PLANETS AND GROUP OF MOONS
    neptunoGroup = new THREE.Object3D;
    cubeGroup.add(neptunoGroup);

    neptuneMoonGroup = new THREE.Object3D;
    neptunoGroup.add(neptuneMoonGroup);

    //PLUTON GROUP CONTAINING PLANETS AND GROUP OF MOONS
    plutonGroup = new THREE.Object3D;
    cubeGroup.add(plutonGroup);

    plutonMoonGroup = new THREE.Object3D;
    plutonGroup.add(plutonMoonGroup);

    
    //CALLING FUNCTIONS FOR PLANETS AND SUN 
    //SUN
    sun(1,0);

    //PLANETS
    planet(0.3,2.0);
    planet2(0.5,3.4);
    planet3(0.5,5.0);
    planet4(0.4,6.8)

    //ASTEROIDS
    asteroid(9, 2);
    asteroid(9,3);
    asteroid(10, 4);
    asteroid(9.7, -2);
    asteroid(9, -3);
    asteroid(9.5, -4); 
    asteroid(10.5, 2.7);
    asteroid(8.5, -2.5);
    asteroid(8.9,0);
    asteroid(10, 5);
    asteroid(8.5, 6);
    asteroid(8.9, -8);    
    asteroid(9.5, -7.7);
    asteroid(0, -9.1);
    asteroid(1, -9.5);
    asteroid(2, -8.2);
    asteroid(3, -10);
    asteroid(4, -8.7);
    asteroid(5, 8.4);
    asteroid(6, 10.2);
    asteroid(7, 9.2);
    asteroid(6, 8);
    asteroid(0, 9.1);
    asteroid(-1, 9.9);
    asteroid(-2, 10.4);
    asteroid(-3, 8);
    asteroid(-4, 9.3);
    asteroid(-5, 8.4);
    asteroid(-6, 10.2);
    asteroid(-7, 9.2);
    asteroid(-6, 8);
    asteroid(0.5, 9.1);
    asteroid(-1.5, 9.9);
    asteroid(-4.5, 10.4);
    asteroid(-6.5, 8);
    asteroid(-7, -9.2);
    asteroid(-6, -8);
    asteroid(0, -9.5);
    asteroid(-1, -10);
    asteroid(-2, -9.3);
    asteroid(-3, -8);
    asteroid(-4, -9.5);
    asteroid(-5, -10.5);
    asteroid(-6, -9.7);
    asteroid(-7, -9.2);
    asteroid(-6, -9.3);
    asteroid(-8.5, 2.3);
    asteroid(-8.7, 3.6);
    asteroid(-10, -2);
    asteroid(-9.3, -3);
    asteroid(-9.1, -6); 
    asteroid(-9.5, -5);
    asteroid(-9.7, 7);
    asteroid(-9.3,0);


    //RESTING PLANETS
    planet5(1.8,13.5);
    planet6(1.56, 19);
    planet7(1.36, 25);
    planet8(1.36, 30.5);
    planet9(0.3, 33.5);


    //ORBITS
    orbits(2.0);
    orbits(3.4);
    orbits(5.0);
    orbits(6.8);
    orbits(13.5);
    orbits(19);
    orbits(25);
    orbits(30.5);
    orbits(33.5);


    //ADD SCENE
    scene.add( cubeGroup );

}

//CREATE ORBITS  
function orbits(radiusOrbit) {
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });

    var segmentCount = 365,
    radius = radiusOrbit,
    geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: 0xFFFF2b });

    for (var i = 0; i <= segmentCount; i++) {
        var theta = (i / segmentCount) * Math.PI * 2;
        geometry.vertices.push(
            new THREE.Vector3(
                Math.cos(theta) * radius,
                Math.sin(theta) * radius,
                0));            
    }
    
    cubeGroup.add(new THREE.Line(geometry, material));
}

//CREATE SUN
function sun(size,x) {

    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/2k_sun.jpg","../images/sunmap.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sun = new THREE.Mesh( geometry, materials["phong"]);
    sun.visible = false;
    sun.position.set(x,0,0);

    //textureMap = new THREE.TextureLoader().load("../images/sunmap.jpg");
    sunNormalMapped1 = new THREE.Mesh(geometry, materials["basic"]);
    sunNormalMapped1.visible = false;

    setMaterial("basic");
    sunNormalMapped1.position.set(x,0,0);
    
    sun1 = new THREE.Mesh((new THREE.SphereGeometry(size, 20, 20)),(new THREE.MeshBasicMaterial({ map:new THREE.TextureLoader().load("../images/sunmap.jpg")})));
    sun1.position.set(x,0,0)
    sunGroup.add( sun1 );
    
}

function moons(group, moonSize, moonX, moonY) {
    moon1 = new THREE.Mesh((new THREE.SphereGeometry(moonSize, 20, 20)),(new THREE.MeshPhongMaterial({ map:new THREE.TextureLoader().load("../images/moonmap2k.jpg"), bumpMap: new THREE.TextureLoader().load("../images/moonbump2k.jpg"), bumpScale: 0.1})));
    moon1.position.set(moonX, moonY, 0);
    moon1.rotation.y +=  0.5;
    group.add(moon1);
}

//CREATE MERCURY
function planet(size,x) {

    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/mercurymap.jpg","../images/mercurybump.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere1 = new THREE.Mesh( geometry, materials["phong"]);
    sphere1.visible = false;
    sphere1.position.set(x,0,0);

    sphereNormalMapped1 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped1.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped1.position.set(x,0,0);

    mercuryGroup.add( sphere1 );
    mercuryGroup.add( sphereNormalMapped1);

}

//CREATE VENUS
function planet2(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/venusmap.jpg","../images/venusbump.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere2 = new THREE.Mesh( geometry, materials["phong"]);
    sphere2.visible = false;
    sphere2.position.set(x,0,0);

    sphereNormalMapped2 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped2.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped2.position.set(x,0,0);

    venusGroup.add( sphere2 );
    venusGroup.add( sphereNormalMapped2);

}

//CREATE EARTH
function planet3(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/earthmap1k.jpg","../images/earthbump1k.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphere3 = new THREE.Mesh( geometry, materials["phong"]);
    sphere3.visible = false;
    sphere3.position.set(x,0,0);

    sphereNormalMapped3 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped3.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped3.position.set(x,0,0);

    moons(moonGroup,0.1,5.0,-1);
    
    earthGroup.add( sphere3 );
    earthGroup.add( sphereNormalMapped3);
}

//CREATE MARS
function planet4(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/marsmap1k.jpg","../images/marsbump1k.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere4 = new THREE.Mesh( geometry, materials["phong"]);
    sphere4.visible = false;
    sphere4.position.set(x,0,0);

    sphereNormalMapped4 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped4.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped4.position.set(x,0,0);


    Deimos = new THREE.Mesh((new THREE.SphereGeometry(0.1, 20, 20)),(new THREE.MeshPhongMaterial({ map:new THREE.TextureLoader().load("../images/deimosbump.jpg"), bumpMap: new THREE.TextureLoader().load("images/moonbump1k.jpg"), bumpScale: 0.1})));
    Deimos.position.set(7, -0.5, 0);
    marsMoonGroup.add(Deimos);
    Phobos = new THREE.Mesh((new THREE.SphereGeometry(0.08, 20, 20)),(new THREE.MeshPhongMaterial({ map:new THREE.TextureLoader().load("../images/phobosbump.jpg"), bumpMap: new THREE.TextureLoader().load("images/moonbump1k.jpg"), bumpScale: 0.1})));
    Phobos.position.set(6.6, -1, 0);
    marsMoonGroup.add(Phobos);

    marsGroup.add( sphere4 );
    marsGroup.add( sphereNormalMapped4);

}

//CREATE ASTEROIDS
function asteroid(x,y) {
    var geometry = new THREE.SphereGeometry(0.15, 50, 50 );
    createMaterials("../images/asteroid.jpg","../images/asteroidbump.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphereNormalMapped10 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped10.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped10.position.set(x,y,0);

    asteroidSphere1 = new THREE.Mesh((new THREE.SphereGeometry(0.15, 20, 20)),(new THREE.MeshPhongMaterial({ map:new THREE.TextureLoader().load("../images/asteroid.jpg"), bumpMap: new THREE.TextureLoader().load("images/asteroidbump.jpg"), bumpScale: 0.1})));
    asteroidSphere1.position.set(8.2, 2, 0);
    
    asteroidGroup.add( sphereNormalMapped10);
  
}

//CREATE JUPITER
function planet5(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/jupiter.jpg","../images/jupiterbump.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere5 = new THREE.Mesh( geometry, materials["phong"]);
    sphere5.visible = false;
    sphere5.position.set(x,0,0);

    sphereNormalMapped5 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped5.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped5.position.set(x,0,0);

    //Jupiter moons
    moons(jupiterMoonGroup, 0.1, 15, 2);
    moons(jupiterMoonGroup, 0.05, 14, -2.5);
    moons(jupiterMoonGroup, 0.06, 14.7, 2.9);
    moons(jupiterMoonGroup, 0.08, 14.3, -2.8);
    moons(jupiterMoonGroup, 0.1, 14.5, 2.6);
    moons(jupiterMoonGroup, 0.04, 13.5, -2.7);
    moons(jupiterMoonGroup, 0.1, 13.6, 2.4);
    moons(jupiterMoonGroup, 0.08, 14.7, -2.2);
    moons(jupiterMoonGroup, 0.09, 14.2, -2);
    moons(jupiterMoonGroup, 0.09, 14.8, -2);


    jupiterGroup.add( sphere5 );
    jupiterGroup.add( sphereNormalMapped5);

}




//CREATE SATURN 
function planet6(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/8k_saturn.jpg","../images/8k_saturn.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere6 = new THREE.Mesh( geometry, materials["phong"]);
    sphere6.visible = false;
    sphere6.position.set(x,0,0);

    sphereNormalMapped6 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped6.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped6.position.set(x,0,0);

    S_ring = new THREE.Mesh((new THREE.RingGeometry(2.7,3.5, 30)),(new THREE.MeshBasicMaterial({ map:new THREE.TextureLoader().load("../images/ringsaturn.jpg")})));
    S_ring.position.set(19, 0, 0);
    S_ring.rotation.set(1.5, 0, 0);


    //Saturn Moons
    moons(saturnMoonGroup,0.06, 21, 2);
    moons(saturnMoonGroup,0.07, 18, -3.5);
    moons(saturnMoonGroup,0.08, 20, 2.5);
    moons(saturnMoonGroup,0.08, 18.3, 2);
    moons(saturnMoonGroup,0.06, 20.5, 2);
    moons(saturnMoonGroup,0.09, 18.5, -2);
    moons(saturnMoonGroup,0.09, 19.5, 2);
    moons(saturnMoonGroup,0.09, 20.3, -2);
    moons(saturnMoonGroup,0.05, 29.7, 3);
    moons(saturnMoonGroup,0.05, 20.7, -3);


    saturnGroup.add( sphere6 );
    saturnGroup.add( sphereNormalMapped6);
    saturnGroup.add(S_ring);
}

//CREATE URANUS
function planet7(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/uranusmap.jpg","../images/uranusmap.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere7 = new THREE.Mesh( geometry, materials["phong"]);
    sphere7.visible = false;
    sphere7.position.set(x,0,0);

    sphereNormalMapped7 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped7.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped7.position.set(x,0,0);

    U_ring = new THREE.Mesh((new THREE.RingGeometry(1.6, 2, 30)),(new THREE.MeshBasicMaterial({ map:new THREE.TextureLoader().load("../images/uranusringcolour.jpg")})));
    U_ring.position.set(25, 0, 0);
    U_ring.rotation.set(45, 0, 0);

    //Uranus Moons
    moons(uranoMoonGroup,0.07, 25, 1.3);
    moons(uranoMoonGroup,0.07, 24, -2.5);
    moons(uranoMoonGroup,0.07, 25.2, 1.5);
    moons(uranoMoonGroup,0.07, 24.8, 2.3);
    moons(uranoMoonGroup,0.07, 24, 2.1);
    moons(uranoMoonGroup,0.07, 25.6, 2);
    moons(uranoMoonGroup,0.07, 24.3, 1.7);
    moons(uranoMoonGroup,0.07, 25.1, 1.6);
    moons(uranoMoonGroup,0.07, 25.5, -1.3);
    moons(uranoMoonGroup,0.07, 25, -2.1);
    moons(uranoMoonGroup,0.07, 24, -2.3);
    
    uranoGroup.add(U_ring);
    uranoGroup.add( sphere7 );
    uranoGroup.add( sphereNormalMapped7);
  
}

//CREATE NEPTUNE
function planet8(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/2k_neptune.jpg","../images/neptunemap.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere8 = new THREE.Mesh( geometry, materials["phong"]);
    sphere8.visible = false;
    sphere8.position.set(x,0,0);

    sphereNormalMapped8 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped8.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped8.position.set(x,0,0);

    //Neptune Moons
    moons(neptuneMoonGroup,0.07, 30, 1);
    moons(neptuneMoonGroup,0.08, 30, -2);
    moons(neptuneMoonGroup,0.07, 31, 1.5);
    moons(neptuneMoonGroup,0.07, 30.4, -2.5);
    moons(neptuneMoonGroup,0.07, 30.8, 2.3);
    moons(neptuneMoonGroup,0.07, 30.6, -2.8);
    moons(neptuneMoonGroup,0.07, 30.2, 1.8);
    moons(neptuneMoonGroup,0.17, 30, -1);
    moons(neptuneMoonGroup,0.07, 31, -1.5);
    moons(neptuneMoonGroup,0.07, 30.4, 2.5);
    moons(neptuneMoonGroup,0.07, 30.8, -2.3);
    moons(neptuneMoonGroup,0.3, 30.6, 2.8); 
    
    neptunoGroup.add( sphere8 );
    neptunoGroup.add( sphereNormalMapped8);

}

//CREATE PLUTON
function planet9(size,x) {
    var geometry = new THREE.SphereGeometry(size, 20, 20 );
    createMaterials("../images/plutomap2k.jpg","../images/plutobump2k.jpg");
    var material= new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere9 = new THREE.Mesh( geometry, materials["phong"]);
    sphere9.visible = false;
    sphere9.position.set(x,0,0);

    sphereNormalMapped9 = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereNormalMapped9.visible = true;
    setMaterial("phong-textured");
    sphereNormalMapped9.position.set(x,0,0);

    Charon = new THREE.Mesh((new THREE.SphereGeometry(0.05, 20, 20)),(new THREE.MeshPhongMaterial({ map:new THREE.TextureLoader().load("../images/marsmap1k.jpg"), bumpMap: new THREE.TextureLoader().load("images/marsbump1k.jpg"), bumpScale: 0.1})));
    Charon.position.set(33.5, 0.5, 0);
    plutonMoonGroup.add(Charon);

    //Pluto Moons
    moons(plutonMoonGroup,0.05, 33.5, 0.4);
    moons(plutonMoonGroup,0.05, 33.6, 0.6);
    moons(plutonMoonGroup,0.05, 33.9, 0.2);
    moons(plutonMoonGroup,0.05, 33.7, 0.7);
    moons(plutonMoonGroup,0.05, 33.8, 0.2);
    moons(plutonMoonGroup,0.05, 33.2, 0.5);
    moons(plutonMoonGroup,0.05, 33.4, 0.3);
    moons(plutonMoonGroup,0.05, 33.2, 0.2);
    moons(plutonMoonGroup,0.05, 33.6, 0.6);
    moons(plutonMoonGroup,0.05, 33.1, 0.2);

    plutonGroup.add( sphere9 );
    plutonGroup.add( sphereNormalMapped9);
}




