package articles.controller;

import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import hello.Application;

@SpringBootTest(classes = Application.class)
public class TestArticleController extends AbstractTestNGSpringContextTests {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

        private String ds1;

        private static final String DATA_SET_FILE = "data-set-1.json";

        @BeforeClass
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
                try {
                    ds1 = new String(ClassLoader.getSystemClassLoader().
                                     getResourceAsStream(DATA_SET_FILE).readAllBytes());
                } catch(IOException ex) {
                    throw new RuntimeException("could not read " + DATA_SET_FILE);
                }
	}

	@Test
	public void testArticles() throws Exception {
		mockMvc.perform(get("/articles")).andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().json(ds1))
                    ;

	}

        @Test(groups = { "buildScriptTest" })
        public void alwaysFail() throws Exception {
            throw new Exception("alwaysFail failed");
        }

}
