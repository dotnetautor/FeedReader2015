angular.module('ionicApp', ['ionic', 'ngResource'])
   .config(['$compileProvider', '$stateProvider', '$urlRouterProvider', function ($compileProvider, $stateProvider, $urlRouterProvider) {

     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
     // // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2 
     $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);


     $stateProvider
       .state('Feed', {
         url: '/',
         controller: 'FeedCtrl',
         templateUrl: 'partials/feed.html',
       })
       .state('Entry', {
         url: '/entry/:index',
         controller: 'EntryCtrl',
         templateUrl: 'partials/entry.html',
       })

     $urlRouterProvider.otherwise("/");

   }])

  .controller('FeedCtrl', ['$scope', 'FeedLoader', function ($scope, FeedLoader) {
    $scope.feed = {};


    $scope.doRefresh = function () {

      FeedLoader.updateFeed({ q: 'http://dotnetautor.de/GetRssFeed', num: 10 }).then(function (data) {
        $scope.feed = data;
        console.log($scope.feed);
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.doRefresh();

  }])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard 
      // for form inputs) 
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required 
        StatusBar.styleDefault();
      }
    });
  })


  .controller('EntryCtrl', ['$scope', '$stateParams', 'FeedLoader', function ($scope, $stateParams, FeedLoader) {

    $scope.index = $stateParams.index;
    $scope.entry = FeedLoader.getFeed().entries[$scope.index];

    $scope.readEntry = function (e) {
      window.open(e.link, "_blank");
    };

  }])

  .factory('FeedLoader', ['$resource', '$q', function ($resource, $q) {

    var feed = {};

    var updateFeed = function (options) {
      var res = $q.defer();
      $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: { method: 'GET', params: { v: '1.0' } }
      }).fetch(options, {}, function (data) {
        feed = data.responseData.feed;
        res.resolve(feed);
      });
      return res.promise;
    }

    var getFeed = function () {
      return feed;
    }

    return {
      getFeed: getFeed,
      updateFeed: updateFeed
    }
  }]);