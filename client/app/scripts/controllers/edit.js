'use strict';

clientApp.controller('EditCtrl', function($scope, $routeParams, $location, Huddle, Mongo) {

  console.log("$routeParams.huddleId",$routeParams.huddleId);
  if ( $routeParams.huddleId !== '' ) {
    $scope.huddle = Mongo.getHuddle(
      {
        huddleId: $routeParams.huddleId
      },
      function(){
        console.log("get success", $scope.huddle);
      },
      function(err){
        console.log("get error", err);
      }
    );
  }else{
    $scope.redirectMsg = 'Go back to <a href="/browse">browsing</a>.';
  }

  //TODO: temp data. will come from backend
  $scope.outline = [ 
      {"id":"1", "name":"index"},
      {"id":"2", "name":"agenda"},
      {"id":"3", "name":"create"}
    ];

  // default to editing index file
  $scope.indexFile = _.find($scope.outline, function(file){ return file.name === "index"; });
  $scope.editingFile = $scope.indexFile;

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
        start: function( event, ui ) {
          $(selector).tooltip('hide');
        }
      });
      $(selector).tooltip({title:"This section's order cannot be changed", placement:"right", trigger:"manual"});
      var timeoutID;
      $(selector).mousedown(function(){
        timeoutID = window.setTimeout(function(){
          $(selector).tooltip('show');
        }, 800);
      });
      $(document).mouseup(function(){
        window.clearTimeout(timeoutID);
        $(selector).tooltip('hide');
      });

      // "add" button tool tips
      $("#add-section").tooltip({placement:"right"});

      // "remix" button tool tips
      $("#remix-btn").tooltip({placement:"right"});

    }); //end load()

  }

  $scope.fileClick = function(file) {
    //console.log("fileClick",file);

    //TODO: load in file
    $scope.editingFile = file;
    //$scope.editor.open($scope.editingFile.name);

  }

  $scope.isEditing = function(file) {
    return ($scope.editingFile === file);
  }

  $scope.saveMarkdown = function(){
    // var theContent = $scope.editor.exportFile();
    // saveToServerAjaxCall('/save', {data:theContent}, function () {
    //   console.log('Data was saved to the database.');
    // });
  }

  $scope.add = function(){
    $scope.outline.push({"id":"4", "name":"untitled"}); //TODO
  }

  $scope.preview = function() {
    //console.log("preview");
    $location.path('preview/' + $scope.huddle._id);
  }
  

});
