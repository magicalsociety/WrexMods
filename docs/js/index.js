window.onload = function () {
    var jsonString = '{"record":[{"sn":"Demo Sheet 1","vn":"Demo View 11"},{"sn":"Demo Sheet 1","vn":"Demo View 12"},{"sn":"Demo Sheet 2","vn":"Demo View 21"},{"sn":"Demo Sheet 1","vn":"Demo View 13"}],"recordcount":"4"}';
    var jsonObject = JSON.parse(jsonString);
    var newArrays = {};
    var records = jsonObject.record;

    for (var i = 0; i < records.length; i++) {
        if (!newArrays[records[i].sn]) {
            newArrays[records[i].sn] = [];
        }
        newArrays[records[i].sn].push(records[i].vn);
    }

    console.log(newArrays);

    // Grab the container DOM element
    var tree = document.getElementById('treeview');
    
    (function recurse(domElement, treeNode) {
        var ul = document.createElement('ul'),
            li,
            n;
        
        // Make a <ul> to hold the current tree node's children (if any)
        domElement.appendChild(ul)
        
        // Loop over current tree node's children
        for (n in treeNode) {
            // Create an <li> element
            li = document.createElement('li');
            // Add the "key" text (eg. "Demo Sheet 1")
            li.innerText = n;
            // If the current tree node child is an array...
            if (treeNode[n] instanceof Array) {
                // Recursively get this node's children, etc
                recurse(li, treeNode[n]);
            }
            else {
                // Otherwise just print the "value" text (eg. "Demo View 11")
                li.innerHTML = treeNode[n];
            }
            // Remember to add the <li> to the <ul>!
            ul.appendChild(li);
        }
    }(tree, newArrays));
};