# insta clone

## insta clone function

- create account
- log in with confirm secret
- see feed
- see user profile
- follow / unfollow
- like / unlike
- comment
- search by user / caption / location
- see the full photo
- edit my profile

## datamodel

- type name

  - 타입의 이름(title)은 단수.
  - 타입 내의 각 아이템들 중 여러개가 포함 될 수 있는 것, 즉 타입을 배열의 형태로 갖는 경우는 복수형태로 표현.
    (front-end 에서 map 작업 시 헷갈리지 않게.)

- type Query

  - 타입을 지정한 뒤 datamodel 에서 삭제하면 prisma 에서 에러가 나타난다. 삭제된 부분을 찾지 못한다는 에러이다. 이 경우에는 해당 Query 를 prisma 에서 삭제한 뒤 datamodel 을 다시 prisma 에 deploy 하면 해결 된다.
    - but 작업이 꽤 진행되니 상태에서 이렇게 하게되면 해당 Query 가 갖고 있던 데이터들도 같이 날아가버리는 게 아닌가..?

- models.graphql
  - 데이터 구조를 datamodel.prisma 에 담아뒀었는데 graphql 은 prisma 를 이해하지 못하기 때문에 이 구조를 다시
    models.graphql 파일에 넣어줘야 한다.
  - api 내의 Query 들이 prisma 에 접근할 수 없기 때문에 graphql 에 데이터 구조를 담아서 접근 가능하게 하는 것.

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
  - path 를 통해 각각 type 과 resolver 를 가져오는 경로를 설정하기 때문에 api 폴더 아래에는
    type 과 resolver 만을 둬야한다. (resolver 인 js 파일만 뒤야한다.)

- gitignore

  - prisma.yml 파일을 추가해야 한다. 이메일 등의 정보가 있기 때문에 커밋하면 안된다.
