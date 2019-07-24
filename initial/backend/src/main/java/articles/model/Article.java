package articles.model;

import java.util.function.Supplier;

public class Article {
    private final String id;
    private final String title;
    private final String author;
    private final String body;

    private static Supplier<String> idSupplier = new DefaultIdSupplier(0L);

    public Supplier<String> setIdSupplier(Supplier<String> newIdSupplier) {
        Supplier<String> oldSupplier = idSupplier;
        idSupplier = newIdSupplier;
        return oldSupplier;
    }
    
    public Article(String title, String author, String body)
    {
        this.title = title;
        this.author = author;
        this.body = body;
        this.id = generateId();
    }

    private String generateId() {
        return this.idSupplier.get();
    }

    public String getId() {
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

        
