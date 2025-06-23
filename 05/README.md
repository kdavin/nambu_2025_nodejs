# 체크리스트 시스템 백엔드 만들기

## 첫번째 요구 사항

여행을 갈 경우
2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구,...옷류, 점퍼, 코드, 반팔티, ...

-> 백엔드를 만들어보는 겁니다.
-> 테이블 설계도
아이디 PK --> id integer
캠핑 준비물, 여름 휴가 준비물 담을 수 있는 그룳핑 항목 --> category text
실제 준비해야할 물건 --> item text
수량 --> amount integer
체크 여부 --> checkyn boolean

--> REST API
POST /checklist -> 체크리스트 입력
GET /checklist?category = 여름휴가 준비물
PUT. /checklist/:id -> 체크 여부를 toggle 0->1 1->0
DELETE /checklist/:id
