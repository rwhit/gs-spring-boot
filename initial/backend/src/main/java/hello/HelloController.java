package hello;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HelloController {
    
    @RequestMapping("/")
    public ModelAndView index(ModelMap model) {
        return new ModelAndView("forward:/index.html");
    }

    @RequestMapping("/echo")
    public String echo(String what) {
        final String header = "<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"hello.css\"></head>";
        final String footer = "</html>";
        final String body = "<body>" + what + "</body>";
        return header + body + footer;
    }
    
}
