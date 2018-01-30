<template>
  <nav class='navbar-default navbar-static-side' role='navigation'>
    <div class='sidebar-collapse'>
      <ul class='nav' id='side-menu'>
        <li class='nav-header'>
          <div class='dropdown profile-element'> <span>
                                <img alt='image' class='img-circle' src='@/assets/img/profile_small.jpg'/>
                                 </span>
            <a data-toggle='dropdown' class='dropdown-toggle' href='#'>
                                <span class='clear'> <span class='block m-t-xs'> <strong
                                  class='font-bold'>{{userInfo.Name}}</strong>
                                 </span> <span class='text-muted text-xs block'>个人中心<b
                                  class='caret'></b></span> </span> </a>
            <ul class='dropdown-menu animated fadeInRight m-t-xs'>
              <li><a href='profile.html'>我的主页</a></li>
              <li><a href='contacts.html'>联系我们</a></li>
              <li><a href='mailbox.html'>消息中心</a></li>
              <li class='divider'></li>
              <li><a @click.prevent.stop="loginOut">退出</a></li>
            </ul>
          </div>
          <div class='logo-element'>
            IN+
          </div>
        </li>
        <li v-for='first in userModule' :key='first.Id' :class="{active: isActive(first)}">
          <a @click="goTo(first.Link)"><i :class='first.Icon'></i> <span
            class='nav-label'>{{first.Name}}</span>
            <span v-if='first.Node_List.length > 0' class='fa arrow'></span></a>
          <ul class='nav nav-second-level collapse' v-if='first.Node_List.length > 0' :class="{in: isActive(first)}">
            <li v-for='second in first.Node_List' :key='second.Id' :class="{active: isActive(second)}">
              <a @click="goTo(second.Link)">{{second.Name}}
                <span v-if='second.Node_List.length > 0' class='fa arrow'></span>
              </a>
              <ul class='nav nav-third-level collapse' v-if='second.Node_List.length > 0' :class="{in: isActive(second)}">
                <li v-for='third in second.Node_List' :key='third.Id' :class="{active: isActive(third)}">
                  <a @click="goTo(third.Link)">{{third.Name}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script type='text/ecmascript-6'>
  import {mapState} from 'vuex';
  import $ from 'jquery';
  import '../../assets/js/plugins/metisMenu/jquery.metisMenu';
  import '../../assets/js/plugins/pace/pace.min';
  // import '../../assets/js/app/inspinia';
  export default {
    computed: mapState([
      'userModule',
      'currentPageName',
      'userInfo'
    ]),
    methods: {
      goTo (url) {
        console.log(url);
        let path = url && url.indexOf('UserCenter') > -1 ? '/system/role-manage' : url;
        this.$router.push({path: path});
        // this.$router.push({path: url, query: { userId: 123 }});
      },
      isActive (page) {
          if (!page) {
              return false;
          }
          if (page.Link === this.currentPageName) {
              return true;
          } else {
              return this.havePage(page.Node_List) && this.havePage(page.Node_List).length > 0;
          }
      },
      havePage (nodeList) {
        if (Object.prototype.toString.apply(nodeList) === '[object Array]' && nodeList.length > 0) {
          return nodeList.filter((e) => {
            return e.Link === this.currentPageName || this.havePage(e.Node_List);
          });
        }
      },
      loginOut () {
        this.$store.dispatch('loginOut').then(() => {
          window.location.reload();
        });
      }
    },
    beforeRouterEnter (to, from, next) {
      next(vm => {
      });
    },
    mounted () {
      /* eslint-disable */
      let vm = this;
      init();
    }
  };

  function init() {
    $(document).ready(function () {
      // Add body-small class if window less than 768px
      if ($(this).width() < 769) {
        $('body').addClass('body-small')
      } else {
        $('body').removeClass('body-small')
      }

      // MetsiMenu
      $('#side-menu').metisMenu();
      console.log('1', $('#side-menu').length);
      // Collapse ibox function
      $('.collapse-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      });

      // Close ibox function
      $('.close-link').on('click', function () {
        var content = $(this).closest('div.ibox');
        content.remove();
      });

      // Fullscreen ibox function
      $('.fullscreen-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
          $(window).trigger('resize');
        }, 100);
      });

      // Close menu in canvas mode
      $('.close-canvas-menu').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
      });

      // Run menu of canvas
      $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });

      // Open close right sidebar
      $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
      });

      // Initialize slimscroll for right sidebar
      $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
      });

      // Open close small chat
      $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
      });

      // Initialize slimscroll for small chat
      $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
      });

      // Small todo handler
      $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
      });

      // Minimalize menu
      $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
      });

      // Tooltips demo
      $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
      });

      // Full height of sidebar
      function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeight = $('nav.navbar-default').height();
        var wrapperHeight = $('#page-wrapper').height();

        //if (navbarHeight > wrapperHeight) {
        //    $('#page-wrapper').css("min-height", navbarHeight + "px");
        //}

        //if (navbarHeight < wrapperHeight) {
        //    $('#page-wrapper').css("min-height", $(window).height() + "px");
        //}

        //if ($('body').hasClass('fixed-nav')) {
        //    if (navbarHeight > wrapperHeight) {
        //        $('#page-wrapper').css("min-height", navbarHeight + "px");
        //    } else {
        //        $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        //    }
        //}
        if ($('body').hasClass('fixed-nav')) {
          $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
      }

      fix_height();

      // Fixed Sidebar
      $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
          $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
          });
        }
      });

      // Move right sidebar top after scroll
      $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
          $('#right-sidebar').addClass('sidebar-top');
        } else {
          $('#right-sidebar').removeClass('sidebar-top');
        }
      });

      $(window).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
          fix_height();
        }
      });

      $("[data-toggle=popover]")
        .popover();

      // Add slimscroll to element
      $('.full-height-scroll').slimscroll({
        height: '100%'
      })
    });

