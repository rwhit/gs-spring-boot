package articles.controller;

import articles.model.Article;
import articles.model.ArticleId;

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

    @CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000"})
    @RequestMapping(method=POST, path="/article")
    public ArticleId addArticle(@RequestBody Article article) {
        if (article.getTitle().equals("THROW")) {
            throw new RuntimeException("THROW means throw");
        }
        jdbcTemplate.update("INSERT INTO articles (id,title,author,body) VALUES (?,?,?,?)",
                            article.getId(),
                            article.getTitle(),
                            article.getAuthor(),
                            article.getBody());
        return new ArticleId(article.getId());
    }
}
