# Jekyll plugin to inject tabs script
# Using a converter approach that's more reliable

module Jekyll
  class TabsInjector < Converter
    safe true
    priority :lowest

    def matches(ext)
      false  # Don't convert files, just hook into the process
    end

    def output_ext(ext)
      ext
    end

    def convert(content)
      content
    end
  end
end

# Also register a hook as backup
Jekyll::Hooks.register :site, :post_render do |site|
  site.pages.each do |page|
    next unless page.output
    next unless page.url == '/' || page.url == '/index.html'
    
    # Inject script before closing body tag
    page.output = page.output.gsub(
      /<\/body>/i,
      '<script src="/assets/tabs.js" defer></script></body>'
    )
  end
end
