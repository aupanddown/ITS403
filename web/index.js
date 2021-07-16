firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("mustlogin1").innerHTML = "Upload";
    document.getElementById("mustlogin1").style.display = "block";
    document.getElementById("mustlogin2").innerHTML = "|";
    document.getElementById("mustlogin2").style.display = "block";
    

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_verified = user.emailVerified;
      
      if(email_verified){
        document.getElementById("verify-btn").style.display = "none";
        document.getElementById("photo").style.display = "block";
        document.getElementById("imgnamedata").style.display = "block";
        document.getElementById("imgdesdata").style.display = "block";
        document.getElementById("image").style.display = "block";
      } else {
        document.getElementById("verify-btn").style.display = "block";
        document.getElementById("photo").style.display = "none";
        document.getElementById("imgnamedata").style.display = "none";
        document.getElementById("imgdesdata").style.display = "none";
        document.getElementById("image").style.display = "none";
      }
      document.getElementById("user_para").innerHTML = "Welcome: " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("mustlogin1").style.display = "none";
    document.getElementById("mustlogin2").style.display = "none";

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
  setTimeout('welcome.close()',1000)

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
  var imgcatdata = document.getElementById("imgcatdata").value;
  var imgnamedata = document.getElementById("imgnamedata").value;
  var imgdesdata = document.getElementById("imgdesdata").value;
  const ref = firebase.storage().ref().child("360imgs");
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
      firestore.collection("360imgs").doc(imgcatdata).collection(user.email).add({
        imgname: imgnamedata,
        imgdes: imgdesdata,
        imgurl: url,
        imgcat: imgcatdata,
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

function getdataPuey() {
  var user = firebase.auth().currentUser;
  console.log("User: "+ user.email)
  firestore.collection("360imgs").doc("Puey Library").collection(user.email).where("uploadedby","==",user.email).get().then(function(snapshot){
    snapshot.forEach(function(docs){
        console.log(docs.data());
        kag = "<center>" + docs.data().imgcat + "<br><a>Image name: </a>" + docs.data().imgname + "<br><a>Description: </a>"+ docs.data().imgdes + "<br><a href='/web/view.html?imgurl=" + docs.data().imgurl + "' target='_blank'><img src='"+ docs.data().imgurl+"' width='80%' object-fit='cover'></a></center>";
        var h = document.getElementById("imglist");
        document.getElementById("imglist").innerHTML = "<center><h5>Your 360 Images List 🚀</h5></center><hr>";
        h.insertAdjacentHTML("afterend", kag);
        console.log("Replaced");
    })
});
}

function GalleryPuey() {
  var user = firebase.auth().currentUser;
  console.log("User: "+ user.email)
  firestore.collection("360imgs").doc("Puey Library").collection(user.email).where("uploadedby","==",user.email).get().then(function(snapshot){
    snapshot.forEach(function(docs){
        console.log(docs.data());
        kag = "<div class='col'><a href='/web/view.html?imgurl=" + docs.data().imgurl + "' target='_blank'><img src='" + docs.data().imgurl + "' width='100%' object-fit='cover'></a><center><a style='font-size: large ;'>" + docs.data().imgname + "<br/><a style='font-size: small;'>" + docs.data().imgdes + "</a></center></div>";
        var h = document.getElementById("imglist");
        h.insertAdjacentHTML("afterend", kag);
        console.log("Replaced");
    })
});
}

// Test data
var myArray = [
  {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
  {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
  {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
  {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
  {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
  {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
]

function buildTable(data){
  var table = document.getElementById('myTable')
  for (var i = 0; i < data.length; i++){
    var row = `<tr>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].birthdate}</td>
          </tr>`
    table.innerHTML += row
    console.log("Finished");
  }
}
// End test data