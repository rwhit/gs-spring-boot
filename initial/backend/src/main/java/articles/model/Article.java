package articles.model;

import java.util.function.Supplier;
import lombok.Data;

@Data
public class Article {
    /* hmm - how to make immutable? Lombok support? Jackson? */
    private /* final */ String id;
    private /* final */ String title;
    // TODO update ui so can remove these defaults
    private /* final */ String author = "";
    private /* final */ String body = "";

    private static Supplier<String> idSupplier = new DefaultIdSupplier(0L);

    public Supplier<String> setIdSupplier(Supplier<String> newIdSupplier) {
        Supplier<String> oldSupplier = idSupplier;
        idSupplier = newIdSupplier;
        return oldSupplier;
    }

    Article() {
    }

    public Article(String title, String author, String body) {
        this(title, author, body, generateId());
    }

    public Article(String title, String author, String body, String id){
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
}

        
