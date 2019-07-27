DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id text not null,
  title text not null,
  author text not null,
  body text not null,

  primary key(id)
);
