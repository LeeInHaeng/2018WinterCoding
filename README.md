# Introduction
본 프로젝트는 2018 윈터코딩 개발 프로젝트 중 웹 프로젝트 입니다.
기본적으로 포함된 기능은 다음과 같습니다.
- 새로운 TODO(제목 + 내용)를 작성한다
- 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.
- 우선순위를 조절할 수 있다.
- 완료 처리를 할 수 있다.
- 마감기한이 지난 TODO에 대해 알림을 노출한다.
- TODO 목록을 볼 수 있다.
- TODO 내용을 수정할 수 있다.
- TODO 항목을 삭제할 수 있다.

# Development environment
- Front-end : Javascript, CSS, Bootstrap, Jquery, Jquery-ui
- Back-end : AWS Ubuntu, NodeJS
- DB : MySQL

# Usage
- Linux server에 Node와 MySQL이 설치 되어 있어야 합니다.
- NodeJS를 위해 3001번 포트를 사용했습니다.
- sudo node server.js
- URL : ec2-52-79-250-40.ap-northeast-2.compute.amazonaws.com:3001
- 계정 : ID ---> user1 || user2		/	password ---> 1234 || 2345

# Demo Video
- http://com-topia.tistory.com/
- web 카테고리 ---> 제목 : 2018윈터코딩 웹프로젝트 TODO LIST

# Reference
- Login Form : https://zetawiki.com/wiki/%EB%B6%80%ED%8A%B8%EC%8A%A4%ED%8A%B8%EB%9E%A9_%EB%A1%9C%EA%B7%B8%EC%9D%B8_%ED%8F%BC
- TODO List Form : https://www.w3schools.com/howto/howto_js_todolist.asp
- Detail, Input Form : https://bootswatch.com/pulse/
- CSS Event & Datepicker : jquery-ui
- Alert Message : https://sweetalert.js.org/guides/