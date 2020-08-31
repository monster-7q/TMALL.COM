requirejs.config({
    // baseUrl: '',
    paths: {
        jquery: './jquery.min'
    }
})
requirejs(['jquery'], function($) {
    console.log($);
})