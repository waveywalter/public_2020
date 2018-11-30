<template>
    <nav class="navbar navbar-default navbar-static-top m-b-0">
    <div class="navbar-header">
      <a class="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse">
          <i class="ti-menu"></i>
      </a>
<!--This is left top logo -->
      <div class="top-left-part">
          <a class="logo" href="index.html"><b>
              <!--This is dark logo icon-->
              <img src="/public/assets/plugins/images/2020iLogoSmall.png" alt="home" class="dark-logo" />
              <!--This is light logo icon-->
              <img src="/public/assets/plugins/images/2020iLogoText.png" alt="home" class="light-logo" /></b>
              <span class="hidden-xs"><!--This is dark logo text-->
                  <img src="/public/assets/plugins/images/2020iLogoTextSmall.png" alt="home" class="dark-logo" />
              </span>
          </a>
      </div>
      <ul class="nav navbar-top-links navbar-left hidden-xs">
          <li>
            <a href="javascript:void(0)" class="open-close hidden-xs waves-effect waves-light">
              <i class="icon-arrow-left-circle ti-menu"></i>
            </a>
          </li>
      </ul>

<!--END This is left top logo -->
<ul class="nav navbar-top-links navbar-right pull-right">
  <li class="dropdown">
    <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="https://2020i.site"> <i class=" icon-logout"></i>
    <router-link to='/login'>Logout</router-link>
    </a>
  </li>
  <li class="dropdown">
    <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#"><i class="icon-user-following"></i>
      <span>ACCOUNT</span>
      <div class="notify"><span class="heartbit"></span><span class="point"></span></div>
    </a>
    <ul class="dropdown-menu mailbox animated bounceInDown">
        <li>
          <div class="drop-title">You have 4 new messages</div>
        </li>
        <li>
          <div class="message-center">
            <a href="#">
                
              <div class="user-img"> <img src="/public/assets/plugins/images/users/pawandeep.jpg" alt="user" class="img-circle"> <span class="profile-status online pull-right"></span> </div>
              <div class="mail-contnet">
                  plugins/images/users/pawandeep.jpg
                  <h5>Pavan kumar</h5> <span class="mail-desc">Just see the my admin!</span> <span class="time">9:30 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/sonu.jpg" alt="user" class="img-circle"> <span class="profile-status busy pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Sonu Nigam</h5> <span class="mail-desc">I've sung a song! See you at</span> <span class="time">9:10 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/arijit.jpg" alt="user" class="img-circle"> <span class="profile-status away pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Arijit Sinh</h5> <span class="mail-desc">I am a singer!</span> <span class="time">9:08 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/pawandeep.jpg" alt="user" class="img-circle"> <span class="profile-status offline pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Pavan kumar</h5> <span class="mail-desc">Just see the my admin!</span> <span class="time">9:02 AM</span> </div>
            </a>
          </div>
        </li>
        </ul>
        <li>
            <a class="text-center" href="https://thewaveint.com"> <strong>See all notifications</strong> <i class="fa fa-angle-right"></i> </a>
        </li>
    </ul>
</div>
</nav>
</template>

<script>
    export default {
        name: "adminTopHeader"
    }
</script>

<style scoped>

</style>