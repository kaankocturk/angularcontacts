'use strict';

var app = angular.module('myapp', ['ngStorage']);

app.controller('tablectrl', function($scope,$localStorage, $filter){
  $scope.contacts = [];
  $scope.oldcontact;
  $scope.$storage = $localStorage;
  var orderBy = $filter('orderBy');

  $scope.order = function(predicate) { //documentation is nice.
  $scope.predicate = predicate;
  $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
  $scope.contacts = orderBy($scope.contacts, predicate, $scope.reverse);
};

  $scope.add = function(){
    $scope.contacts.push({name: $scope.name, number: $scope.number, email: $scope.email});
    $scope.$storage.contacts = $scope.contacts;
  }

  $scope.delete = function(contact){
    $scope.contacts.splice($scope.contacts.indexOf(contact),1);
    $scope.$storage.contacts = $scope.contacts;
  }

  $scope.modal =function(contact){
    $scope.oldcontact = contact;
    $('#myModal').modal();
  }

  $scope.update = function(newcontact){
    $scope.contacts[$scope.contacts.indexOf($scope.oldcontact)]=newcontact;
    $('#myModal').modal('toggle');
    $scope.$storage.contacts = $scope.contacts;
  }
});
