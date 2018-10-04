package io.univaq.univaqpush;

import com.onesignal.NotificationExtenderService;
import com.onesignal.OSNotificationReceivedResult;

import org.json.JSONException;

import io.roomdatabase.DBHelper;
import io.roomdatabase.News;

/**
 * Created by Stefano_Martella on 02/10/2018.
 */

public class CustomNotificationExtender extends NotificationExtenderService {

  @Override
  protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult) {

    News news = new News();
    news.setTitle(receivedResult.payload.title);
    news.setBody(receivedResult.payload.body);
    try {
      news.setLink(receivedResult.payload.additionalData.getString("link"));
      news.setSection(receivedResult.payload.additionalData.getString("section"));
      news.setDate(String.valueOf(receivedResult.payload.additionalData.getLong("date")));
    } catch (JSONException e) {
      e.printStackTrace();
    }

    // Store news inside the database
    DBHelper.get(this).saveNews(news);

    return false;

  }

}
