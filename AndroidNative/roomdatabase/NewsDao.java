package io.roomdatabase;

/**
 * Created by Stefano_Martella on 02/10/2018.
 */

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;

@Dao
public interface NewsDao {

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  void save(News news);

}
