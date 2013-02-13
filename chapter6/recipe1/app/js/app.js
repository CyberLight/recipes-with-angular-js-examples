var app = angular.module("MyApp", []).
  config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when("/persons", { templateUrl: "partials/index.html" }).
      when("/persons/:id", { templateUrl: "partials/show.html", controller: "ShowCtrl" }).
      otherwise( { redirectTo: "/persons" });
});


app.factory("Person", function() {

  var persons = [
    { name: "Peter", age: 25, id: 1 },
    { name: "Stefan", age: 35, id: 2 },
    { name: "Agnes", age: 22, id: 3 }
  ];

  return {
    all: function() {
      return persons;
    },
    get: function(id) {
      var result = null;
      angular.forEach(persons, function(p) {
        if (p.id == id) result = p;
      });
      return result;
    }
  };
});

app.controller("IndexCtrl", function($scope, Person) {
  $scope.persons = Person.all();
});

app.controller("ShowCtrl", function($scope, $routeParams, $location, Person) {
  $scope.person = Person.get($routeParams.id);
  $scope.back = function() {
    $location.url("/persons");
  };
});