
fetch(`/all`)
  .then((response) => response.json())
  .then((data) => {

    wk = document.querySelectorAll('.weekSch');
    for(let i = 0; i < wk.length; i++){
        if(data.week[i] != '0')
            wk[i].value = data.week[i];
        else wk[i].value = "";
    }

    t1 = document.getElementById("s1").querySelectorAll('.time');
    for(let i = 0; i < t1.length; i++){
        if(data.r1[i*4] != '9')
            t1[i].value = data.r1[i*4] + data.r1[i*4+1] + ":" + data.r1[i*4+2] + data.r1[i*4+3];
        else t1[i].value = "";
    }

    t2 = document.getElementById("s2").querySelectorAll('.time');
    for(let i = 0; i < t2.length; i++){
        if(data.r2[i*4] != '9')
            t2[i].value = data.r2[i*4] + data.r2[i*4+1] + ":" + data.r2[i*4+2] + data.r2[i*4+3];
        else t2[i].value = "";
    }

    t3 = document.getElementById("s3").querySelectorAll('.time');
    for(let i = 0; i < t3.length; i++){
        if(data.r3[i*4] != '9')
            t3[i].value = data.r3[i*4] + data.r3[i*4+1] + ":" + data.r3[i*4+2] + data.r3[i*4+3];
        else t3[i].value = "";
    }

    t4 = document.getElementById("s4").querySelectorAll('.time');
    for(let i = 0; i < t4.length; i++){
        if(data.r4[i*4] != '9')
            t4[i].value = data.r4[i*4] + data.r4[i*4+1] + ":" + data.r4[i*4+2] + data.r4[i*4+3];
        else t4[i].value = "";
    }

    s = "";
    for(let i = data.list.length-1; i >= 0; i--){
        s += data.list[i] + "<br>";
    }
    document.getElementById("log").innerHTML = s;
  })
  .catch(console.error);
