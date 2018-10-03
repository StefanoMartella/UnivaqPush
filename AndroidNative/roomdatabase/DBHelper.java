package io.roomdatabase;

import android.arch.persistence.room.Room;
import android.content.Context;

public class DBHelper {
  private static final String DATABASE = "univaqpush.db";
  private DB database;

  /* Singleton */
  private static DBHelper instance = null;


  public static DBHelper get(Context context) {
    return instance == null ? instance = new DBHelper(context) : instance;
  }

  /* Builder */
  private DBHelper(Context context) {
    database = Room.databaseBuilder(context, DB.class, DATABASE).build();
  }

  /* Public methods */

  public void saveNews(final News news){
    new Thread(new Runnable() {
      @Override
      public void run() {
        database.NewsDao().save(news);
      }
    }).start();
  }

}
