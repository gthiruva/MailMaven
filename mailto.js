// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Common utils for extensions for Google Apps

var toField = "&to=";
var cachedGmailUrl = "";

function addRel(element){
  element.attr('rel', 'mies1');
  return element;
}

function displaymessage(inStr)
{
  alert(inStr);
}

function rewriteMailtoToGMailUrl(inUrl) {
  var retUrl = inUrl;
  retUrl = retUrl.replace("?", "&");
  retUrl = retUrl.replace(/subject=/i, "su=");
  retUrl = retUrl.replace(/CC=/i, "cc=");
  retUrl = retUrl.replace(/BCC=/i, "bcc=");
  retUrl = retUrl.replace(/Body=/i, "body=");
  var gmailUrl = cachedGmailUrl + toField;
  retUrl = retUrl.replace("mailto:", gmailUrl);
  return retUrl;
}

// Content Scripts
function rewriteMailtosOnPage() {
  // Find all the mailto links.
  console.log("Starting to rewrite mailtos");
  var result = document.evaluate(
      '//a[contains(@href, "mailto:")]',
      document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

  var item;
  var nodes = [];
  // cannot change the NODE_ITERATOR nodes' attributes in this loop itself
  // since iterateNext will invalidate the state; Need to store temporarily.
  while (item = result.iterateNext()) {
    nodes.push(item);
  }
  
  for (var i = 0; i < nodes.length; i++) {
    var mailtoStr = nodes[i].getAttribute('href');
    // displaymessage(mailtoStr);
    mailtoStr = rewriteMailtoToGMailUrl(mailtoStr);
    nodes[i].setAttribute('id', "click2mail");
//    nodes[i].setAttribute('href', mailtoStr);
    nodes[i].setAttribute('href', "javascript:void(0)");
//    nodes[i].setAttribute('target', "_blank");
    nodes[i].setAttribute('rel', 'noreferrer');
    // nodes[i].setAttribute('onclick',"displaymessage()");
  }
}

/*
if (window == top) {
  if (cachedGmailUrl != "") {
    rewriteMailtosOnPage();
    window.addEventListener("focus", rewriteMailtosOnPage);
  }
  
  var bgPort = chrome.extension.connect({name: "GmailUrlConn"});
  bgPort.postMessage({req: "GmailUrlPlease"});
  bgPort.onMessage.addListener(
  function(msg) {
    console.log("Got message from bg page - " + msg.gmailDomainUrl);
    cachedGmailUrl = msg.gmailDomainUrl;
    rewriteMailtosOnPage();
    // Not sending any response to ack.
  });
}
*/

var overlayDiv = '\
<!-- overlays --> \
<div class="MailPopOverlay" id="MailPop" style="background-image:url(http://static.flowplayer.org/img/overlay/flowplayer.png)"> \
	<h2 style="margin:0px">Here is my overlay</h2> \
	<img src="http://static.flowplayer.org/img/title/eye192.png" style="float: left; margin:0px 20px 0 0;" /> \
	<p> \
		<strong>Sit amet felis non sem eleifend rhoncus. Mauris imperdiet consequat neque, ac molestie eros venenatis pharetra. \
    In et leo nulla. Vivamus feugiat consequat augue nec vulputate. Vestibulum a ipsum et turpis viverra accumsan.</strong> \
	</p> \
	<p> \
		Cras sit amet est purus, a consectetur augue. Ut scelerisque consequat dictum. Donec in nulla risus. Nulla metus elit, \
    tempus vel fermentum sed, dictum eu justo. Etiam et nulla ligula. Integer in tincidunt tellus. Cras cursus, lectus id \
    tincidunt tincidunt, eros arcu cursus velit, a euismod justo lectus non quam. Ut euismod erat eu elit hendrerit. \
	</p> \
	<p> \
		Nulla vitae tellus justo. Donec condimentum lorem ac enim blandit id lobortis felis pellentesque. Mauris nulla velit, \
    ultrices vel tempor vitae, sollicitudin vitae ligula. Vestibulum nec ullamcorper turpis. Aliquam aliquam aliquam pharetra. \
	</p> \
	<p style="color:#666"> \
		Cras sit amet est purus, a consectetur augue. Ut scelerisque consequat dictum. Donec in nulla risus. Nulla metus elit, \
    tempus vel fermentum sed, dictum eu justo. Etiam et nulla ligula. Integer in tincidunt tellus. Cras cursus, lectus id \
    tincidunt tincidunt, eros arcu cursus velit, a euismod justo lectus non quam. Ut euismod erat eu elit hendrerit a aliquet odio consequat. \
	</p> \
</div> \
';

$('body').prepend(overlayDiv);

$('a[href^=mailto:]').live('click', function(clickEvent){clickEvent.preventDefault();});
$('a[href^=mailto:]').overlay({target:'#MailPop', speed:'fast', expose:'#000', effect:'apple'}).
$(function()
{
  console.log("I'm in an anonymous function\n");
});