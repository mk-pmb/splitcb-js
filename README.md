
<!--#echo json="package.json" key="name" underline="=" -->
splitcb
=======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
(err, results…) -&gt; (err ? onError(err, results…) : onSuccess(results…))
<!--/#echo -->

That's the basic idea. Details below.


API
---

### splitCb(onSuccess, onError)

Each argument should be either a handler function or a false-y value.
This implies they're both optional, as missing arguments default to
`undefined` which is false-y.

Returns a nodeback function that calls the appropriate handler if one is set.
If an error is received and you didn't provide `onError`, the error is thrown.

The API doesn't guarantee any details about the return value of the nodeback
function, so avoid any assumptions about it.



Usage
-----

<!--
from [test/usage.js](test/usage.js):
-->

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="17" -->
```javascript
var splitCb = require('splitcb'), nodeback;

nodeback = splitCb();
readLatestPost(nodeback); // ignore result if success, throw error otherwise

function displayPost(topic, text) { console.log(topic, ':', text); }
nodeback = splitCb(displayPost);
readLatestPost(nodeback); // displayPost or throw error

function reportFailure(err) { console.log('Error:', err); }
nodeback = splitCb(displayPost, reportFailure);
readLatestPost(nodeback); // displayPost or reportFailure

nodeback = splitCb(null, reportFailure);
readLatestPost(nodeback); // reportFailure but ignore success result
```
<!--/include-->




<!--#toc stop="scan" -->


&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
