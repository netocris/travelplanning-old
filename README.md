# Travelplanning

Planning your travels

## Project dependencies

    npm install jquery popper.js bootstrap font-awesome --save

    npm install @ng-bootstrap/ng-bootstrap --save

    npm install @ngx-translate/core @ngx-translate/http-loader --save

    npm install @angular/fire firebase --save

    npm install @editorjs/editorjs @editorjs/header @editorjs/marker @editorjs/delimiter  --save

## Configure project dependencies

    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/font-awesome/css/font-awesome.min.css",
        "src/styles.css"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/umd/popper.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]

## Run in a different port

    ng serve --port=4201

## Deploy to Firebase

    ng build --prod (update environment.prod.ts file with firebase configuration previously)
    firebase login
    firebase deploy
    firebase logout



