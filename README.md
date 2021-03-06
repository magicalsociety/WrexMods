# WrexMODS - Mods for Discord Bot Maker

# These mods are now part of DBM Mods, you can find them here https://github.com/Discord-Bot-Maker-Mods/DBM-Mods

**Find them there!**

# Installation: 

Choose the one you need from Release or download the entire zip here, just remember to copy actions, js, and node_modules to both your bot project folder and DBM's main folder.

Extract the folder in Discord Bot Makers base directory
 ex. "steamapps\common\Discord Bot Maker <-"

Restart Discord Bot Maker

Remember to extract it in your projects directory as well if you want it in your bot!

----

# WrexMODS - Store Regex Matched Variable
https://github.com/generalwrex/WrexMods/blob/master/actions/store_regex_matched_variable.js

 Use regex match ( or regex replace ) on an existing variable to store a new variable, watch the bot console for if the regex is valid, and for the results of the matches
 
![actionss](https://i.gyazo.com/4a44b760af0a5dfb89206f1f3ca5955e.png)

![ui](https://i.gyazo.com/ba9d5ddf4787b5d115b235dd50ad28a7.png)
 
----

# WrexMODS - JSON WebAPI Parsing Section

# Forum topic and example
https://dbotmaker.io/forums/threads/create-variable-from-json-webapi.85/

 # Changes
     * Now supports the use of JsonPATH in both Store and Parse 
     * Can now use variables in the URL and Path textboxes.
     * added console logging to print what's going on in your bots console.


**WEBAPI  - Using API Keys in google's json webapi is appending** ```?key=[keygoeshere]``` ** to the end of your Google API url, google how to create a API key in googles developer console for how to create a key**


Here is a link to the github pages that contains the current menu for this action
https://generalwrex.github.io/DBM-webapi-parsing

 # Path Finder 
  **A Helper program to get the JSON Path for this mod**
    You can find it here!
    https://github.com/generalwrex/DBM-WebAPI-Parser-PathFinder


 # JSON Path
 
 Find out more information about JSON Path here - http://goessner.net/articles/JsonPath/index.html#e2
 Test it out here! http://jsonPath.com
 
 ![jsonpathfirst](https://i.gyazo.com/f073451e1ad976860a097422c90ea754.png)
 
 ![jsonpathsecond](https://i.gyazo.com/e0e07b4fa87ebe31c3b16bfbf7679697.png)
 # How to get the path
 
 Here is our example
 
![jsonimage](https://i.gyazo.com/349715d816924fd40c7d521f5d45f798.png)


![jsontree](https://i.gyazo.com/7e1529df4b2894f9875ead96b56c01d8.png)

Interact with it here! https://jsonblob.com/

Lets say we wanted to get the **"b"** object from that ( the highlighted one )

the path to the **"b"** object would be  **"object.object.a"**

the path to the **"Hello World"** string would be **"object.string"**

the path to the **"123"** would be **"object.number"**

To pull an object from the array, it would be **object.array[0]** for 1, **array[1]** for 2, and **array[2]** for 3"
Instead of **array.0** its **array[0]**.

**When typing these into the path, always ignore the root variable as thats already there.**

so if you wanted the path to output **"Hello World"**, you would type  **string**  into the path textbox. (removing **object.** from it)

Have fun!
 
 
 
 
 ----
# WrexMODS - A Module for DBM containing custom Functions
Usable in DBM Actions and the Run Script Action by requiring '../js/WrexMODS.js'

```javascript
    var WrexMODS = require("../js/WrexMods.js")
    
    // Set DBM to WrexMods.DBM ( I'll change it to a better way when I figure it out! )
    if(!WrexMODS.DBM) {
       WrexMODS.DBM = this.getDBM();
    }
     
```

 ## Functions
 
 
 ### CheckAndInstallNodeModule
 
**Description:** 
Installs a Node Module locally to the DBM/Bot 'node_modules' folder. Note: Sometimes it doesn't work right in Run Script, the command might need to be ran twice, the first one to install, then it should work from then on.

**Args:** 
```modulename``` - The name of the module.

**Returns** 
```void```

```javascript
    WrexMODS.CheckAndInstallNodeModule(modulename);    
```

 ### checkURL
 
**Description:** 
Checks if the provided URL is valid.
 
**Args:** 
```url``` - The URL to Check;

**Returns:** 
```(Boolean)``` ```true``` if the url is valid.

```javascript
    WrexMODS.checkURL(url)   
```

 ### runPublicRequest
 
**Description:** 
Runs a Request to return JSON data of the provided URL
 
**Args:**
```url (String)``` - The URL to get the data from

```returnJson (Boolean)``` (Default: false) - if the data arg in the callback should be requested as JSON;

```callback (Function)``` - The URL to Check (err, statusCode, data)

**Returns:** 
```(Void)```

```javascript
    WrexMODS.runPublicRequest(url, returnJson, callback) 
```

 ### runBearerTokenRequest
 
**Args:** 
```url (String)``` - The URL

```returnJson (Boolean)``` (Default: false) - if the data arg in the callback should be requested as JSON;

```bearerToken (String)``` - The token to send with the request.

```callback (Function)``` - the callback function (err, statusCode, data)


**Returns:** 
```(Void)```

**Description:** Checks if the provided URL is valid.

```javascript
    WrexMODS.runBearerTokenRequest(url, returnJson, bearerToken, callback)
```

 ### runBasicAuthRequest
 
**Args:** 
```url (String)``` - The URL

```returnJson (Boolean)``` (Default: false) - if the data arg in the callback should be requested as JSON;

```username (String)``` - The username to send with the request.

```password (String)``` - The password to send with the request.

```callback (Function)``` - the callback function (err, statusCode, data)

**Returns:** 
```(Void)```

**Description:** Checks if the provided URL is valid.

```javascript
    WrexMODS.runBasicAuthRequest(url, returnJson = false, username, password, callback)
```


----

 # Contributing

**Thanks to Tresmos for the help with testing!**

If you want to help, just fork it out, make your changes and do a pull request!
