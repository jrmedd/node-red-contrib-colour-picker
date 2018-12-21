module.exports = function (RED) {
    function ColourPickerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.pickedColour = config.pickedColour;
        this.pickedColour = this.pickedColour.replace("#", ""); //strip the hash
        this.r = parseInt(this.pickedColour.substring(0, 2), 16); //convert R to int
        this.g = parseInt(this.pickedColour.substring(2, 4), 16); //convert G to int
        this.b = parseInt(this.pickedColour.substring(4, 6), 16); //convert B to int
        this.pickedColour = (String(this.r) + "," + String(this.g) + "," + String(this.b)); //create a comma-separated RGB colour
        node.on("input", function(msg){
            msg.payload = this.pickedColour;
            node.send(msg); //send it on input
        });
        setTimeout(function(){
            node.emit("input", {}); //trigger the input
        }, 10);
    }
    RED.nodes.registerType("colour-picker", ColourPickerNode);
}