
import $ from "jquery";
require("../node_modules/jquery-ui/dist/jquery-ui.js")
//require("../node_modules/jquery-ui/dist/themes/base/jquery-ui.css")
//require("../node_modules/jquery-ui/dist/themes/base/theme.css")
require("../node_modules/pivottable/dist/pivot.css")
require("pivottable");

// this is the data that could theoretically be patched out in the built html file
const embeddedData = {"fileEmbeddedData": "replaceThisPlaceholderPlease"};

    $(function(){
        var pivotContainer = $('<div />').appendTo('body');
        pivotContainer.pivotUI(
            [
                {color: "blue", shape: "circle"},
                {color: "red", shape: "triangle"}
            ],
            {
                rows: ["color"],
                cols: ["shape"],
            }
        );
     })