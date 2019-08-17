package articles.model;

public class TestArticle {
    public static void main(String... args) {
        Article article = new Article.ArticleBuilder()
            .id("test id")
            .title("test title")
            .build();
        System.out.println("Test article: " + article);
    }
}
