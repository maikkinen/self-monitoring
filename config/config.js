let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    //Remember to empty this one, right? :) 
    
  };
}

export { config }; 