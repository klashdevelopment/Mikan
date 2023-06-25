var token = "";
var inString = false;
var pushed = [];
function checkToken() {
    if(inString && token.endsWith('"')) {
        inString = false;
        token = token.slice(0,token.length-1);
        const lastTok = pushed.at(pushed.length-1);
        if(lastTok == "print") {
            console.log(token);
            token = "";
        }
        return;
    }
    switch(token) {
        case "print":
            pushed.push(token);
            token = "";
        break;
        case " ":
            token = ""
        break;
        case "\"":
            if(!inString) {
                inString = true;
                token = "";
            }
        break;
        default:
        break;
    }
}
function interpret(string) {
    const lines = string.split('\n');
    for (const line of lines) {
        // console.log(line);
        for(const char of line.split('')) {
            token += char;
            // console.log(token);
            checkToken();
        }
    }
}
export default interpret;