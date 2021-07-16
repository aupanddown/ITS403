function fn1() {
    const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const img_url = urlParams.get('imgurl')
        console.log(img_url);
        const token_id = urlParams.get('token')
        console.log(token_id);
        kag = "<img src='" + img_url +"&token="+ token_id + "' heigh='200'></div>";
        var h = document.getElementById("imglist");
        var str = "<img src='" + img_url +"&token="+ token_id + "' heigh='200'></div>";
        rawurl = img_url +"&token="+ token_id;
        var res = str.replace("360imgs/", "360imgs%2F");
        var realrawurl = rawurl.replace("360imgs/", "360imgs%2F");
        // h.insertAdjacentHTML("afterend", res);
        console.log ("RES:" + res);
        console.log("REAL RAW URL:" + realrawurl);

      var panorama_main_video, panorama_main_video2, panorama_main_image, viewer_main;
      var panorama_side_image, viewer_side;
      var infospot1, infospot2, infospot3, infospot4, infospot5;

      progressElement = document.getElementById( 'progress' );

      function onEnter ( event ) {
    
        progressElement.style.width = 0;
        progressElement.classList.remove( 'finish' );
    
      }
    
      function onProgress ( event ) {
    
        progress = event.progress.loaded / event.progress.total * 100;
        progressElement.style.width = progress + '%';
        if ( progress === 100 ) {
          progressElement.classList.add( 'finish' );
        }
    
      }
      // Main panorama
      viewer_main = new PANOLENS.Viewer({ enableReticle: false, output: 'console', viewIndicator: true, autoRotate: true, autoRotateSpeed: 1, autoRotateActivationDuration: 50000, dwellTime: 1000 });

      const logEvent = ( { type } ) => console.log( type );
      viewer_main.reticle.addEventListener('reticle-start', logEvent );
      viewer_main.reticle.addEventListener('reticle-update', logEvent );
      viewer_main.reticle.addEventListener('reticle-end', logEvent );
      viewer_main.reticle.addEventListener('reticle-ripple-start', logEvent );
      viewer_main.reticle.addEventListener('reticle-ripple-end', logEvent );

      // panorama_main_video = new PANOLENS.VideoPanorama( 'asset/textures/video/ClashofClans.mp4', { autoplay: true, muted: false });

      // var cube = new THREE.Mesh( new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial() );
      // cube.position.set(1000, 0, 0);
      // panorama_main_video.add( cube );
      // panorama_main_video.addEventListener( 'progress',function(e){
      //   console.log(e.progress);
      // });
      
    //   panorama_main_video2 = new PANOLENS.VideoPanorama( 'asset/textures/video/1941-battle-low.mp4', { autoplay: false, muted: true });
    //   panorama_main_video2.setLinkingImage( 'asset/textures/1941-battle-thumb.png' );
    //   panorama_main_video2.addEventListener( 'progress',function(e){
    //     console.log(e.progress);
    //   });
    // panorama_main_image = new PANOLENS.ImagePanorama( realrawurl );
    panorama_main_image = new PANOLENS.ImagePanorama( "images/SC-Center.jpg" );
    panorama_main_image2 = new PANOLENS.ImagePanorama( "images/SC-1.jpg" );
    panorama_main_image3 = new PANOLENS.ImagePanorama( "images/SC-2.jpg"  );
    panorama_main_image4 = new PANOLENS.ImagePanorama( "images/SC-3.jpg"  );
    panorama_main_image5 = new PANOLENS.ImagePanorama( "images/SC-4.jpg"  );
      panorama_main_image.addEventListener( 'progress',function(e){
        console.log(e.progress);
      });
      panorama_main_image2.addEventListener( 'progress',function(e){
        console.log(e.progress);
      });
      panorama_main_image3.addEventListener( 'progress',function(e){
        console.log(e.progress);
      });
      panorama_main_image4.addEventListener( 'progress',function(e){
        console.log(e.progress);
      });
      panorama_main_image5.addEventListener( 'progress',function(e){
        console.log(e.progress);
      });
      
      
     
    //   panorama_main_video.link( panorama_main_video2, new THREE.Vector3( -3260.34, -700.96, -3017.16 ) );
    //   panorama_main_video2.link( panorama_main_video, new THREE.Vector3( -2358.58, 1205.94, -3626.21 ) );

    //   panorama_main_video.link( panorama_main_image, new THREE.Vector3( 4464.14, 364.49, 393.76 ) );
    //   panorama_main_image.link( panorama_main_video, new THREE.Vector3( 2630.30, 132.81, 3643.93 ) );
    panorama_main_image.link( panorama_main_image2, new THREE.Vector3( 4894.97, 397.15, 910.76 ) );
    
    
    panorama_main_image2.link( panorama_main_image, new THREE.Vector3( 313.52, 76.89, -4980.55 ) );
    panorama_main_image2.link( panorama_main_image3, new THREE.Vector3( 4753.84, 337.74, 1499.28 ) );
    panorama_main_image2.link( panorama_main_image4, new THREE.Vector3( -2956.01, 234.43, 4019.42 ) );
    panorama_main_image2.link( panorama_main_image5, new THREE.Vector3( 2440.48, -224.16, 4350.58) );
    
    
    panorama_main_image3.link( panorama_main_image4, new THREE.Vector3( -1025.91, 350.38, 4878.98 ) );
    panorama_main_image3.link( panorama_main_image2, new THREE.Vector3( -1600.51, 365.38, -4718.65 ) );
    
       
    panorama_main_image4.link( panorama_main_image5, new THREE.Vector3( -1558.58, 313.53, -4736.93 ) );
    panorama_main_image4.link( panorama_main_image2, new THREE.Vector3( -270.97, -241.40, 4976.31) );
    
    
    panorama_main_image5.link( panorama_main_image2, new THREE.Vector3( -4983.70, 225.33, 142.08 ) );
    panorama_main_image5.link( panorama_main_image3, new THREE.Vector3( -1274.88, -443.79, -4805.45) );
    panorama_main_image5.link( panorama_main_image4, new THREE.Vector3( -719.74, -415.73, 4923.00 ) );
    
   

    //   infospot2 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
    //   infospot2.position.set( -1294.60, 181.52, -4298.10 );
    //   infospot2.addHoverText( 'Hovering Infospot' );
    //   panorama_main_image.add( infospot2 );

      infospot1 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      infospot1.position.set( 4583.83, 1949.75, -359.01 );
      // infospot1.addHoverText( 'Hello SC' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      infospot1.addHoverElement(document.getElementById('desc-container'),200);
      panorama_main_image.add( infospot1 );
      
      infospot2 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      infospot2.position.set( 4318.84, -587.13, 2437.53 );
      // infospot1.addHoverText( 'Hello SC' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      infospot2.addHoverElement(document.getElementById('desc-container2'),200);
      panorama_main_image2.add( infospot2 );

      infospot3 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      infospot3.position.set( 2062.65, 1211.95, 4383.99);
      // infospot1.addHoverText( 'Hello SC' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      infospot3.addHoverElement(document.getElementById('desc-container3'),200);
      panorama_main_image2.add( infospot3 );

      infospot4 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      infospot4.position.set( 503.18, 1924.72, 4585.60);
      // infospot1.addHoverText( 'Hello SC' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      infospot4.addHoverElement(document.getElementById('desc-container4'),200);
      panorama_main_image2.add( infospot4 );
      

      infospot5 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      infospot5.position.set( -1160.22, 1976.07, 4435.06);
      // infospot1.addHoverText( 'Hello SC' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      infospot5.addHoverElement(document.getElementById('desc-container5'),200);
      panorama_main_image2.add( infospot5 );
      
      
    //   viewer_main.add( panorama_main_video, panorama_main_image, panorama_main_video2  );
    // บรรทัดล่างนี้แอดเพิ่มมา
    viewer_main.add(panorama_main_image ,panorama_main_image2,panorama_main_image3,panorama_main_image4,panorama_main_image5);

      // Test repeated scenario
      viewer_main.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
      viewer_main.enableEffect( PANOLENS.MODES.CARDBOARD );
      viewer_main.enableControl( PANOLENS.CONTROLS.ORBIT );
      viewer_main.enableEffect( PANOLENS.MODES.NORMAL );

      // Side panorama
      // viewer_side = new PANOLENS.Viewer({ output: 'overlay', container: document.querySelector( '#panolens-separate-container' ) });

      //panorama_side_image = new PANOLENS.ImagePanorama( 'asset/textures/equirectangular/sunset.jpg' );
    //   panorama_side_image = new PANOLENS.ImageLittlePlanet( 'asset/textures/equirectangular/field.jpg' );
      //panorama_side_image = new PANOLENS.GoogleStreetviewPanorama( 'JmSoPsBPhqWvaBmOqfFzgA' );

      // infospot3 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      // infospot3.position.set(  100.92, -37.84, -1637.81 );
      // infospot3.addHoverText( 'Hovering Infospot', -20 );
      // panorama_side_image.add( infospot3 );

      // viewer_side.add( panorama_side_image );

      // var item = viewer_main.appendControlItem( { 

      //   style : { 

      //     backgroundImage : 'url(asset/textures/equirectangular/sunset.jpg)',
      //     float: 'left'

      //   },

      //   onTap: function(){

      //     viewer_main.setPanorama( panorama_main_image );

      //   },

      //   group: 'video'

      // } );
  }

  //ref for loading progress

  // var panorama, panorama2, panorama3, viewer, progress, progressElement;

  // progressElement = document.getElementById( 'progress' );

  // function onEnter ( event ) {

  //   progressElement.style.width = 0;
  //   progressElement.classList.remove( 'finish' );

  // }

  // function onProgress ( event ) {

  //   progress = event.progress.loaded / event.progress.total * 100;
  //   progressElement.style.width = progress + '%';
  //   if ( progress === 100 ) {
  //     progressElement.classList.add( 'finish' );
  //   }

  // }

  // // First panorama
  // panorama = new PANOLENS.ImagePanorama( 'asset/textures/equirectangular/field.jpg' );
  // panorama.addEventListener( 'progress', onProgress );
  // panorama.addEventListener( 'enter', onEnter );
  
  // // Second panorama
  // panorama2 = new PANOLENS.GoogleStreetviewPanorama( 'JmSoPsBPhqWvaBmOqfFzgA' );
  // panorama2.addEventListener( 'progress', onProgress );
  // panorama2.addEventListener( 'enter', onEnter );

  // // Third panorama
  // var path = 'asset/textures/cube/sand/';
  // var format = '.png';
  // panorama3 = new PANOLENS.CubePanorama( [
  //     path + 'px' + format, path + 'nx' + format,
  //     path + 'py' + format, path + 'ny' + format,
  //     path + 'pz' + format, path + 'nz' + format
  // ] );
  // panorama3.addEventListener( 'progress', onProgress );
  // panorama3.addEventListener( 'enter', onEnter );

  // // Linking panoramas
  // panorama.link( panorama2, new THREE.Vector3( -2302.98, 358.27, -4414.74 ) );
  // panorama2.link( panorama, new THREE.Vector3( 4954.53, 319.21, -556.71 ) );

  // panorama.link( panorama3, new THREE.Vector3( 4954.53, 319.21, -556.71 ) );
  // panorama3.link( panorama, new THREE.Vector3( -3399.16, 1015.42, -5000.00 ) );

  // viewer = new PANOLENS.Viewer();
  // viewer.add( panorama, panorama2, panorama3 );