//$(window).bind("load resize scroll", function () {
//    console.log(123);
//    if (!$("body").hasClass('body-small')) {
//        fix_height();
//    }
//});

// Minimalize menu when screen is less than 768px
    $(window).bind("resize", function () {
      if ($(this).width() < 769) {
        $('body').addClass('body-small')
      } else {
        $('body').removeClass('body-small')
      }
    });

// Local Storage functions
// Set proper body class and plugins based on user configuration
    $(document).ready(function () {
      if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
          body.addClass('fixed-sidebar');
          $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
          });
        }

        if (collapse == 'on') {
          if (body.hasClass('fixed-sidebar')) {
            if (!body.hasClass('body-small')) {
              body.addClass('mini-navbar');
            }
          } else {
            if (!body.hasClass('body-small')) {
              body.addClass('mini-navbar');
            }

          }
        }

        if (fixednavbar == 'on') {
          $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
          body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
          body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
          $(".footer").addClass('fixed');
        }
      }
    });

// check if browser support HTML5 local storage
    function localStorageSupport() {
      return (('localStorage' in window) && window['localStorage'] !== null)
    }

// For demo purpose - animation css script
    function animationHover(element, animation) {
      element = $(element);
      element.hover(
        function () {
          element.addClass('animated ' + animation);
        },
        function () {
          //wait for animation to finish before removing classes
          window.setTimeout(function () {
            element.removeClass('animated ' + animation);
          }, 2000);
        });
    }

    function SmoothlyMenu() {
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function () {
            $('#side-menu').fadeIn(400);
          }, 200);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
          function () {
            $('#side-menu').fadeIn(400);
          }, 100);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }

// Dragable panels
    function WinMove() {
      var element = "[class*=col]";
      var handle = ".ibox-title";
      var connect = "[class*=col]";
      $(element).sortable(
        {
          handle: handle,
          connectWith: connect,
          tolerance: 'pointer',
          forcePlaceholderSize: true,
          opacity: 0.8
        })
        .disableSelection();
    }

    $(function () {
      $('body').addClass('fixed-sidebar');
      let slim = $('.sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });
      console.log('slim', slim);
      /***********************************************/
      $('.navbar-static-top').removeClass('navbar-static-top').addClass('navbar-fixed-top');
      $('body').addClass('fixed-nav').addClass('fixed-nav-basic');
      /***********************************************/
      // $('.footer').addClass('fixed');
    });
  }

</script>

<style>

</style>
