// Things are about to get complicated.
/* Before now, double slashes were used to make single-line comments.
    But /* can create multiline comments. This new syntax can also be used to
    add comments in the middle of lines, which will be useful later.
*/
/* "Extensions" and "mods" are really just a way of hacking existing code, and that
    usually involves injecting code in unorthodox ways. Google saw hackers making browsers
    better, so they formalized the code injection process. What you need to keep in mind
    is that code for a Chrome extension involves "creative" syntax.
*/

/* Functions are a way to make code reusable. Usually functions are called over and over,
    making them worth writing. The funcion "view()" is called once. We only use it this
    way because of the code injection thing I talked about before. Scroll to "document.addEventListener".
*/
function view() {
    /* Because "executeScript" wants a string value, that's what we have to create. Notice the backslash \
        at the end of every line. That's called an escape character, which says the character after it isn't part
        of the string. The character after each backslash is a newline, so the actual string we end up creating
        doesn't have any Enters. You should also notice a backslash before quotes \" \". We have to escape
        quotes to prevent confusion about where the string ends. 
    */
    var script = "function createXHR()\
    {\
        var request = false;\
            try {\
                request = new ActiveXObject('Msxml2.XMLHTTP');\
            }\
            catch (err2) {\
                try {\
                    request = new ActiveXObject('Microsoft.XMLHTTP');\
                }\
                catch (err3) {\
    		try {\
    			request = new XMLHttpRequest();\
    		}\
    		catch (err1)\
    		{\
    			request = false;\
    		}\
                }\
            }\
        return request;\
    }\
    function getBody(content)\
    {\
       test = content.toLowerCase();\
       var x = test.indexOf('<table class=\"table\">');\
       if(x == -1) return \"\";\
\
       x = test.indexOf(\">\", x);\
       if(x == -1) return \"\";\
\
       var y = test.lastIndexOf(\"</table>\");\
       if(y == -1) y = test.lastIndexOf(\"</html>\");\
       if(y == -1) y = content.length;\
\
       return content.slice(x+1, y);\
    }\
    function getHtml(content)\
    {\
       test = content.toLowerCase();\
       var x = test.indexOf('<html lang=\"en\">');\
       if(x == -1) return \"\";\
\
       x = test.indexOf(\">\", x);\
       if(x == -1) return \"\";\
\
       var y = test.lastIndexOf(\"</html>\");\
       if(y == -1) y = content.length;\
\
       return content.slice(x+1, y);\
    }\
    function loadHTML(url, fun, storage, param)\
    {\
    	var xhr = createXHR();\
    	xhr.onreadystatechange=function()\
    	{\
    		if(xhr.readyState == 4)\
    		{\
    			{\
    				storage.innerHTML = \"<table class='table col-sm-1'>\" + getBody(xhr.responseText) + \"</table>\";\
    				fun(storage, param);\
    			}\
    		}\
    	};\
\
    	xhr.open(\"GET\", url , false);\
    	xhr.send(null);\
\
    }\
	function processHTML(temp, target)\
	{\
		target.innerHTML = temp.innerHTML;\
	}\
\
	function loadWholePage(url,appendix)\
	{\
		var y = document.getElementById(\"storage\"+appendix);\
		var x = document.getElementById(\"displayed\"+appendix);\
		loadHTML(url, processHTML, x, y);\
	}\
	function processByDOM(responseHTML, target)\
	{\
		target.innerHTML = \"Extracted by id:<br />\";\
		var message = responseHTML.getElementsByTagName(\"div\").item(1).innerHTML;\
\
		target.innerHTML += message;\
\
		target.innerHTML += \"<br />Extracted by name:<br />\";\
\
		message = responseHTML.getElementsByTagName(\"form\").item(0);\
		target.innerHTML += message.dyn.value;\
	}\
\
	function accessByDOM(url)\
	{\
		var responseHTML = document.getElementsById(\"storage\");\
		var y = document.getElementById(\"displayed\");\
		loadHTML(url, processByDOM, responseHTML, y);\
	}\
    var columns = document.getElementsByTagName(\"td\");\
    for(var i = 0;i<columns.length;i++){\
    	columns[i].className = \"column\";\
    }\
    function insertAfter(referenceNode, newNode) {\
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);\
    }\
    for(var i = 0;i < columns.length;i++){\
    	var links = columns[i].getElementsByTagName(\"a\");\
    	for(var j = 0;j < links.length;j++){\
            var storage = document.createElement(\"div\");\
    		var displayed = document.createElement(\"div\");\
    		var appendix = i+\"_\"+j;\
            storage.id = \"storage\"+appendix;\
    		storage.style.display = \"none\";\
    		displayed.id = \"displayed\"+appendix;\
            var a = links[j];\
            insertAfter(a, storage);\
    		insertAfter(a, displayed);\
    		loadWholePage('https://local.arkansas.gov/local.php?agency='+a.textContent,appendix);\
        }\
    }\
    document.getElementById('intro').remove();\
    document.getElementsByClassName('col-md-6')[0].remove();\
    document.getElementsByClassName('col-md-6')[0].className='col-md-12';\
    var remaining = true;\
    while(remaining){\
    remaining = false;\
    var columns = document.getElementsByClassName(\"column\");\
        for(var i = 0;i < columns.length;i++){\
            var links = columns[i].getElementsByTagName(\"div\");\
            for(var j = 0;j < links.length;j++){\
                var rows = links[j].getElementsByTagName(\"tr\");\
                for(var k=0;k<rows.length;k++){\
                    if(!rows[k].textContent.includes(\"(Vacant)\")){\
                        rows[k].remove();\
    					remaining = true;\
                    }\
                }\
            }\
        }\
    }";
    /* It's common for programmers to use libraries of code other people wrote.
        We're using the "chrome" library, which includes other libraries such as "tabs".
        "tabs" has a function inside called "executeScript", which we're using
        to pass a string value "script" to the activeTab. Scroll up to "var script".
    */
    chrome.tabs.executeScript({
        code: script
    });
}

/* An "Event Listener" is a way for the browser to detect events. There are many types of events,
    but we're going to listen for all the content loading.
*/
document.addEventListener('DOMContentLoaded', () => {
    /* "onclick" can be added to any document element. An onclick property has been added to an element with the ID "vacancies".
        This onclick will call the function "view()". Scroll up to "chrome.tabs.executeScript".
    */
    document.getElementById('vacancies').onclick = function() {
        view();
    };
});
