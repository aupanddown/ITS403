firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        var email_verified = user.emailVerified;
        
        if(email_verified){
          document.getElementById("verify-btn").style.display = "none";
          document.getElementById("photo").style.display = "block";
          document.getElementById("image").style.display = "block";
        } else {
          document.getElementById("verify-btn").style.display = "block";
          document.getElementById("photo").style.display = "none";
          document.getElementById("image").style.display = "none";
        }
        document.getElementById("user_para").innerHTML = "Welcome: " + email_id + "<br/> Verified:" + email_verified;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        title: "Oops!",
        text: errorMessage,
        icon: "error",
      });
      // window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function create_account() {
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    swal({
      title: "User Created!",
      text: "Welcome to 360 Galleries!",
      icon: "success",
    });
  
      // window.alert("User Created!");
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        title: "Oops!",
        text: errorMessage,
        icon: "error",
      });
      let new_window = open(location, '_self'); 
      new_window.close();
      // window.alert("Error : " + errorMessage);
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  
  function send_verification(){
  
    var user = firebase.auth().currentUser;
  
    user.sendEmailVerification().then(function() {
      // Email sent.
      swal({
        title: "Verification Sent!",
        text: "Please check your mailbox!",
        icon: "info",
      });
      // window.alert("Verification Sent")
  
    }).catch(function(error) {
      // An error happened.
      swal({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
      // window.alert("Error: " + error.message)
  });
  }
  
  function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        document.querySelector("#image").src = url;
        var user = firebase.auth().currentUser;
        const FieldValue = firebase.firestore.FieldValue;
        firestore.collection("360imgs").doc("cat1").collection(user.email).add({
          imgname: "Image Name",
          imgdes: "Image Description",
          imgurl: url,
          uploadedby: user.email,
          timestamp: FieldValue.serverTimestamp()
        });
        swal(url)
        // window.alert(url)
      })
      .catch(console.error);
  }
  
  function adddatatofirebase() {
      var user = firebase.auth().currentUser;
      firestore.collection("360users").doc(user.email).set({ 
      firstname: "Tanisorn",
      lastname: "Kag",
      uemail: user.email,
      verifiedstatus: true
    });
    
      swal({
        title: "Data added!",
        text: "Welcome to 360 Galleries!",
        icon: "success",
      });
  }
  
  function adddatatofirebasetwo() {
    var user = firebase.auth().currentUser;
      firestore.collection("store").doc("cat1").collection(user.email).add({
        available: true
      })
  }
  
  function getdatafromfirebase() {
    var user = firebase.auth().currentUser;
    firestore.collection("360imgs").doc("cat1").collection(user.email).where("uploadedby","==",user.email).get().then(function(snapshot){
      snapshot.forEach(function(docs){
          console.log(docs.data());
      })
  });
  }