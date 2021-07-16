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
      var infospot1, infospot2, infospot3;

      // Main panorama
      viewer_main = new PANOLENS.Viewer({ enableReticle: false, output: 'console', viewIndicator: true, autoRotate: false, autoRotateSpeed: 2, autoRotateActivationDuration: 5000, dwellTime: 1000 });

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

    panorama_main_image = new PANOLENS.ImagePanorama(realrawurl);
    panorama_main_image2 = new PANOLENS.ImagePanorama(realrawurl);
    panorama_main_image3 = new PANOLENS.ImagePanorama(realrawurl);
    panorama_main_image4 = new PANOLENS.ImagePanorama(realrawurl);
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
      
      
     
    //   panorama_main_video.link( panorama_main_video2, new THREE.Vector3( -3260.34, -700.96, -3017.16 ) );
    //   panorama_main_video2.link( panorama_main_video, new THREE.Vector3( -2358.58, 1205.94, -3626.21 ) );

    //   panorama_main_video.link( panorama_main_image, new THREE.Vector3( 4464.14, 364.49, 393.76 ) );
    //   panorama_main_image.link( panorama_main_video, new THREE.Vector3( 2630.30, 132.81, 3643.93 ) );
    //  panorama_main_image.link( panorama_main_image2, new THREE.Vector3( 900, 100.81, -2996.43 ) );
    //  panorama_main_image.link( panorama_main_image3, new THREE.Vector3( -3000, 100.81, -2996.43) );
    //  panorama_main_image.link( panorama_main_image4, new THREE.Vector3( -15000, 100.81, 5000 ) );
     

    //   infospot2 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
    //   infospot2.position.set( -1294.60, 181.52, -4298.10 );
    //   infospot2.addHoverText( 'Hovering Infospot' );
    //   panorama_main_image.add( infospot2 );

      // infospot1 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
      // infospot1.position.set( 3187.12, 1036.61, -2996.43 );
      // infospot1.addHoverText( 'Hello KAG' );
      // infospot1.addEventListener( 'click', function(){
      //   viewer_main.tweenControlCenterByObject( cube );
      // } );
      panorama_main_image.add( infospot1 );
      
      
    //   viewer_main.add( panorama_main_video, panorama_main_image, panorama_main_video2  );
    // บรรทัดล่างนี้แอดเพิ่มมา
    viewer_main.add(panorama_main_image ,panorama_main_image2,panorama_main_image3,panorama_main_image4);

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