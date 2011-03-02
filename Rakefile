require 'rake'
require 'rake/testtask'

# Rake build tasks

desc "Default task" 
task :default => [:jslint]

desc "Run JSLint audit on code and markup"
task :jslint do
  echo "Starting JSLint audit"
 
  lint_command = "java -classpath ./lib/jsLint/js.jar "+ 
                  "org.mozilla.javascript.tools.shell.Main ./lib/jsLint/jslint.js";

  IMPL_JS = "js/Grid.js";
  TEST_JS = "test/GridTests.js";
  
  echo "Running JSLint on: "+IMPL_JS
  puts %x{ #{lint_command} #{IMPL_JS} };
  echo "Running JSLint on: "+TEST_JS
  puts %x{ #{lint_command} #{TEST_JS} };
  
  echo "Done running JSLint."
end


# Helper functions
def echo(msg)
  puts("  <Rake>: "+msg);
end

