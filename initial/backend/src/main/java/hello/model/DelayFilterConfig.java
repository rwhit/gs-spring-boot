package hello.model;

import java.util.regex.Pattern;
import lombok.Builder;
import lombok.Data;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

// POJO to hold DelayFilter configuration
@Data
@JsonDeserialize(builder = DelayFilterConfig.DelayFilterConfigBuilder.class)
public class DelayFilterConfig {
    private String urlPattern;
    private long delayMs;
    private Pattern _urlPattern;

    @Builder
    public DelayFilterConfig(String urlPattern, long delayMs) {
	setUrlPattern(urlPattern);
	this.delayMs = delayMs;
    }

    public void setUrlPattern(String urlPattern) {
	this.urlPattern = urlPattern;
	this._urlPattern = Pattern.compile(urlPattern);
    }

    public Pattern getCompiledUrlPattern() {
	return _urlPattern;
    }

    public long getDelayMs() {
	return delayMs;
    }
}
