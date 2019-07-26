package articles.controller;

import articles.model.Article;
import articles.model.ArticleId;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ArticleController {
    // TODO implement properly
    private static final Map<String, Article> articles;

    static {
        articles = new HashMap<>();
        Article first = new Article("First test", "Robin Whitworth", "This is the first, hardcoded, test article.");
        articles.put(first.getId(), first);
    }

    // TODO push default to app config?
    // see https://spring.io/guides/gs/rest-service-cors/
    @CrossOrigin()
    @RequestMapping("/articles")
    public Collection<Article> getArticles() {
        return articles.values();
    }

    @CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000"})
    @RequestMapping(method=POST, path="/article")
    public ArticleId addArticle(@RequestBody Article article) {
        articles.put(article.getId(), article);
        return new ArticleId(article.getId());
    }
}