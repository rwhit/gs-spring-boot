package articles.model;

import java.util.function.Supplier;
import lombok.Builder;
import lombok.Data;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@Data
@Builder
@JsonDeserialize(builder = Article.ArticleBuilder.class)
public class Article {
    /* hmm - how to make immutable? Lombok support? Jackson? */
    //@Builder.Default
    //private /* final */ String id = "3";
    //private /* final */ String id = generateId();
    private /* final */ String id;
    private /* final */ String title;
    // TODO update ui so can remove these defaults
    @Builder.Default
    private /* final */ String author = "";
    @Builder.Default
    private /* final */ String body = "";

    private static Supplier<String> idSupplier = new DefaultIdSupplier(0L);

    public Supplier<String> setIdSupplier(Supplier<String> newIdSupplier) {
        Supplier<String> oldSupplier = idSupplier;
        idSupplier = newIdSupplier;
        return oldSupplier;
    }

    //Article() {
    //}

    public Article(String title, String author, String body) {
        this(title, author, body, generateId());
    }

    public Article(String id, String title, String author, String body){
        if (id == null || id.length() == 0) throw new RuntimeException("id cannot be empty\ntitle: " + title + "\nauthor: " + author + "\nbody: " + body);
        this.title = title;
        this.author = author;
        this.body = body;
        this.id = id;
    }

    private static String generateId() {
        return idSupplier.get();
    }

    /*    public String getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }
    public String getTitle() {
        return title;
    }
    public String getBody() {
        return body;
    }
    */
    private static class DefaultIdSupplier implements Supplier<String> {
        private long nextId;

        DefaultIdSupplier(long firstId) {
            this.nextId = firstId;
        }

        public String get() {
            return String.valueOf(nextId++);
        }
    }
    /*
    @JsonPOJOBuilder(withPrefix = "")
    public static class ArticleBuilder {
    }
    */
}

