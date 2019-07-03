package hello;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {
    
    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/echo")
    public String echo(String what) {
        final String header = "<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"hello.css\"></head>";
        final String footer = "</html>";
        final String body = "<body>" + what + "</body>";
        return header + body + footer;
    }
    
}
