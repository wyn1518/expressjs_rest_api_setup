module.exports = {
    //...
    content: [
        "./src/views/**/*.html",
        "./node_modules/flyonui/dist/js/*.js",
    ], // Require only if you want to use FlyonUI JS component

    // Add FlyonUI plugin
    plugins: [
        require("flyonui"),
        require("flyonui/plugin")
    ],
  
    // FlyonUI config (optional - here are the default values)
    flyonui: {
      themes:  ["light"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "soft"]
      darkTheme: "dark", // name of one of the included themes for dark mode
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include FlyonUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
      logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
      themeRoot: ":root" // The element that receives theme color CSS variables
    }

  }