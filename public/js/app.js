let login=document.getElementById("loginbtn");

login.addEventListener("click",()=>{
    var xhr=new XMLHttpRequest();
    console.log(1)
    xhr.open('post','/users/login');
    xhr.send()

})