module.exports = {
	//---------------------------------------------------------------------
	// Created by General Wrex
	// Add URL to json object,
	// add path to the object you want from the json
	// set your variable type and name
	// example URL: https://api.github.com/repos/HellionCommunity/HellionExtendedServer/releases/latest
	// example Path: name
	// will return object.name
	// in this example the variable would contain "[DEV] Version 1.2.2.3"
	//---------------------------------------------------------------------
		
		
		
	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------
	
	name: "Store Json From WebAPI",
	
	//---------------------------------------------------------------------
	// Action Section
	//
	// This is the section the action will fall into.
	//---------------------------------------------------------------------
	
	section: "JSON WebAPI Parsing",
	
	//---------------------------------------------------------------------
	// Action Subtitle
	//
	// This function generates the subtitle displayed next to the name.
	//---------------------------------------------------------------------
	
	subtitle: function(data) {
		return `${data.varName}`;
	},
	
	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------
	
	variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		return ([data.varName, 'JSON Object']);
	},
	
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
	
	fields: ["behavior", "url", "path", "storage", "varName"],
	
	//---------------------------------------------------------------------
	// Command HTML
	//
	// This function returns a string containing the HTML used for
	// editing actions. 
	//
	// The "isEvent" parameter will be true if this action is being used
	// for an event. Due to their nature, events lack certain information, 
	// so edit the HTML to reflect this.
	//
	// The "data" parameter stores constants for select elements to use. 
	// Each is an array: index 0 for commands, index 1 for events.
	// The names are: sendTargets, members, roles, channels, 
	//                messages, servers, variables
	//---------------------------------------------------------------------
	
	html: function(isEvent, data) {
		return `
	<div>
	<div style="float: left; width: 75%;">
	<div>
		End Behavior:<br>
		<select id="behavior" class="round">
			<option value="0" selected>Call Next Action Automatically</option>
			<option value="1">Do Not Call Next Action</option>
		</select>
	<div><br><br><br>
		WebAPI URL: <br>
		<input id="url" class="round"  style="width: 90%; type="text";><br>  
	</div>
	</div><br>
		Initial JSON Path: (Leave blank to store everything)<br>
		<input id="path" class="round"; style="width: 75%; type="text";><br>  
	<div><br><br> 
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
			${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: ; float: right; width: 60%;">
		JSON Storage Variable Name:<br>
		<input id="varName" class="round" type="text">
	</div>
	</div>`
	},
	
	//---------------------------------------------------------------------
	// Action Editor Init Code
	//
	// When the HTML is first applied to the action editor, this code
	// is also run. This helps add modifications or setup reactionary
	// functions for the DOM elements.
	//---------------------------------------------------------------------
	
	init: function() {
		const {glob, document} = this;
		glob.variableChange(document.getElementById('storage'), 'varNameContainer');
	},
	
	//---------------------------------------------------------------------
	// Action Bot Function
	//
	// This is the function for the action within the Bot's Action class.
	// Keep in mind event calls won't have access to the "msg" parameter, 
	// so be sure to provide checks for variable existance.
	//---------------------------------------------------------------------
	
	action: function(cache) {

		var _this = this;

		var WrexMODS = require("../js/WrexMods.js");

		WrexMODS.DBM = this.getDBM();

		const data = cache.actions[cache.index];
		
		const varName = this.evalMessage(data.varName, cache);
		const storage = parseInt(data.storage);
		const url = this.evalMessage(data.url, cache);
		const path = this.evalMessage(data.path, cache);
						
		var errorFound = false;

		if(WrexMODS.checkURL(url)){

			WrexMODS.runPublicRequest(url, true,function(error, statusCode, jsonData){

				let result;

				if(error){
					errorFound = true;
					DisplayError("WebAPI: HTTP Error: " + err);
				}
	
				if(statusCode !== 200){
					errorFound = true;
					DisplayError("WebAPI: HTTP Status Code: " + statusCode);
				}
				
				if(path){
					_this.storeValue(eval("jsonData." + path, cache), storage, varName, cache);
					console.log("JSON Data Object starting from ["+ path +"] stored to: ["+ varName+"]");
				}else{
					_this.storeValue(jsonData, storage, varName, cache);	
					console.log("JSON Data Object stored to: ["+ varName+"]");
				}
				
				

				if(!errorFound && data.behavior === "0") {
					_this.callNextAction(cache);
				}

			});		
		}
		else{
			DisplayError('URL ['+url+'] Is Not Valid');
		}

		function DisplayError(err){
			
			console.log(err);
			_this.displayError(data, cache, err);
		}
	},
	
	//---------------------------------------------------------------------
	// Action Bot Mod
	//
	// Upon initialization of the bot, this code is run. Using the bot's
	// DBM namespace, one can add/modify existing functions if necessary.
	// In order to reduce conflictions between mods, be sure to alias
	// functions you wish to overwrite.
	//---------------------------------------------------------------------
	
	mod: function(DBM) {
		var WrexMODS = require("../js/WrexMods.js");
	}

	}; // End of module