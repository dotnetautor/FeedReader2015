angular.module('ionicApp', ['ionic', 'ngResource'])
   .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
 
  .controller('FeedCtrl', ['$scope', 'FeedLoader', function($scope, FeedLoader) {
    $scope.feed = {} ;
  
    
    $scope.doRefresh = function() {
    
     FeedLoader.updateFeed({q: 'http://dotnetautor.de/GetRssFeed', num: 10}).then(function (data) {
        $scope.feed = data;
        console.log( $scope.feed);
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
     });
    };
  
    $scope.doRefresh();
  
  }])

  .controller('EntryCtrl', ['$scope', '$stateParams', 'FeedLoader', function($scope,  $stateParams, FeedLoader) { 
    	
	$scope.index = $stateParams.index;
	$scope.entry = FeedLoader.getFeed().entries[$scope.index];
		
	$scope.readEntry = function(e) {
		window.open(e.link, "_blank");
	};
		
  }])
 
  .factory('FeedLoader', ['$resource' ,'$q' , function ($resource, $q) {
    
    var feed = {}; 
    
    var updateFeed = function (options) {
      var res = $q.defer();
      $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
	     fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
	  }).fetch( options, {}, function(data){
         feed = data.responseData.feed;
         res.resolve(feed);
      });
      return res.promise;
    }
    
    var getFeed = function(){
      return feed;
    }
               
    return {
       getFeed : getFeed,
       updateFeed : updateFeed
    }
  }]);