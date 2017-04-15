var app = angular.module('app', ['ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning']);

app.controller('MainCtrl',  ['$scope', '$http', '$timeout', '$interval', function ($scope, $http, $timeout, $interval) {

  $scope.tabs = {selectedTab:-1};
  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  

  $scope.gridOptions.columnDefs = [
    
    { name:'first_name', width:100 },
    { name:'last_name', width:100 },
    { name:'company_name', width:100 },
    { name:'address', width:100 },
    { name:'city', width:100 },
    { name:'county', width:100 },  
    { name:'state', width:100 },
    { name:'zip', width:100 },
    { name:'phone1', width:100 },
    { name:'phone2', width:100 },
    { name:'email', width:100 },
    { name:'web', width:100 },
    { name:'age', width:100},
    { name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
      cellFilter: "griddropdown:this", editDropdownIdLabel:'id',
      editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
      { id: 1, gender: 'male' },
      { id: 2, gender: 'female' }
    ] }
    
  ];

  $scope.gridOptions.enableCellEditOnFocus = true;
  $scope.myData = [{name: "Abcd", age: 50, gender:2},
                   {name: "Tom", age: 43, gender:1},
                  ];

  $scope.tabChanged = function(tabIndex){
     $scope.tabs.selectedTab = tabIndex;
  };
  
}])
.filter('griddropdown', function() {
        return function (input, context) {
            
            var map = context.col.colDef.editDropdownOptionsArray;
            var idField = context.col.colDef.editDropdownIdLabel;
            var valueField = context.col.colDef.editDropdownValueLabel;
            var initial = context.row.entity[context.col.field];
            if (typeof map !== "undefined") {
                for (var i = 0; i < map.length; i++) {
                    if (map[i][idField] == input) {
                        return map[i][valueField];
                    }
                }
            } else if (initial) {
                return initial;
            }
            return input;
        };
    });
