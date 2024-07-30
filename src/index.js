
// jquery is a dependency of pivottable.
import $ from "jquery";
// jquery-ui is another dependency of pivottable. require it so that it is added to the bundle.
require("../node_modules/jquery-ui/dist/jquery-ui.js")
//require("../node_modules/jquery-ui/dist/themes/base/jquery-ui.css")
//require("../node_modules/jquery-ui/dist/themes/base/theme.css")
// pivottable css that we want in the bundle.
require("../node_modules/pivottable/dist/pivot.css")
// of course, we want pivottable's implementation in the bundle too.
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