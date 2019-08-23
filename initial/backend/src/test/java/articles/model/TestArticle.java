package articles.model;

import org.testng.annotations.*;


public class TestArticle {

    @Test(groups = { "unit" })
    public void basic() {
        Article article = new Article.ArticleBuilder()
            .id("test id")
            .title("test title")
            .build();
        System.out.println("Test article: " + article);
    }
}
