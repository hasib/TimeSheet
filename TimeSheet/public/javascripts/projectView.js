// projectView.js
(function (angular) {
    
    var theModule = angular.module("projectView", ['ngRoute',
     'ui.bootstrap', 'ngSanitize', 'kendo.directives']);
    
    theModule.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
          // ----------------------------   person -----------------------------
        //  when('/project', {
        //    templateUrl: 'Person',
        //    controller: 'PersonCtrl'
        //}).
        
        //   when('/project', {
        //    templateUrl: 'Project' 
             
        //}).
           when('/create', {
            templateUrl: 'Project/create',
            controller: 'ProjectCreateCtrl'
        }).
          when('/project/edit/:projectId', {
            templateUrl: 'Project/edit',
            controller: 'ProjectEditCtrl'
        }).
        otherwise({
         //templateUrl: 'Project' 
            redirectTo: '/'
        }
);
    }]);
    
    theModule.controller("ProjectCreateCtrl",
    ["$scope", "$window", "$http",
      function ($scope, $window, $http) {
        $scope.hasib = "This is hasib";
    }
    ]);
    
    theModule.controller("projectViewController",
    ["$scope", "$window", "$http",
      function ($scope, $window, $http) {
        $scope.projects = [];
        $scope.mainProjects = [];
        $scope.hasib = "This is hasib";
        $scope.updateMode = false;
        $scope.newProject = createBlankModel();
        
        // Get the category name
        var urlParts = $window.location.pathname.split("/");
        var categoryName = urlParts[urlParts.length - 1];
        //alert(categoryName);
        //var notesUrl = "/api/projects/" + categoryName;
        var notesUrl = "/api/projects/";
        getData();
        //$http.get(notesUrl)
        //  .then(function (result) {
        //    // success
            
        //    $scope.mainProjects = result.data;
        //    $scope.totalItems = result.data.length;
        //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
        //    $scope.maxSize = Math.ceil($scope.totalItems / $scope.itemsPerPage);
        //    $scope.projects = $scope.mainProjects.slice(begin, end);
            
        //}, function (err) {
        //    // Error
        //    alert(err);
        //});
            function getData() {
            $http.get(notesUrl)
          .then(function (result) {
                // success
                
                $scope.mainProjects = result.data;
                $scope.totalItems = result.data.length;
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
                $scope.maxSize = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                $scope.projects = $scope.mainProjects.slice(begin, end);
            
            }, function (err) {
                // Error
                alert(err);
            });
        }
        $scope.save = function () {
            $scope.updateMode = false;
            $http.post(notesUrl, $scope.newProject)
            .then(function (result) {
                // success
                $scope.projects.push(result.data);
                $scope.newProject = createBlankModel();
                getData();
                $scope.showGrid = true;
            }, function (err) {
              // failure
              // TODO
            });

        };
        
        //----------------------edit -----------------
        $scope.Edit = function (projectId) {
            $scope.updateMode = true;
            $http.get(notesUrl + projectId)
            .then(function (result) {
                // success
                //$scope.projects.push(result.data);
                //console.log(result, result.data);
                $scope.newProject = result.data[0];// createBlankModel();

                $scope.showGrid = false;

            }, function (err) {
              // failure
              // TODO
            });

        };
        
        //----------------------update -----------------
        $scope.Update = function () {
            
            $http.post(notesUrl + $scope.newProject.Id, $scope.newProject)
            .then(function (result) {
                // success
                //$scope.projects.push(result.data);
                //console.log(result, result.data);
                var index = $scope.projects.indexOf($scope.newProject);
                //$scope.projects.splice(index, 1);
                //var updatedProject = $scope.projects[index];
                console.log(index, $scope.projects[index]);
                $scope.projects[index] = $scope.newProject;
                getData();
                $scope.newProject = createBlankModel();
                $scope.updateMode = false;
                $scope.showGrid = true;
            }, function (err) {
              // failure
              // TODO
            });

        };
        
        $scope.Delete = function (project) {
            //$scope.updateMode = false;
            if (confirm('Are you sure you want to delete '+project.Name+' from database?')) {
                $http.delete(notesUrl + project.Id, project)
            .then(function (result) {
                    // success
                   // $scope.projects.push(result.data);
                    //$scope.newProject = createBlankModel();
                    //$scope.showGrid = true;
                    //var index = $scope.projects.indexOf(project);
                   // console.log(index, $scope.projects[index]);
                    //$scope.projects.splice(index, 1);
                    //var updatedProject = $scope.projects[index];
                    getData();
                }, function (err) {
              // failure
              // TODO
                });
            } else {
    
            }

            

        };

        //--------------
        //-----  paging 
        $scope.totalItems = $scope.projects.length;
        $scope.currentPage = 1;
        // $scope.numPerPage = 2;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 4;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        
        $scope.pageChanged = function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
            console.log(begin + '' + end);
            $scope.projects = $scope.mainProjects.slice(begin, end);
        //$scope.temp = $scope.movies.slice(begin, end);


        };
        //-------------------------------
        $scope.showGrid = true;
        
        
    }
    ]);
    
    function createBlankModel() {
        return {
            Id: 0,
            Name: "",
            StartDate: "",
            EndDate: "",
            Note: "",
            ReportingFreqId: 1
        };
    }

})(window.angular);