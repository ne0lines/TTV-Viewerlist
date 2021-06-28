# **TWITCH**.**TV** **VIEWERLIST**

**A simple Website that shows how many people are watching a stream, who that is and what category they are in.**

##### Warning: Currently, this Websites uses direct connections to the Twitch API which are blocked by your Browser using CORS.
##### Until this is fixed, you have to use a Browser-Addon such as this one available on [Firefox](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/), [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf), [Opera](https://addons.opera.com/en/extensions/details/allow-cors-access-control-allow-origin/) and [Edge](https://microsoftedge.microsoft.com/addons/detail/allow-cors-accesscontro/bhjepjpgngghppolkjdhckmnfphffdag).

## How to use
Open the Website [here](https://qlulezz.github.io/TTV-Viewerlist/).
To start, simply type in the Twitch User you want to monitor, choose how often it should refresh.
*Note: Twitch only updates the user list every 2 minutes or so, therefore, anything below 120 seconds is basically unnecessary.*

Your selected user is saved in your browser. If you wish to change it, just click und 'Reset Setup'.
For more information, look at the console log.

*I wrote this thing in like 2 hours so its not the prettiest.*
*Originally made because I wanted to look at my viewercount in VR without having to open the stream at the same time or using additional software.*

### Current Features: 
- Simple User Interface with custom refresh rate.
- Save selected user and time specified in Setup in the Browser
- Timer / Countdown to next refresh
- Hide and Unhide Admins and Mods (since those textfields aren't used anyway)

#### Future Goals:
-  Rerout connection to Twitch via Node.js Server to stop CORS Errors
-  Make it useable in Incognito Mode aswell
-  Add custom timer textfield
-  Log multiple Streams at once
-  Save the changes in Viewers inside a textfile
-  Dark Mode / Light Mode switcher
-  Quit the console logging (why do I do this)

## Access it here:
[qlulezz.github.io/TTV-Viewerlist/](https://qlulezz.github.io/TTV-Viewerlist/)

### GitHub Pages Activity Log:
[github.com/qlulezz/TTV-Viewerlist/deployments](https://github.com/qlulezz/TTV-Viewerlist/deployments/activity_log?environment=github-pages)