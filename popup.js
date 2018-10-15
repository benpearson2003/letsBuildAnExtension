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
    ";
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
