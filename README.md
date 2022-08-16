# MeteorologicalAgency

- 2022.08.16
1. PUT vs PATCH 조금 더 스터디 후 토론
2. camelCase로 네이밍 변경  
3. HTTP STATUS CODE > 스터디 
   1. 2XX > 성공
   2. 4XX > 실패 (원인:클라이언트) 
   3. 5XX > 실패 (원인:서버)
4. 데이터베이스에 USER라는 테이블을 아래와 같이 생성 후 POST / GET / DELETE / PUT 메소드 사용해서 API 하나씩 만들어 오기. 
   1. ID (PK)
   2. EMAIL
   3. PASSWORD 
5. DTO, DAO 스터디 후 적용 (Model이랑 개념이 혼동될 수 있는데 마음껏 틀려보기)
   1. DAO 스터디 후 api_function 로직 분리
6. service layer
   1. 비지니스 로직이 들어가는 부분들을 분리해서 리팩토링