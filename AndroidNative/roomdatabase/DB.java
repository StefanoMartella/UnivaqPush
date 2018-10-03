package io.roomdatabase;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;

import io.roomdatabase.News;

@Database(entities = {News.class}, version = 1)
public abstract class DB extends RoomDatabase {
  public abstract NewsDao NewsDao();
}

