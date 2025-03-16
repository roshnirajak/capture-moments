const mode = "prod";    // local, dev, prod
let APP_URL= `http://localhost:8000${sub_uri}`;
const sub_uri = "/capture"

switch(mode){
    case "local":
        APP_URL= `http://localhost:8000${sub_uri}`;
        break;
    case "prod":
        APP_URL= `https://through-the-keyhole.space${sub_uri}`;
        break;
    default:
        APP_URL= `http://localhost:8000${sub_uri}`;
        break;
}

export {
    APP_URL
}