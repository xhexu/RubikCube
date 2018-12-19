angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.backgroundColorByHexString("#91BAFC");
        StatusBar.show();
        // StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

    //统一指定 tab 的样式
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $ionicConfigProvider.platform.android.tabs.style("standard");
    $ionicConfigProvider.platform.android.navBar.alignTitle("center");

    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");

    $ionicConfigProvider.templates.maxPrefetch(10);

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      .state('tab.init', {
        url: '/init',
        abstract: true,
        templateUrl: 'views/launch.html'
      })
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'views/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'views/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        },
        cache: false
      })
      .state('tab.chat-detail', {
        url: '/chats-detail',
        params: {
          data: null
        },
        views: {
          'tab-chats': {
            templateUrl: 'views/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'views/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/tab/dash');
  });

// angular.element(document).ready(function(){
//   console.log(11111111111111111111111111);
// })