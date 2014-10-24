
  var controls, renderer, camera, scene, ambientLight;
  
  function init(){

    /* Escena */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
      
    /* Cámara */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 200;
    scene.add(camera);
    
    /* Control de la cámara */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    controls.addEventListener('change', render);
    
    /* Luz */
    var ambient = new THREE.AmbientLight( 0xFFFFFF );
    scene.add( ambient );
    
    /* Modelo y textura */
    /*var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var loader = new THREE.OBJMTLLoader();
    loader.load( 'models/penguin.obj', 'models/penguin.mtl', function ( object ) {
          
        scene.add( object );

    }, onProgress, onError );*/
    var manager = new THREE.LoadingManager();
      manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };
    
    var texture = new THREE.Texture();
    
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    
    var onError = function ( xhr ) {};
    
    var loader = new THREE.ImageLoader( manager );
      loader.load( 'textures/oro.jpg', function ( image ) {
      texture.image = image;
      texture.needsUpdate = true;
    } );

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'models/house.obj', function ( object ) {
      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.map = texture;
        }
      } );
      
      scene.add( object );
    }, onProgress, onError );
    
    render();
  }
  
  function render() {
    renderer.render(scene,camera);
    setTimeout("render()", 20);
  }