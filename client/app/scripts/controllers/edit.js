'use strict';

clientApp.controller('EditCtrl', function($scope, $routeParams, $location, Huddle) {

  // if ( typeof $routeParams.huddleId !== "undefined" ) {
  //   console.log($routeParams.huddleId);
  //   $scope.huddleId = $routeParams.huddleId;
  //   $scope.huddle = Huddle; //TODO: query db for this id
  // }else{
    $scope.huddle = Huddle.getDummyData();
  // }

  // $scope.indexFile = {"id":"1", "name":"index"};
  $scope.outline = [ 
      {"id":"1", "name":"index"},
      {"id":"2", "name":"agenda"},
      {"id":"3", "name":"create"}
    ];

  // default to editing index file
  // $scope.editingFile = $scope.indexFile; 
  $scope.indexFile = _.find($scope.outline, function(file){ return file.name === "index"; });
  $scope.editingFile = $scope.indexFile;
  $scope.editingFile.editStatus = "editing";

  $scope.editor;
  var opts = {
    container: 'epiceditor',
    basePath: '/components/epiceditor',
    clientSideStorage: true,
    localStorageName: 'epiceditor',
    parser: marked,
    file: {
      name: 'epiceditor',
      defaultContent: '',
      autoSave: 100
    },
    theme: {
      base:'/themes/base/epiceditor.css',
      preview:'/themes/preview/github.css',
      editor:'/themes/editor/epic-dark.css'
    },
    focusOnLoad: false,
    shortcut: {
      modifier: 18,
      fullscreen: 70,
      preview: 80,
      edit: 79
    }
  }

  $scope.init = function(){

    /* IMPORTANT NOTE: must wait for window to be fully loaded
       before initializing editor, otherwise something is blocked
       and Angular throws an RangeError exception */
    $(window).load(function() {

      // initialize Markdown editor
      $scope.editor = new EpicEditor(opts);
      $scope.editor.load();

      // make all files re-sortable except the index file (which is always fixed)
      var selector = '#file-'+$scope.indexFile.id;
      $("#sortable-files").fixedsortable({
        fixed: selector,
        // start: function( event, ui ) {
        //   $(selector).tooltip('show');
        // }
      });
      $(selector).tooltip({title:"This file's order cannot be changed", placement:"left", trigger:"manual"}); //change to manual focus
      var timeoutID;
      $(selector).mousedown(function(){
        timeoutID = window.setTimeout(function(){
          $(selector).tooltip('show');
        }, 500);
      });
      $(window).mouseup(function(){
        window.clearTimeout(timeoutID)
        $(selector).tooltip('hide');
      });
    });

  }

  $scope.fileClick = function(file) {
    console.log("fileClick",file);

    $scope.editingFile.editStatus = ""; //clear the old editing one

    //TODO: load in file
    $scope.editingFile = file;
    //$scope.editor.open($scope.editingFile.name);

    // Update editing icon status
    $scope.editingFile.editStatus = "editing";
  }

  $scope.saveMarkdown = function(){
    // var theContent = $scope.editor.exportFile();
    // saveToServerAjaxCall('/save', {data:theContent}, function () {
    //   console.log('Data was saved to the database.');
    // });
  }

  $scope.preview = function() {
    console.log("preview");
    $location.path('preview/' + $scope.huddle.huddleId);
  }

  

});
