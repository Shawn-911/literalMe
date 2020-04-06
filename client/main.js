import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';


Template.booksLib.helpers({
  allBooks() {
    return booksdb.find();
  },

});


Template.myJumbo.events({
	'click .js-addImage'(event, instance){
    console.log("Open modal");
 	 },
  	'click .js-exitAdd'(event, instance){
    console.log("closing modal");
    $("#bName").val("");
    $("bAuth").val("");
    $("#path").val("");
    $("#desc").val("");
    $(".placeHolder").attr("src","imgPlaceHolder.png");
  },

	'click .js-save'(event, instance){
		var booktitle = $('#bName').val();
    var bookAuthor = $('#bAuth').val();
		var imgpath = $ ('#path').val();
		var bdesc = $ ('#desc').val();
    var thebrath = $ ('#brath').val();
		booksdb.insert ({
			"bName" : booktitle,
      "bAuth" : bookAuthor,
			"path" : imgpath,
			"desc" : bdesc,
      "brath" : thebrath

		});

	console.log("saving...");
    $("#addImageModal").modal("hide");
    $("#bName").val("");
    $('#bAuth').val("");
    $("#path").val("");
    $("#desc").val("");
  },
  'input #path'(event, instance){
    $(".placeHolder").attr("src",$("#path").val());
    console.log($('#path').val());
	}
	
});

Template.mainBody.events({

'click .js-view'(event, instance){
  $("#viewBook").modal("show");
  var myID = this._id;
  $('#viewContent').html(booksdb.findOne({_id:myID}).desc);
},

'click .js-delete'(event,instance){
  var myID=this._id;
  $("#"+this._id).fadeOut('slow',function(){
    booksdb.remove({_id:myID});
    console.log(myID);
    
  });
  console.log("deleting...");
    $("#viewBook").modal("hide");
},

  'input #path'(event, instance){
     console.log($('#path').val());
    $(".brath").attr("scr",$("#path").val());
  },


'click. js-edit'(event,instance){
  $("#editModal").modal("show");
  var myId = this._id;
    // console.log("let's edit "+myId);
    var editName = booksdb.findOne({_id: myId}).bName;
    var editAuth = booksdb.findOne({_id: myId}).bAuth
    var editpath = booksdb.findOne({_id: myId}).path;
    var editdesc = booksdb.findOne({_id: myId}).desc;
    $("#editId").val(myId);
    $("#editName").val(editName);
    $("#editAuth").val(editAuth);
    $("#editpath").val(editpath);
    $("#editdesc").val(editdesc);
    $(".editHolder").attr("src", editpath);
},
  'click.js-editsave'(event,instance){
     var editName = $("#editName").val();
     var editAuth = $("#editAuth").val();
    var editpath = $("#editpath").val();
    var editdesc = $("#editdesc").val();
    var updateId = $("#editId").val();
    console.log("updating "+updateId+" Image with title: "+editName+"and its author with "+editAuth+" and its path is "+edithpath+" and its description "+editdesc);
    booksdb.update({_id: updateId},
      {$set:{
        "bName": editName,
        "bAuth": editAuth,
        "path": editpath,
        "desc": editdesc
      }}
    );
  }

  });


/*template.booksLib.events*/