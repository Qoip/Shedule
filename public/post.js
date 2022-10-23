document.getElementById("subm").addEventListener("click", function (e) {
   login(e);
});

async function login(e) {
   f1(); f2(); f3(); f4();
   var week = packW();

   var r1 = document.getElementById('result1').value;
   var r2 = document.getElementById('result2').value;
   var r3 = document.getElementById('result3').value;
   var r4 = document.getElementById('result4').value;
   var pass = document.getElementById('pass').value;
   
   var params = new URLSearchParams(); 
   params.set('r1', r1);
   params.set('r2', r2);
   params.set('r3', r3);
   params.set('r4', r4);
   params.set('pass', pass);
   params.set('week', week);

   e.preventDefault();
   await fetch(`/`, {
     method: "POST",
     body: params,
   }).then(
      response => {
         return response.text();
      }
   ).then(
      text => {
         document.getElementById('errs').innerHTML = text;
         document.getElementById('errs').style.display = 'block'
      }
   );
}

