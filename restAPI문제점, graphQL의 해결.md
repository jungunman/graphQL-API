# rest API의 문제점 2가지

## 1. over-fetching을 합니다.

필요 이상의 정보를 한꺼번에 가져옵니다.

GraphQL은 필요한 정보만 가져옵니다.

## 2. under-fetching

필요한 정보를 덜 가져와서 여러번의 request를 발생할 수 도 있습니다.
그 결과, 페이지 로딩시간이 길어질 수 있고, 만약 request에 실패한다면,
페이지가 정상적으로 로딩되지 않을 수 있습니다.

graphQL은 많은 resources를 하나의 request로 받아 올 수 있습니다.
