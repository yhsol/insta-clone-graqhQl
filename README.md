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
- see romms
- see room
- message

## usage

- prisma 에 포함되어 있는 함수를 쓸 때는 prisma playground 에서 확인하고 쓰면 좋다.
  - user 와 users, post 와 posts 가 포함하고 있는 요소들이 달라서 확인해서 쓰면 좋겠다.

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

- @relation

  - when to use: 예를 들어 post 를 삭제하는 데, post 에 포함되어 있는 like 와 file 등이 required 라면 해당 구조에 위배되기 때문에 에러가 난다. 이 때 relation 을 통해 서로 묶어주면 post 를 삭제했을 때 like 와 file 등이 같이 삭제 된다.
  - 그렇지만 post 에 포함되는 like 나 file 이 required 가 아니라면 이렇게 하지 않아도 된다. 해당 요소들을 required 로 설정하지 않는 다면 위의 post 가 삭제 되었을 때 이 값들은 null 이 된다.(prisma 의 default 설정이다.) 즉, 삭제만 할 경우 이게 더 효율적이다.
  - 그 외의 활용방법은 그 때 찾아보면 될 듯.

- createdAt & updatedAt
  - 해당 요소들은 frontend 에서 date 를 표현하는 용도로도 쓰이지만 user 및 following 하는 사람들의 post 같은 요소들을 정리해서 볼 때에도 쓰인다.

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
  - merge 라는 기능으로 withRouter 를 쓰듯이 다양한 활용 방법이 가능하다.

- gitignore

  - prisma.yml 파일을 추가해야 한다. 이메일 등의 정보가 있기 때문에 커밋하면 안된다.

- middlewares

  - isAuthenticated 라는 함수를 만들고 props 로 context 로 부터 가져온 request 를 지정한다.
  - request 에 user 가 없다면 에러를 발생시킨다.
  - 해당 미들웨어를 사용하여 user 의 인증을 확인 할 수 있다.

- fragment

  - resolver 에서 더 많은 정보를 가져오려 할 때 갖고 오려는 정보를 fragment 파일에 담고,
    resolver 에서 type query 뒤에 \$fragment 를 붙여서 사용한다.
    해당 query 와 연결되어 있는 정보들을 갖고오기 편하다.

- computed file
  - 지정되어 있는 type 의 요소들을 조합해서 만들어 내는 값들을 갖는다.
  - 예를들어 fullname 이라는 값을 만들 때 database 에 해당 값을 직접 저장하는 것이 아닌,
    기존에 갖고 있는 firstName 과 lastName 값을 조합해서 만들 수 있다.
  - 그리고 schema 에서 각각의 type 과 resolver 를 merge 하고 있기 때문에 fullname 을 구현하는 로직을 me 라는 resolver 파일에 만들더라도 다른 resolver 파일(예를 들어 seeUser)에서도 확인 할 수 있다.
