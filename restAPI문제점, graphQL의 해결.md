# rest API의 문제점 2가지

## 1. over-fetching을 합니다.

필요 이상의 정보를 한꺼번에 가져옵니다.

GraphQL은 필요한 정보만 가져옵니다.

## 2. under-fetching

필요한 정보를 덜 가져와서 여러번의 request를 발생할 수 도 있습니다.
그 결과, 페이지 로딩시간이 길어질 수 있고, 만약 request에 실패한다면,
페이지가 정상적으로 로딩되지 않을 수 있습니다.

graphQL은 많은 resources를 하나의 request로 받아 올 수 있습니다.

# GraphQL 쿼리 작성, 검증 및 테스트를 위한 도구 주소

https://graphql.org/swapi-graphql

# Setup!

## 1. Node.js 설치

## 2. Apollo server 설치

https://www.apollographql.com/docs/apollo-server/

GraphQL 클라이언트와 호환되는 사양 수준의 오픈 소스 GrapQl 서버

## 3. Apolloe server 시작하기

npm init -y
npm install apollo-server graphql
npm install nodemon -D

# graphQL 이해하기

## query

user가 server에게 data를 받도록 하고 싶은 것을 넣어둔다.
restAPI 에서 GET에 해당하는 부분이다.

## mutation

user가 server에게 data를 보내서 database가 업데이트 되거나 변경되면
mutation 안에 있어야 한다.

## ! required

user에게 꼭 받아야하는 정보가 있거나, server에서 반환 값이 무조건 있어야 한다면(null이 아닌) !를 붙이면 된다.
ex) userName : String
ex) userId : String!
ex) allTweet : [Tweet!]!
