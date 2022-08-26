# MeteorologicalAgency


- 2022.08.24
1. Winston Logger 적용해서 request, response 로그 찍도록 추가 개발. 
2. request, response 파라미터는 풀 네이밍으로 하고, 순서 지켜줄것.
3. 각 controller, service에서 사용되는 함수들 네이밍 전체 수정. 
4. DAO 하나로 합칠것.
5. mainRouter/Controller/Service -> weatherRouter/Controller/Service 
6. javascript class를 지원해준게 maybe ES2015부터 일텐데.. 
   - javascript class기반 언어가 아닙니다.
   - OOP라고 안보는 양반들도 있음.
   - javacript는 prototype 기반 언어. (prototype이란? class랑 차이?) > 스터디 
   - javascript class -> module pattern  > 스터디 
   - class기반 언어가 익숙한 사람들한테 편리성을 제공하려고 주는 설탕.달달함.
7.  Model 코드들을 DTO로 리팩토링 
8.  API 과제
    1.  GET : /user/{id} > id에 해당하는 유저 정보 조회
    2.  POST : /user/login > 로그인
    3.  POST : /user/signup > 회원가입 
    4.  PUT/PATCH : /user is_delete, deleted_at  > 탈퇴
    5.  PUT/PATCH : /user/{id} > id에 해당한 유저 정보 수정 
    6.  PUT/PATCH : /user/password > 유저 비밀번호 변경 [전제: 로그인 한 상태에서 비밀번호 변경한다]
9. user table
   - ID > BIGINT AUTO_INCREMENT
   - EMAIL > VARCHAR(256)
   - PASSWORD > VARCHAR(512) (단방향 암호화해서 저장) 
   - PASSWORD_SALT (소금치기 > 스터디) 
   - IS_DELETE > TINYINT
   - DELETED_AT > datetime
10. CHAR / VARCHAR 차이 > 스터디 