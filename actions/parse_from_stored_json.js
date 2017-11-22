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
	
	name: "Parse From Stored Json",
	
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
        
        if(varType == typeof(object))
        return ([data.varName, 'JSON Object']);
        else{
            return ([data.varName, 'JSON ' + varType + ' Value']);
        }         
	},
	
	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------
	
	fields: ["behavior", "jsonObjectVarName", "path", "storage", "varName"],
	
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
		Stored JSON Variable Name: <br>
		<input id="jsonObjectVarName" class="round"  style="width: 90%; type="text";><br>  
	</div>
	</div><br>
		JSON Path: <br>
		<input id="path" class="round"; style="width: 75%; type="text";><br>  
	<div><br><br> 
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
			${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: ; float: right; width: 60%;">
		Variable Name:<br>
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

		const data = cache.actions[cache.index];
		let result;
		const varName = this.evalMessage(data.varName, cache);
		const storage = parseInt(data.storage);
		const jsonObjectVarName = this.evalMessage(data.jsonObjectVarName, cache);
        const path = this.evalMessage(data.path, cache);
        
        const jsonData = this.getVariable(storage, jsonObjectVarName, cache);
        
        if(path && jsonData){           
            result = eval("jsonData." + path, cache);	

            console.log("JSON Data starting from ["+ path +"] stored to: ["+ varName+"]");
            		            
        }
        else{
            console.log("JSON WebAPI Parsing: JSON Data does not exist in ["+ jsonObjectVarName +"]");
        }

        this.storeValue(result, storage, varName, cache);	

        if(data.behavior === "0") {
            this.callNextAction(cache);
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
	}
	
	}; // End of module