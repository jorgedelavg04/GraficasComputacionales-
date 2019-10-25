var renderer = null,
scene = null,
camera = null,
root = null,
penguin = null,penguinContainer=null,
group = null,
orbitControls = null;

var objLoader = null, objLoader = null;

var duration = 10;
var currentTime = Date.now();

function loadObj()
{
    if(!objLoader)
        objLoader = new THREE.OBJLoader();

    objLoader.load(
        '../models/Penguin_obj/penguin.obj',

        function(object)
        {
          var texture = new THREE.TextureLoader().load('../models/Penguin_obj/peng_texture.jpg');
          var normalMap = new THREE.TextureLoader().load('../models/Penguin_obj/peng_texture.jpg');
          var specularMap = new THREE.TextureLoader().load('../models/Penguin_obj/peng_texture.jpg');

            object.traverse( function ( child )
            {
                if ( child instanceof THREE.Mesh )
                {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.map = texture;
                    child.material.normalMap = normalMap;
                    child.material.specularMap = specularMap;

                }
            } );

      
            penguin = object;
            penguin.scale.set(0.7,0.7,0.7);
            //penguin.add(directionalLight);
            //penguin.rotation.y = -Math.PI * 0.25;
            //penguin.position.z = -3;
            //penguin.position.x = -1.5;
            //penguin.rotation.x = Math.PI / 180 * 15;
            penguin.rotation.y =  Math.PI / 180 * 315 ;
            //penguin.castShadow = true;
            penguinContainer.add(penguin);
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        });
}

function setLightColor(light, r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;

    light.color.setRGB(r, g, b);
}

function playAnimations()
{

  penguinAnimator = new KF.KeyFrameAnimator;
  penguinAnimator.init({
      interps:
          [
            {
              
               keys:[0,0.02, 0.15,0.17, 0.27,0.29, 0.35,0.37, 0.47, 0.49, 0.57, 0.59,0.73, 0.75, 0.86,0.88,0.99, 1],
                values:[
                        { x : 20, y:0, z: 0 },
                        { x : 20, y:0, z: 0 },

                        { x : 0, y:0, z: 20 },
                        { x : -3, y:0, z: 20 },

                        { x : -20, y:0, z: 0 },
                        { x : -20, y:0, z: -3 },

                        { x : 0, y:0, z: -20 },
                        { x : 3, y:0, z: -20 },
                        
                        { x : 20, y:0, z: 0 },
                        { x : 20, y:0, z: 0 },

                        { x : 40, y:0, z: 20 },
                        { x : 43, y:0, z: 20 },

                        { x : 60, y:0, z: 0 },
                        { x : 60, y:0, z: -3 },

                        { x : 43, y:0, z: -20 },
                        { x : 40, y:0, z: -20 },
                        
                        { x : 20, y:0, z: 0 },
                        { x : 20, y:0, z: 0},

                        ],
                target:penguinContainer.position
            },

              {
                  keys:[0,0.02, 0.15,0.17,0.23,0.25,0.29,0.35, 0.37,0.47,0.49,0.57, 0.59,0.73,0.75,0.86,0.88,1],

                  values:[ 
                          {y:Math.PI / 180 * 315},
                          {y:Math.PI / 180 * 312},
                          {y:Math.PI / 180 * 300},
                          {y:Math.PI / 180 * 280},
                          {y:Math.PI / 180 * 260},
                          {y:Math.PI / 180 * 250},
                          {y:Math.PI / 180 * 215},
                          {y:Math.PI / 180 * 190},
                          {y:Math.PI / 180 * 180},
                          {y:Math.PI / 180 * 135},
                          {y:Math.PI / 180 * 135},
                          {y:Math.PI / 180 * 135},
                          {y:Math.PI / 180 * 140},
                          {y:Math.PI / 180 * 250},
                          {y:Math.PI / 180 * 270},
                          {y:Math.PI / 180 * 290},
                          {y:Math.PI / 180 * 315},
                          {y:Math.PI / 180 * 315},                    
                          ],
                  target: penguinContainer.rotation
              },
          ],
      loop: true,
      duration:duration * 1000,

  });
  penguinAnimator.start();

  penguinAnimatorMove = new KF.KeyFrameAnimator;
  penguinAnimatorMove.init({
      interps:
          [
              {keys:[0,0.2,0.4,0.6,0.8,1],
                  values:[
                          {z:0}, 
                          {z:Math.PI / 180 * 15},
                          {z:-Math.PI / 180 * 15},
                          {z:Math.PI / 180 * 15},
                          {z:-Math.PI / 180 * 15},
                          {z:0}, 
                          ],
                  target: penguinContainer.rotation
              },
          ],
      loop: true,
      duration:1000,

  });
  penguinAnimatorMove.start();

}


function run() {
    requestAnimationFrame(function() { run(); });

        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        //animate();
        KF.update();

        // Update the camera controller
        orbitControls.update();
}


var directionalLight = null;
var spotLight = null;
var ambientLight = null;
var mapUrl = "../images/snow_texture.jpg";

var SHADOW_MAP_WIDTH = 3048, SHADOW_MAP_HEIGHT = 3048;

function createScene(canvas) {

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-2, 6, 12);
    scene.add(camera);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 2);

    // Create and add all the lights
    directionalLight.position.set(1, 1, -6);
    //directionalLight.target.position.set(0,5,5);
    directionalLight.castShadow = true;
    root.add(directionalLight);

    
    spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(2, 8, 70);
    spotLight.target.position.set(-2, 0, -2);
    spotLight.castShadow = true;
    root.add(spotLight);

    ambientLight = new THREE.AmbientLight ( 0xffffff, 0.4);
    root.add(ambientLight);

    
    pointLight = new THREE.PointLight(0xffffff, 0.8, 0);
    pointLight.position.set(0,5,5);

    pointLight.castShadow = true;

    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 200;
    pointLight.shadow.camera.fov = 45;

    pointLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    pointLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    var pointLightHelper = new THREE.PointLightHelper( pointLight, 1.1 );
    //root.add(pointLight);
    //root.add(pointLightHelper);
 


    penguinContainer = new THREE.Object3D;
    root.add(penguinContainer);
    // Create the objects
    loadObj();


    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // Create a texture map
    var map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);

    var color = 0xffffff;

    // Put in a ground plane to show off the lighting
    geometry = new THREE.PlaneGeometry(500, 500, 50, 50);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0;

    // Add the mesh to our group
    group.add( mesh );
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    // Now add the group to our scene
    scene.add( root );
}