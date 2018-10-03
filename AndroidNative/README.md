## AndroidNative folder

This folder contains all necessary classes and configuration files
to make the app fully work:<br />
The notifications are sent via OneSignal to registered devices, incoming 
notifications can be managed only with native code and not through Cordova.
For this reason when you add Android platform to this project you need to
edit some files in platforms/android in order to make the app correctly work.

<b>NOTE:</b> <br />
In a previous version of this project the incoming notifications were automatically stored 
in a SQLite database(OneSignal.db) by OneSignal plugin(this still happens). On app start the notifications's content was kept from that database. In that case there was no need of native code, anyway to make code clearer a notification extender service(native code) to manage incoming notifications has been introduced. 

Follow these steps to include necessary files:

- Add drawable-xxxhdpi folder inside platforms\android\app\src\main\res.
  The folder contains the icon that is displayed when a notification is received

- Replace facebookconnect.xml and strings.xml within platforms\android\app\src\main\res
  with facebookconnect.xml and strings.xml inside AndroidNative folder.
  Facebook integration will probably included in future release.

- Add roomdatabase folder inside platforms\android\app\src\main\java\io folder.
  roomdatabase contains the classes and the interfaces needed to store
  icoming notifications using Room Persistance Library.

- Add CustomNotificationExtender.java file inside    
  platforms\android\app\src\main\java\io\univaq\univaqpush.
  This class extends NotificationExtenderService and specifies 
  the system behaviour when a notification is received.

- Replace AndroidManifest.xml inside platforms\android\app\src\main with the one inside      
  AndroidNative folder. In the new manifest is specified the view behaviour on its resize, in this case adjustPan(this happens for example   when the keyboard is opened to filter news on the Home view). Also CustomNotificationExtender service is included into the manifest.