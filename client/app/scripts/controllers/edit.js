'use strict';

clientApp.controller('EditCtrl', function($scope, $routeParams, $location, Huddle, Mongo, OutlineManager, FileManager) {

  //console.log("$routeParams.huddleId",$routeParams.huddleId);

  $scope.outline = {};
  //TODO: temp data. will come from backend
  // $scope.outline = [ 
  //     {"filename":"welcome"},
  //     {"filename":"agenda"},
  //     {"filename":"create"}
  //   ];
  $scope.huddleFiles = {};
  $scope.untitledCounter = 0;
  $scope.fileContents = '';
  $scope.editor;

  if ( $routeParams.huddleId !== '' ) {
    $scope.localHuddle = Mongo.getHuddle(
      {
        huddleId: $routeParams.huddleId
      },
      function(){
        console.log("get success", $scope.localHuddle);
        // Huddle.update($scope.huddleServer);
        // copyHuddleSettings($scope.huddleServer, $scope.huddleSettings);
        
        // get file outline
        $scope.huddleFiles = OutlineManager.listFilesForHuddle({
          huddleId: $scope.localHuddle._id
        }, function() {
          console.log('get success', $scope.huddleFiles);

          $scope.outline = $scope.huddleFiles.outline;
          console.log( $scope.outline );

          // default to editing index file
          $scope.indexFile = _.find($scope.outline, function(file){ return file.filename === "welcome"; });
          //$scope.editingFile = $scope.indexFile;
          $scope.updateFileList();
          $scope.init();

        }, function(err) {
          console.log('get error', err);
        });

      },
      function(err){
        console.log("get error", err);
      }
    );
  }else{
    $scope.showRedirectMsg = true;
  }


  $scope.init = function(){

    /* IMPORTANT NOTE: must wait for window to be fully loaded
       before initializing editor, otherwise something is blocked
       and Angular throws an RangeError exception */
    // $(window).load(function() {

      var opts = {
        container: 'epiceditor',
        basePath: '/components/epiceditor',
        clientSideStorage: true,
        localStorageName: 'epiceditor',
        parser: marked,
        file: {
          //name: 'http://localhost:8000/api/viewFile/' + filename + '/' + $scope.localHuddle._id,
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

      // initialize Markdown editor
      $scope.editor = new EpicEditor(opts);
      $scope.editor.load(function(){
        console.log("editor loaded");
      });
      
      //$scope.editor.open( 'http://localhost:8000/api/viewFile/' + filename + '/' + $scope.localHuddle._id );
      $scope.fileClick($scope.indexFile);

    // }); //end load()

  }

  $scope.updateFileList = function() {
    // make all files re-sortable except the index file (which is always fixed)
    var selector = '#file-'+$scope.indexFile.filename;
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
  }

  $scope.fileClick = function(file) {
    console.log("fileClick",file);

    $scope.editingFile = file;

    // Load in index file (Note: didn't work)
    // var viewFilePath = 'http://localhost:8000/api/viewFile/' + file.filename + '.md/' + $scope.localHuddle._id;
    // console.log( viewFilePath );
    // $scope.editor.importFile( viewFilePath, "#doesn't work" );
    
    // Load in index file
    $scope.fileContents = FileManager.viewFile({
      filename: file.filename + '.md',
      huddleId: $scope.localHuddle._id
    }, function() {
      //console.log( $scope.fileContents );

      // NOTE: don't know why it comes back like an Array-like object
      // but need to convert using makeArray....
      // which is the same as Array.prototype.slice.call($scope.fileContents);
      $scope.fileContents.length = _.size($scope.fileContents); // need length for makeArray to work
      var contents = $.makeArray($scope.fileContents).join(''); 
      $scope.editor.importFile( '', contents );

    }, function(err) {
      console.log('get error', err);
    });

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
    $scope.untitledCounter += 1;
    var filename = "untitled"+$scope.untitledCounter;
    $scope.outline.push({"filename":filename}); //TODO
    $scope.updateFile( filename );
  }

  $scope.updateFile = function(filename) {
    // if (typeof(content) === "undefined") {
    //     content = null; 
    // }
    //data = "filename=" + filename + "&data=" + btoa(content) + "&huddle=" + huddleId;
    console.log("updateFile", filename);
    console.log("exportFile", $scope.editor.exportFile());

    $scope.updateFileStatus = FileManager.updateFile(
      {
        filename: filename,
        huddleId: $scope.localHuddle._id
      },
      {
        data: btoa($scope.editor.exportFile())
      },
      function(){
        console.log("updateFile: ", $scope.updateFileStatus);
      },
      function(err){
        console.log("updateFile err: ", err);
      });
  }

  $scope.preview = function() {
    //console.log("preview");
    $location.path('preview/' + $scope.localHuddle._id);
  }

});
