package articles.model;

import java.util.Collection;
import lombok.Data;

@Data
public class ArticleResult {
    private final int total;
    private final Collection<Article> articles;

    public ArticleResult(int total, Collection<Article> articles) {
        this.total = total;
        this.articles = articles;
    }
}
