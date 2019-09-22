# Travelplanning

Planning your travels

## Project dependencies

#### Bootstrap

    npm install jquery popper.js bootstrap --save

    npm install @ng-bootstrap/ng-bootstrap --save

#### Firebase 6

    npm install @angular/fire firebase --save

## Configure Bootstrap

    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",        
        "src/styles.css"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/umd/popper.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]

## Run in a different port

    ng serve --port=4201

