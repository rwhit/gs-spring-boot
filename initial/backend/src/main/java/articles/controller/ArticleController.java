
package articles.controller;

import articles.model.Article;
import articles.model.ArticleId;
import articles.model.ArticleResult;

import com.google.common.util.concurrent.Uninterruptibles;

import java.time.Duration;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ArticleController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // TODO push default to app config?
    // see https://spring.io/guides/gs/rest-service-cors/
    @CrossOrigin()
    @RequestMapping("/articles")
    public Collection<Article> getArticles() {
        return jdbcTemplate.query("SELECT a.id, a.title, a.author,a.body from articles a",
                                  (rs, rowNum) ->
                                  new Article(rs.getString("title"),
                                              rs.getString("author"),
                                              rs.getString("body"),
                                              rs.getString("id")));
    }

    @CrossOrigin()
    @RequestMapping("/articlePage")
    public ArticleResult getArticlePage(int offset, int pageSize) {
        StringBuilder query = new StringBuilder();
        query
            .append("  SELECT a.id, a.title, a.author,a.body from articles a ")
            .append("ORDER BY a.title ")
            .append("LIMIT ? OFFSET ? ");
        Collection<Article> articles = jdbcTemplate.query(query.toString(),
                                                          new Object[] {pageSize, offset},
                                                    (rs, rowNum) ->
                                                          Article.builder()
                                                          /*
                                                          .withTitle(rs.getString("title"))
                                                          .withAuthor(rs.getString("author"))
                                                          .withBody(rs.getString("body"))
                                                          .withId(rs.getString("id")).build());*/
                                                          .title(rs.getString("title"))
                                                          .author(rs.getString("author"))
                                                          .body(rs.getString("body"))
                                                          .id(rs.getString("id")).build());
        int count = jdbcTemplate.query("SELECT count(1) as count from articles", (rs, rowNum) -> rs.getInt("count")).get(0);
        return new ArticleResult(count, articles);
    }

    @CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000"})
    @RequestMapping(method=POST, path="/article")
    public ArticleId addArticle(@RequestBody Article article) {
        switch(article.getTitle()) {
        case "THROW":
            throw new RuntimeException("THROW means throw");
        case "DELAY":
            Uninterruptibles.sleepUninterruptibly(Duration.ofSeconds(1));
            break;
        case "LONG_DELAY":
            Uninterruptibles.sleepUninterruptibly(Duration.ofSeconds(60));
            break;
        default:
            break;
        }
        jdbcTemplate.update("INSERT INTO articles (id,title,author,body) VALUES (?,?,?,?)",
                            article.getId(),
                            article.getTitle(),
                            article.getAuthor(),
                            article.getBody());
        return new ArticleId(article.getId());
    }
}
