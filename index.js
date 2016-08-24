/**
 * Created by lu on 2016/7/27.
 */
function offLine(option) {
    this.outputName = option.outputName || "app";
    this.outputPath = option.outputPath || "/dist/";
    this.mainFileName = option.mainFileName || "/index.html";

}
offLine.prototype.apply = function (compiler) {
    var me = this;
    compiler.plugin('emit', function (compilation, callback) {
        // debugger
        var filelist = "CACHE MANIFEST \n";
        filelist += "#  " + me.outputName;
        filelist += " v" + new Date().getTime() + "\n\n\n"; //生成时间戳版本号
        filelist += "CACHE: \n";
        filelist += me.mainFileName + "\n";
        for (var filename in compilation.assets) {
            filelist += (me.outputPath + filename + '\n');
        }
        compilation.assets[me.outputName + '.appcache'] = {
            source: function () {
                return filelist;
            },
            size: function () {
                return filelist.length;
            }
        };
        filelist += "\n\nNETWORK: \n  * \nFALLBACK:\n";
        callback();
    })

};
module.exports = offLine;


