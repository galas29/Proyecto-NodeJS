$("#login-btn").click(function(){
    $(this).addClass("btn-shadow");
  })
  $("#login-btn").mouseout(function(){
    $(this).removeClass("btn-shadow");
  })
  function myfunction(isinya){
    if(isinya == "register"){
      $("#loginbtn").removeClass("active"); $("#registerbtn").addClass("active");
      $("#login").css({"display":"none"}); $("#register").css({"display":"block"});
    }else {
      $("#registerbtn").removeClass("active"); $("#loginbtn").addClass("active");
      $("#register").css({"display":"none"}); $("#login").css({"display":"block"});
    }
  }