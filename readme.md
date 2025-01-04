Domain-drive-design $ npm install typescript --save-dev

Domain-drive-design $ npx tsc --init

# Modify this to tsconfig.json

**Chance Incremental to TRUE**

**outDir to ./dist**

**Add on the bottom**
"include": [
"src/**/*.ts"
]

domain-drive-design $ npm i tslint --save-dev

domain-drive-design $ npx tslint --init


- npm i -D @types/jest ts-node --save-dev --save-dev
- npm i -D @swc/jest @swc/cli @swc/core
- npx jest --init


- Add os jest.config.json

transform: {
"^.+\.(t|j)sx?$": ["@swc/jest"],
},