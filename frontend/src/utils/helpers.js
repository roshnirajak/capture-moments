const mode = "prod";    // local, dev, prod
const sub_uri = "/capture"
let APP_URL= `http://localhost:8000${sub_uri}`;

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