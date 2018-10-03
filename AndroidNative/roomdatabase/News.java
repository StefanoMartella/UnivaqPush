package io.roomdatabase;

/**
 * Created by Stefano_Martella on 02/10/2018.
 */

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;

@Entity(tableName = "notification") public class News {

  @PrimaryKey(autoGenerate = true)
  private Integer _id;

  @ColumnInfo(name = "title")
  private String title;

  @ColumnInfo(name = "body")
  private String body;

  @ColumnInfo(name = "link")
  private String link;

  @ColumnInfo(name = "section")
  private String section;

  @ColumnInfo(name = "date_in_milliseconds")
  private String date_in_milliseconds;

  // Getters and setters


  public Integer get_id() { return _id; }

  public void set_id(Integer _id) { this._id = _id; }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public String getSection() {
    return section;
  }

  public void setSection(String section) {
    this.section = section;
  }

  public String getDate_in_milliseconds() {
    return date_in_milliseconds;
  }

  public void setDate_in_milliseconds(String date_in_milliseconds) {
    this.date_in_milliseconds = date_in_milliseconds;
  }

}
