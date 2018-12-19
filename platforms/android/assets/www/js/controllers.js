angular.module('starter.controllers', [])
  .controller('DashCtrl', function($scope) {

    $scope.clickSpan = function(){
      alert(123)
    }
    
  })
  .controller('ChatDetailCtrl', function($scope) {

    
  })
  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('ChatsCtrl', function($scope, $state) {
    
  })