//---------------------------------------------------------------------
// WrexMODS - for Discord Bot Maker
// Contains functions for actions using WrexMODS
//---------------------------------------------------------------------
const WrexMODS= {};

WrexMODS.API = {};

WrexMODS.DBM = null;
WrexMODS.Version = "1.0.0";

// Add Extra Variables Here
//---------------------------------------------------------------------


//---------------------------------------------------------------------

WrexMODS.CheckAndInstallNodeModule = function(moduleName){

	try {
		require.resolve(moduleName)
	} catch(e) {

		try {
			console.log("Installing Node Module: " + moduleName);	
			var child = require('child_process');
			var cliCommand = 'npm install ' + moduleName + " --loglevel=error";
			var result = child.execSync(cliCommand,{stdio:[0,1,2]});
			
		} catch (error) {
			console.error("Could not automatically install " + moduleName + " Please install it manually 'npm install " + moduleName + "' before continuing.");c
		}
	}	  	
}

WrexMODS.Initialize = function(){

	this.CheckAndInstallNodeModule("request");
	this.CheckAndInstallNodeModule("extend");
    this.CheckAndInstallNodeModule("valid-url");
   
};

// run the initialize
WrexMODS.Initialize();

// Add Functions Below Here
//---------------------------------------------------------------------

WrexMODS.setDBM = function(dbm){
	/// <summary>Set's DBM so WrexMODS can have access to Discord Bot Makers Existing Actions</summary>  
    /// <param name="dbm" type="String">The URL to check.</param>  
	if(dbm){
		this.DBM = dbm;
	}
};

WrexMODS.checkURL = function (url){
    /// <summary>Checks if the provided URL is valid.</summary>  
    /// <param name="url" type="String">The URL to check.</param>  
	/// <returns type="Boolean">True if valid.</returns>  
  
	if(!url){
		return false;
	}

    var validUrl = require('valid-url');
    
    if (validUrl.isUri(url)){
        return true;
    } 
    else {
        return false;
    }
};

WrexMODS.runPublicRequest = function (url, returnJson = false, callback){
    /// <summary>Runs a Request to return JSON Data</summary>  
	/// <param name="url" type="String">The URL to get JSON from.</param>  
	/// <param name="returnJson" type="String">True if the response should be in JSON format. False if not</param>  
    /// <param name="callback" type="Function">The callback function, args: error, statusCode, data</param>  
    var request = require("request");
           
	request.get({
		url: url,
		json: returnJson,
		headers: {'User-Agent': 'request'}
	  }, (err, res, data) => {    

        var statusCode = res.statusCode;
   
        if(callback && typeof callback == "function"){
            callback(err, statusCode, data);
        }
    });	

   
};

WrexMODS.runBearerTokenRequest = function (url, returnJson = false, bearerToken, callback){
	/// <summary>Runs a Request to return HTML Data using a bearer Token.</summary>  
	/// <param name="url" type="String">The URL to get JSON from.</param>  
	/// <param name="returnJson" type="String">True if the response should be in JSON format. False if not</param>  
	/// <param name="bearerToken" type="String">The token to run the request with.</param>  
	/// <param name="callback" type="Function">The callback function, args: error, statusCode, data</param>  
    var request = require("request");
	
	request.get({
		url: url,
		json: returnJson,
		auth: {
			bearer: bearerToken
		  },
		headers: {'User-Agent': 'request'}
		}, (err, res, data) => {    

		var statusCode = res.statusCode;

		if(callback && typeof callback == "function"){
			callback(err, statusCode, data);
		}
	});	
};

WrexMODS.runBasicAuthRequest = function (url, returnJson = false, username, password, callback){
	/// <summary>Runs a Request to return HTML Data</summary>  
	/// <param name="url" type="String">The URL to get JSON from.</param>  
	/// <param name="returnJson" type="String">True if the response should be in JSON format. False if not</param>  
	/// <param name="username" type="String">The username for the request</param>  
	/// <param name="password" type="String">The password for the request</param>  
	/// <param name="callback" type="Function">The callback function, args: error, statusCode, data</param>  
    var request = require("request");
	
	request.get({
		url: url,
		json: returnJson,
		auth: {
			user: user,
			pass: password,
			sendImmediately: false
		  },
		headers: {'User-Agent': 'request'}
		}, (err, res, data) => {    

		var statusCode = res.statusCode;

		if(callback && typeof callback == "function"){
			callback(err, statusCode, data);
		}
	});	
};

module.exports = WrexMODS;