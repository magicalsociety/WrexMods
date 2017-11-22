# WrexMODS - Mods for Discord Bot Maker
----

----
# WrexMODS - A Module for DBM containing custom Functions
Usable in DBM Actions and the Run Script Action by requiring '../js/WrexMODS.js'

```javascript
    var WrexMODS = require("../js/WrexMods.js")
```

 ## Functions
 
 
 ### CheckAndInstallNodeModule
 
**Description:** 
Installs a Node Module locally to the DBM/Bot 'node_modules' folder.

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
Runs a Request to return HTML Data using a bearer Token.
 
**Args:**
```url (String)``` - The URL to Check
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

# WrexMODS - JSON WebAPI Parsing Section

# Forum topic and example
https://dbotmaker.io/forums/threads/create-variable-from-json-webapi.85/

 # Changes
     * Can now use variables in the URL and Path textboxes.
     * added console logging to print what's going on in your bots console.


 # Installation: 

Choose the one you need from Release

Extract the folder in Discord Bot Makers base directory
 ex. "steamapps\common\Discord Bot Maker <-"

Restart Discord Bot Maker

Remember to extract it in your projects directory as well if you want it in your bot!


 # Contributing

**Thanks to Tresmos for the help with testing!**

If you want to help, just fork it out, make your changes and do a pull request!

Here is a link to the github pages that contains the current menu for this action
https://generalwrex.github.io/DBM-webapi-parsing

 # Path Finder 
  **A Helper program to get the JSON Path for this mod**
    You can find it here!
    https://github.com/generalwrex/DBM-WebAPI-Parser-PathFinder

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
 
 
