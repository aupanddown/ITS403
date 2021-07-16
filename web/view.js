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
        document.getElementById("iview").innerHTML = "<iframe width='100%' height='700' src='http://127.0.0.1:8080/web/index3.html?imgurl=" + realrawurl + "' frameborder='0' allowfullscreen></iframe>";
  }