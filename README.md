# insta clone

## description of each file

- nodemon.json

  - nodemon 은 파일 저장시 실행을 새로 해주는 도구. 서버를 껐다 켰다할 필요 없다.
  - 프로젝트에서 감시할 파일들을 "ext"로 지정한다.

- babelrc

  - import 등의 기능을 쓰기 위해서 babelrc 파일에 presets 를 설정한다.

- logger

  - graphQl yoga 에는 express 서버가 내장되어 있어서
    server.express.use(logger("dev")) 와 같이 logger(미들웨어)를 쓸 수 있다.

- schema
  - api 폴더를 만들고 그 안에 typeDefs(graphql 파일) 과 resolvers(js 파일)을 만들고
    그 파일들을 schema.js 에서 merge 한다.
