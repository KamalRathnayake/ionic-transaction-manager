angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, transactionRepository) {
  $scope.transaction={type:"hello", amount:0, currentState:"Save your transaction"};
  $scope.addTransaction=function(){
    $scope.transaction.currentState="Saving...";
    console.log($scope.transaction);
    transactionRepository.post($scope.transaction, function(){
      $scope.transaction.currentState="Done!";
      $scope.$apply();
    });
  };
  
})

.controller('ChatsCtrl', function($scope, Chats, transactionRepository) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  //   listen for the $ionicView.enter event:
  $scope.transactions=[];
  $scope.$on('$ionicView.enter', function(e) {
    transactionRepository.get(function(data){
      console.log(data);
      $scope.transactions=data;
    });
  });


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
