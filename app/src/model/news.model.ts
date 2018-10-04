export class News{

  id: number;
  title: string;
  body: string;
  link: string;
  section: string;
  date: string;

  constructor(
    id: number,
    title: string,
    body: string,
    link: string,
    section: string,
    date_in_millisecs: string) {

    this.id = id;
    this.title = title;
    this.link = link;
    this.section = section;
    this.body = this.escapeBody(body);
    this.date = new Date(Number(date_in_millisecs)).toLocaleString();
  }

  escapeBody(body: string): string {
    return body.replace(/\n/g, "<br />");
  }

  sharableVersion(): string {

    let body = this.body.replace(/<br \/>/g, '\n');

    return  this.title + "\n\n" +
            body       + "\n\n" +
            this.link;
  }

}
