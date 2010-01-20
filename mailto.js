// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Common utils for extensions for Google Apps

/*
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

$(function() {
var bgImgURL       = chrome.extension.getURL('images/overlay/white.png');
var trashCanURL    = chrome.extension.getURL('images/general/delete.png');
var closeButtonURL = chrome.extension.getURL('images/overlay/close.png');
var specBulletURL  = chrome.extension.getURL('images/general/bullet1.gif');

var overlayDiv = '\
<!-- overlays --> \
<div class="MailPopOverlay" id="MailPop" style="background-image:url('+bgImgURL+');display:none;"> \
  <div class="close" style="background:url('+closeButtonURL+')"></div> \
	<h2 style="margin:0px">Please choose a mail source to send from ...</h2> \
\
<table class="MailDests" id="MailPopTable" cellspacing="0" \
	summary="Historic information about Olympic medalists that competed in the 20 Km Walk since 1956"> \
	<caption>Olympic Medalists: 20 Km Walk</caption> \
\
	<tr> \
		<th class="nobg">Games</th> \
		<th>Gold</th> \
		<th>Silver</th> \
		<th>Bronze</th> \
		<th>&nbsp;</th> \
	</tr> \
	<tr> \
		<th class="spec" style="background:url('+specBulletURL+') no-repeat">1956 Melbourne</th> \
		<td>Leonid Spirin (URS)</td> \
		<td>Antanas Mikenas (URS)</td> \
		<td>Bruno Junk (URS)</td> \
		<td><img src="'+trashCanURL+'" /></td> \
	</tr> \
</table> \
</div> \
';

function loadMailDestinations()
{
  // var rows = this.getOverlay().$("mytable > *");
  console.log("loadMailDestinations was just called from onBeforeLoad");
  //console.log("There are " + rows.length + " rows in the array");
  
  console.log("ID of loaded table is " + $('table.MailDests').attr('id'));
  
  $('table.MailDests').append(' \
  	<tr> \
		<th class="spec" style="background:url('+specBulletURL+') no-repeat">2004 Athens</th> \
		<td>Ivano Brugnetti (ITA)</td> \
		<td>Francisco Javier Fernández (ESP)</td> \
		<td>Nathan Deakes (AUS)</td> \
		<td><img src="'+trashCanURL+'" /></td> \
	</tr> \
  ');
}

$('body').prepend(overlayDiv);

$('a[href^=mailto:]').live('click', function(clickEvent){clickEvent.preventDefault();});
$('a[href^=mailto:]').overlay({target:'#MailPop', speed:'fast', expose:'#000', effect:'apple', onBeforeLoad: loadMailDestinations});
});