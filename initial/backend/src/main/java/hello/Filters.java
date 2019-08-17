package hello;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.ByteArrayInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ReadListener;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.Filter;
import javax.servlet.FilterChain;

public class Filters {

    private static final Logger logger = LoggerFactory.getLogger(Filters.class);

    @Component
    //@Order(2)
    public static class RequestResponseLoggingFilter implements Filter {

        public final int MAX_BODY = 1000000;
        @Override
        public void doFilter(
                             ServletRequest request,
                             ServletResponse response,
                             FilterChain chain) throws IOException, ServletException {

            HttpServletRequest req = (HttpServletRequest) request;
            HttpServletResponse res = (HttpServletResponse) response;
            logger.info(
                     "Logging Request  {} : {}", req.getMethod(),
                     req.getRequestURI());
            if (req.getContentLength() > 0 && req.getContentLength() < MAX_BODY) {
                ServletInputStream sis = req.getInputStream();
                int offset = 0;
                int lastOffset = 0;
                int len = 1000;
                byte buffer[] = new byte[req.getContentLength()];
                for(int read = sis.readLine(buffer, offset, len);
                    read >= 0;
                    lastOffset = offset, offset += read, read = sis.readLine(buffer, offset, len)) {
                    logger.info("BODY: " + new String(buffer, lastOffset, read));
                }
                ByteArrayInputStream bais = new ByteArrayInputStream(buffer);
                final ByteArrayServletInputStream newSis = new ByteArrayServletInputStream(bais);
                req = new HttpServletRequestWrapper(req) {
                        public ServletInputStream getInputStream() { return newSis; }
                };
            }

            chain.doFilter(req, res);
            logger.info(
                     "Logging Response :{}",
                     res.getContentType());
        }

        // other methods
    }

    private static class ByteArrayServletInputStream extends ServletInputStream {
        ByteArrayInputStream delegate;

        public ByteArrayServletInputStream(ByteArrayInputStream delegate) {
            this.delegate = delegate;
        }

        /* doh not even needed!        @Override
        public int readLine(byte[] buffer, int offset, int len) {
            byte b = delegate.read();
            for (int read = (b == -1) ? -1 : 1;
                 (b != -1) && read <= len && b != '\n';
                 read += (b == -1) ? 0 : 1) {
                buffer[offset+(read - 1)] = b;
                b = delegate.read();
            }
            return read == 0 && b == -1 ? -1 : read;
        }
        */

        public boolean isFinished() { return delegate.available() > 0; }
        public boolean isReady() { return true; }
        public void setReadListener(ReadListener readListener) {
            try {
                readListener.onDataAvailable();
            } catch(IOException ex) {
                throw new RuntimeException(ex);
            }
        }
        @Override
        public int available() { return delegate.available(); }
        @Override
        public void close() throws IOException { delegate.close(); }
        @Override
        public void mark(int limit) { delegate.mark(limit); }
        @Override
        public boolean markSupported() { return delegate.markSupported(); }
        @Override
        public int read() { return delegate.read(); }
        @Override
        public int read(byte[] b, int off, int len) { return delegate.read(b, off, len); }
        @Override
        public void reset() { delegate.reset(); }
        @Override
        public long skip(long n) { return delegate.skip(n); }
    }
}
