# [인터엑스] Frontend 개발 직무 코딩 테스트

<br/>

## 실행 방법

우선 프로젝트를 clone 받은 뒤,

<br/>

### Backend 실행 방법

프로젝트 최상단 directory에서

`cd server`

를 입력하여 server directory로 이동합니다.

<br/>

필요한 package들을 설치하기 위하여

`npm i`

를 입력하여 package들을 설치합니다.

<br/>

다음으로

`node server.js`

를 입력하여 express를 실행합니다.

<br/>

### Frontend 실행 방법

프로젝트 최상단 directory에서

`cd client`

를 입력하여 client directory로 이동합니다.

<br/>

필요한 package들을 설치하기 위하여

`npm i`

를 입력하여 package들을 설치합니다.

<br/>

다음으로

`npm start`

를 입력하여 프로젝트를 실행합니다.

<br/>

[http://localhost:3000](http://localhost:3000)
위 주소로 자동으로 이동되며 Frontend가 실행됩니다.



위 단계까지 마무리되면 Backend부터 Frontend까지 켜진 상태입니다.

<br/>

## 필수 기능

### 1. 보드 화면 구성

보드 화면은 안내 메일의 스크린샷 화면을 참고하여 구현했습니다.

<img width="3808" height="1911" alt="image" src="https://github.com/user-attachments/assets/a900e072-9439-4e87-8897-4121e96331cf" />

<br/>

### 2. 드래그앤드랍 (DnD)

지원자 카드는 Drag and Drop이 가능하며, 이를 통해 다른 단계로 이동시킬 수 있습니다.

https://github.com/user-attachments/assets/d7f5946c-64ef-486f-a789-ca9eaf0d1ed8

<br/>

### 3. 스크롤

각각의 단계에는 최대 높이가 지정되어 있어 특정 높이를 벗어난 지원자 카드는 스크롤을 통해 확인할 수 있습니다.

스크롤은 각각의 단계별로 존재합니다.


https://github.com/user-attachments/assets/1042a0ce-9742-4cb4-b925-359f9ec8a102

<br/>

### 4. 삭제 버튼

지원자 카드 우측 상단의 메뉴를 통해 지원자를 삭제할 수 있습니다.


https://github.com/user-attachments/assets/cbeec421-210d-45a2-b102-ca4d456bd5f7

<br/>

### 5. 지원자 상세 + 이력서 업로드

지원자 카드를 클릭하게 되면 인터엑스 채용 사이트가 열리게 됩니다.


https://github.com/user-attachments/assets/d55af5d3-deac-49b5-9bc6-ed3719e441ae

<br/>

## 추가 기능

### 1. 지원자 정보 추가 기능

보드 화면의 상단에 위치한 + 버튼을 통해 지원자를 추가할 수 있습니다.

각각의 Field는 필수 값이므로 작성하지 않으면 추가되지 않습니다.

지원일자는 입력 당일을 기본값으로 가지고 있어 별도로 입력하지 않으면 당일로 추가됩니다.


https://github.com/user-attachments/assets/8226d87f-4841-4bb7-8651-85f59cb72baa

<br/>

### 2. 검색 기능

보드 화면의 상단에 위치한 검색 바를 통해 지원자를 검색할 수 있습니다.

평가 유형을 검색 대상으로 선택했을 경우엔 text를 입력하여 사용자 이름을 검색할 수 있으며,

등록 유형을 검색 대상으로 선택했을 경우엔 radio 버튼을 통하여 유형을 선택할 수 있습니다.



https://github.com/user-attachments/assets/545fffe2-1440-4182-99a4-779877fffcd3

<br/>

### 3. 정렬 기능

검색 바의 우측에 위치한 버튼을 통해 지원자 카드를 정렬할 수 있습니다.

정렬 기준은 Dialog에서 선택이 가능하며,

정렬 버튼 우측에 위치한 버튼을 통해 오름 / 내림 차순을 지정할 수 있습니다.



https://github.com/user-attachments/assets/3ec7b9e5-7168-421a-8b0d-bd9a537df296

<br/>

### 4. 평가 배정 기능

지원자 카드 우측 상단에 위치한 메뉴에 평가 기능이 있습니다.

해당 메뉴를 누르게 되면 평가중이던 지원자 카드가 평가 완료 상태로 넘어가게 됩니다.

또한, 이미 평가 완료된 카드는 해당 메뉴가 비활성화되어 변경할 수 없게 됩니다.


https://github.com/user-attachments/assets/04663543-b429-4b56-b6f8-25a1b8985f47

<br/>

### 5. 최종 합격 기능

지원자 카드 우측 상단에 위치한 메뉴에 최종 합격 기능이 있습니다.

해당 메뉴를 누르게 되면 지원자가 즉시 합격처리 되어 평가 완료 상태로 변경되며,

입사 확정 단계로 이동되게 됩니다.

또한, 이미 입사 확정 단계에 존재하는 지원자 카드는 해당 메뉴가 비활성화되어 변경할 수 없게 됩니다.


https://github.com/user-attachments/assets/deed6765-0484-44d6-9f46-a9c7938f1887

<br/>

### 6. 당일 기준 지원일자

지원일자는 지원한 날로부터 현재까지 시간이 얼마나 지났는지 보기 쉽게 ~일/달/년 전으로 표시되게 됩니다.

또한, 지원일자도 Mouse Hover를 통해 확인할 수 있습니다.

<img width="625" height="502" alt="image" src="https://github.com/user-attachments/assets/70318a5e-a967-4e2d-847f-ebcae4bceb7e" />
